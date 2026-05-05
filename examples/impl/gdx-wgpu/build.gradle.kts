plugins {
    id("java-library")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
}

dependencies {
    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation(project(":examples:basic:base"))
    api(project(":gdx:gdx-wgpu-impl"))
    implementation(project(":imgui:imgui-core"))
}