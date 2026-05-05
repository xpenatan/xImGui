plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
}

val mainClassName = "imgui.example.textedit.Build"

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:ImGuiColorTextEdit:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:textedit-web:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-web"))
        implementation(project(":extensions:ImGuiColorTextEdit:textedit-web"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.gdx-teavm:backend-web:${LibExt.gdxTeaVMVersion}")
}

tasks.register<JavaExec>("textedit_run_web") {
    group = "example-teavm"
    description = "Build teavm example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}