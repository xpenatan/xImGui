plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
}

val mainClassName = "imgui.example.nodeeditor.Build"

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:imgui-node-editor:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-web_wasm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:nodeeditor-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:nodeeditor-web_wasm:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-web"))
        implementation(project(":extensions:imgui-node-editor:nodeeditor-web"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.gdx-teavm:backend-web:${LibExt.gdxTeaVMVersion}")
}

tasks.register<JavaExec>("nodeeditor_run_web") {
    group = "example-teavm"
    description = "Build teavm example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}
