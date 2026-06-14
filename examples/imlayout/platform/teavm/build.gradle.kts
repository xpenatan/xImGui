plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
}

val mainClassName = "imgui.example.imlayout.Build"

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:imlayout:core"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-web_wasm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imlayout-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imlayout-web_wasm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:fdx-gl-impl:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-web"))
        implementation(project(":extensions:imlayout:imlayout-web"))
        implementation(project(":fdx:fdx-gl-impl"))
    }

    implementation("io.github.libfdx:backend_web:${LibExt.libFdxVersion}")
    implementation("io.github.libfdx:gl_web:${LibExt.libFdxVersion}")
}

tasks.register<JavaExec>("imlayout_web_run") {
    group = "example-teavm"
    description = "Build basic example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}
