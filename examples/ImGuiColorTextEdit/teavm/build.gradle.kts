plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
}

val mainClassName = "imgui.example.textedit.Build"

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:ImGuiColorTextEdit:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-teavm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:textedit-teavm:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-teavm"))
        implementation(project(":extensions:ImGuiColorTextEdit:textedit-teavm"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.gdx-teavm:backend-web:${LibExt.gdxTeaVMVersion}")
}

tasks.register<JavaExec>("textedit_run_teavm") {
    group = "example-teavm"
    description = "Build teavm example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}