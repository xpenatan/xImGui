plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
}

val mainClassName = "imgui.example.textedit.Build"

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:ImGuiColorTextEdit:core"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-web_wasm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:textedit-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:textedit-web_wasm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:fdx-gl-impl:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-web"))
        implementation(project(":extensions:ImGuiColorTextEdit:textedit-web"))
        implementation(project(":fdx:fdx-gl-impl"))
    }

    implementation("io.github.libfdx:backend_web:${LibExt.libFdxVersion}")
    implementation("io.github.libfdx:gl_web:${LibExt.libFdxVersion}")
}

tasks.register<JavaExec>("textedit_web_run") {
    group = "example-teavm"
    description = "Build teavm example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}
