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
        implementation("com.github.xpenatan.xImGui:imgui-ext-core:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:gdx-gl-impl:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui-ext:ext-core"))
        implementation(project(":gdx:gdx-gl-impl"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
}
