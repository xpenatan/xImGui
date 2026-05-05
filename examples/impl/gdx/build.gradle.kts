plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
}

dependencies {
    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation(project(":examples:basic:base"))

    implementation(project(":gdx:gdx-gl-impl"))
    implementation(project(":imgui:imgui-core"))
}
