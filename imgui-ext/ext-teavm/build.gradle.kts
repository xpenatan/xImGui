import org.gradle.jvm.tasks.Jar
import org.gradle.api.artifacts.ProjectDependency

plugins {
    id("java-library")
}

val moduleName = "imgui-ext-teavm"

val emscriptenFile = "$projectDir/../../imgui/imgui-build/build/c++/libs/emscripten/ext/imgui.wasm.js"

val includePom = configurations.create("includePom")
includePom.extendsFrom(configurations["implementation"])
includePom.isCanBeResolved = true

val fatJar = configurations.create("fatJar")
fatJar.extendsFrom(configurations["implementation"])
fatJar.isCanBeResolved = true

dependencies {
    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")

    fatJar(project(":imgui:imgui-teavm"))
    fatJar(project(":extensions:imlayout:imlayout-teavm"))
    fatJar(project(":extensions:ImGuiColorTextEdit:textedit-teavm"))
    fatJar(project(":extensions:imgui-node-editor:nodeeditor-teavm"))

    includePom("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    includePom("com.github.xpenatan.jParser:loader-teavm:${LibExt.jParserVersion}")
    includePom("org.teavm:teavm-jso:${LibExt.teaVMVersion}")
}

tasks.named("clean") {
    doFirst {
        val srcPath = "$projectDir/src/main/java"
        val jsPath = "$projectDir/src/main/resources/imgui.wasm.js"
        project.delete(files(srcPath, jsPath))
    }
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
}

val fromClasses = tasks.register<Jar>("fromClasses") {
    val dependencies = configurations.compileClasspath.get()
    from(dependencies.map(::zipTree)) {
        exclude("imgui.wasm.js")
    }
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    dependsOn("assemble")
}

val sourcesJar = tasks.register<Jar>("sourcesJar") {
    archiveClassifier.set("sources")
    from(sourceSets["main"].allSource)
}

val javadocJar = tasks.register<Jar>("javadocJar") {
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
    dependsOn(fatJarProjects.map { it.tasks.named("compileJava") })

    from(emscriptenFile)
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