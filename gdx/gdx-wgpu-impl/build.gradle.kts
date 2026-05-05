plugins {
    id("java-library")
}

val moduleName = "gdx-wgpu-impl"

dependencies {
    implementation(project(":imgui:imgui-core"))
    api(project(":gdx:gdx-shared-impl"))
    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    api("${LibExt.gdxWebGPUGroup}:gdx-webgpu:${LibExt.gdxWebGPUVersion}")
    implementation("com.github.xpenatan.jParser:api-core:${LibExt.jParserVersion}")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
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