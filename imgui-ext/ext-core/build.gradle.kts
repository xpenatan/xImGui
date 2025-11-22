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
    sourceCompatibility = JavaVersion.toVersion(LibExt.java8Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java8Target)
}

java {
    withJavadocJar()
    withSourcesJar()
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
    dependsOn(fatJarProjects.map { it.tasks.named("processResources") })

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