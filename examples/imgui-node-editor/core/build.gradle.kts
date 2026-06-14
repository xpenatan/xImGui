plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
}

dependencies {
    implementation(project(":examples:basic:base"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-core:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:nodeeditor-core:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-core"))
        implementation(project(":extensions:imgui-node-editor:nodeeditor-core"))
    }

    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
}
