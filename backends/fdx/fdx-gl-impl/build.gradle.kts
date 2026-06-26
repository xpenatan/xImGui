plugins {
    id("java-library")
    id("maven-publish")
}

val moduleName = "fdx-gl-impl"
val javaVersion = JavaVersion.toVersion(LibExt.javaFFMTarget)

group = LibExt.groupId
version = LibExt.libVersion

dependencies {
    api(project(":backends:fdx:fdx-shared-impl"))
    api("io.github.libfdx:gl_core:${LibExt.libFdxVersion}")
}

java {
    sourceCompatibility = javaVersion
    targetCompatibility = javaVersion
}

java {
    withJavadocJar()
    withSourcesJar()
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            artifactId = moduleName
            group = LibExt.groupId
            version = LibExt.libVersion
            from(components["java"])
        }
    }
}
