plugins {
    id("java")
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:basic:core"))
    implementation(project(":examples:impl:gdx-wgpu"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-web_wasm:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-web"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.gdx-teavm:backend-web:${LibExt.gdxTeaVMVersion}")
    implementation("${LibExt.gdxWebGPUGroup}:backend-teavm:${LibExt.gdxWebGPUVersion}")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
}

val mainClassName = "imgui.example.basic.Build"

tasks.register<JavaExec>("imgui_basic_run_teavm_wgpu") {
    group = "example-teavm"
    description = "Build basic example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}
