plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java8Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java8Target)
}

dependencies {
    implementation(project(":examples:basic:base"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-core:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imlayout-core:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:gdx-gl-impl:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-core"))
        implementation(project(":gdx:gdx-gl-impl"))
        implementation(project(":extensions:imlayout:imlayout-core"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
}
