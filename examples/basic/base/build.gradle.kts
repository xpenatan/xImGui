plugins {
    id("java-library")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
}

dependencies {
    if(LibExt.useRepoLibs) {
        api("com.github.xpenatan.xImGui:imgui-core:-SNAPSHOT")
        api("com.github.xpenatan.xImGui:fdx-shared-impl:-SNAPSHOT")
    }
    else {
        api(project(":imgui:imgui-core"))
        api(project(":fdx:fdx-shared-impl"))
    }
}
