plugins {
    id("java-library")
    id("maven-publish")
}

val moduleName = "fdx-shared-impl"
val javaVersion = JavaVersion.toVersion(LibExt.javaFFMTarget)

group = LibExt.groupId
version = LibExt.libVersion

dependencies {
    api(project(":imgui:imgui-core"))
    api("io.github.libfdx:fdx:${LibExt.libFdxVersion}")
    api("io.github.libfdx:application:${LibExt.libFdxVersion}")
    api("io.github.libfdx:display:${LibExt.libFdxVersion}")
    api("io.github.libfdx:input:${LibExt.libFdxVersion}")
    api("io.github.libfdx:graphics:${LibExt.libFdxVersion}")

    testImplementation("junit:junit:${LibExt.jUnitVersion}")
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
