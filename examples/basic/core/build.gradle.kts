plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
}

dependencies {
    implementation(project(":examples:basic:base"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-core:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-core"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
}
