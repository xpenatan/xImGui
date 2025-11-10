plugins {
    id("java-library")
}

val moduleName = "imgui-ext-core"

val includePom = configurations.create("includePom")
includePom.extendsFrom(configurations.api.get())

dependencies {
    includePom("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    includePom("com.github.xpenatan.jParser:idl-core:${LibExt.jParserVersion}")
    api(project(":imgui:imgui-core"))
    api(project(":extensions:imlayout:imlayout-core"))
    api(project(":extensions:ImGuiColorTextEdit:textedit-core"))
    api(project(":extensions:imgui-node-editor:nodeeditor-core"))
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java8Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java8Target)
}

java {
    withJavadocJar()
    withSourcesJar()
}
tasks.register<Jar>("fatJar") {
    archiveBaseName.set(moduleName)
    archiveClassifier.set("")

    dependsOn(tasks.named("classes")) // This project’s classes
    dependsOn(configurations["api"].dependencies.mapNotNull { dep ->
        if (dep is ProjectDependency) {
            dep.dependencyProject.tasks.findByName("classes")
        } else {
            null
        }
    })

    from(sourceSets.main.get().output)

    from({
        configurations["api"].dependencies
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
            artifact(tasks["fatJar"])
            artifact(tasks["sourcesJar"]) {
                classifier = "sources"
            }
            artifact(tasks["javadocJar"]) {
                classifier = "javadoc"
            }
            pom {
                withXml {
                    val rootNode = asNode()
                    // Find or create the <dependencies> node
                    val deps = rootNode["dependencies"]
                    val dependenciesNode: groovy.util.Node = if (deps is groovy.util.NodeList && !deps.isEmpty()) {
                        deps[0] as groovy.util.Node
                    } else {
                        rootNode.appendNode("dependencies")
                    }

                    // Remove all existing <dependency> children safely
                    val childrenToRemove = dependenciesNode.children().toList()
                    childrenToRemove.forEach { child ->
                        dependenciesNode.remove(child as groovy.util.Node)
                    }

                    // Add only the includePom configuration dependencies
                    configurations["includePom"].dependencies.forEach { dep ->
                        val dependencyNode = dependenciesNode.appendNode("dependency")
                        dependencyNode.appendNode("groupId", dep.group)
                        dependencyNode.appendNode("artifactId", dep.name)
                        dependencyNode.appendNode("version", dep.version)
                        dependencyNode.appendNode("scope", "compile")
                    }
                }
            }
        }
    }
}

tasks.withType<GenerateModuleMetadata> {
    enabled = false
}