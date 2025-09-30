plugins {
    id("java-library")
}

val moduleName = "imgui-ext-teavm"

val emscriptenFile = "$projectDir/../../imgui/imgui-build/build/c++/libs/emscripten/ext/imgui.wasm.js"

val includePom = configurations.create("includePom")
includePom.extendsFrom(configurations.implementation.get())

dependencies {
    implementation(project(":imgui:imgui-teavm"))
    implementation(project(":extensions:imlayout:imlayout-teavm"))
    implementation(project(":extensions:ImGuiColorTextEdit:textedit-teavm"))
    implementation(project(":extensions:imgui-node-editor:nodeeditor-teavm"))
    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")

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
    val dependencies = configurations
        .compileClasspath
        .get()
    from((dependencies).map(::zipTree)) {
        exclude("imgui.wasm.js")
    }
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    dependsOn("assemble")
}

val sourcesJar = tasks.register<Jar>("sourcesJar") {
    archiveClassifier.set("sources")
    from(sourceSets["main"].allSource) {
    }
}

val javadocJar = tasks.register<Jar>("javadocJar") {
    archiveClassifier.set("javadoc")
    from(tasks.javadoc)
}

tasks.jar {
    archiveBaseName.set(moduleName)
    archiveClassifier.set("")

    dependsOn(tasks.named("classes")) // This project’s classes
    dependsOn(configurations["implementation"].dependencies.mapNotNull { dep ->
        if (dep is ProjectDependency) {
            dep.dependencyProject.tasks.findByName("classes")
        } else {
            null
        }
    })

    from(emscriptenFile)
    from(sourceSets.main.get().output)

    from({
        configurations["implementation"].dependencies
            .filterIsInstance<ProjectDependency>()
            .mapNotNull { dep ->
                val output = dep.dependencyProject.sourceSets.main.get().output
                output.takeIf { it.files.any { file -> file.exists() } }
            }
    })

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