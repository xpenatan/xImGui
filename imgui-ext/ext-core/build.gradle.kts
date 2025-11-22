plugins {
    id("java-library")
}

val moduleName = "imgui-ext-core"

val includePom = configurations.create("includePom")
includePom.extendsFrom(configurations.api.get())
includePom.isCanBeResolved = true

val fatJar = configurations.create("fatJar")
fatJar.extendsFrom(configurations["implementation"])
fatJar.isCanBeResolved = true

dependencies {
    includePom("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    includePom("com.github.xpenatan.jParser:idl-core:${LibExt.jParserVersion}")
    fatJar(project(":imgui:imgui-core"))
    fatJar(project(":extensions:imlayout:imlayout-core"))
    fatJar(project(":extensions:ImGuiColorTextEdit:textedit-core"))
    fatJar(project(":extensions:imgui-node-editor:nodeeditor-core"))
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
}

tasks.named("clean") {
    doFirst {
        val srcPath = "$projectDir/src/main/java"
        val jsPath = "$projectDir/src/main/resources/imgui.wasm.js"
        project.delete(files(srcPath, jsPath))
    }
}

val fromClasses = tasks.register<org.gradle.jvm.tasks.Jar>("fromClasses") {
    val dependencies = configurations.compileClasspath.get()
    from(dependencies.map(::zipTree)) {
    }
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    dependsOn("assemble")
}

val sourcesJar = tasks.register<org.gradle.jvm.tasks.Jar>("sourcesJar") {
    archiveClassifier.set("sources")
    from(sourceSets["main"].allSource)
}

val javadocJar = tasks.register<org.gradle.jvm.tasks.Jar>("javadocJar") {
    archiveClassifier.set("javadoc")
    from(tasks.javadoc)
}

tasks.jar {
    archiveBaseName.set(moduleName)
    archiveClassifier.set("")

    // Include classes from fatJar dependencies
    val fatJarProjects = configurations["fatJar"].dependencies.filterIsInstance<ProjectDependency>().map { project(it.path) }

    // Only this project's classes are required as explicit dependency
    dependsOn(tasks.named("classes"))
    dependsOn(configurations.getByName("runtimeClasspath").dependencies.mapNotNull { dep ->
        if (dep is ProjectDependency) {
            project(dep.path).tasks.findByName("classes")
        } else {
            null
        }
    })
    dependsOn(fatJarProjects.mapNotNull { it.tasks.findByName("compileJava") })
    dependsOn(fatJarProjects.mapNotNull { it.tasks.findByName("processResources") })

    from(sourceSets.main.get().output)

    from(fatJarProjects.flatMap { it.sourceSets["main"].output })

    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            artifactId = moduleName
            group = LibExt.groupId
            version = LibExt.libVersion
            artifact(tasks.jar)
            artifact(sourcesJar)
            artifact(javadocJar)
            pom.withXml {
                val dependencies = asNode().appendNode("dependencies")
                includePom.dependencies.forEach {
                    val dependencyNode = dependencies.appendNode("dependency")
                    dependencyNode.appendNode("groupId", it.group)
                    dependencyNode.appendNode("artifactId", it.name)
                    dependencyNode.appendNode("version", it.version)
                }
            }
        }
    }
}