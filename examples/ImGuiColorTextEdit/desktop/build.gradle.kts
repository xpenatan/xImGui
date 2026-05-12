import org.gradle.nativeplatform.platform.internal.DefaultNativePlatform

plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:ImGuiColorTextEdit:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-jni:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-jni_desktop:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:textedit-jni:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:textedit-jni_desktop:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-jni"))
        implementation(project(":extensions:ImGuiColorTextEdit:textedit-jni"))
    }

    implementation("com.badlogicgames.gdx:gdx-backend-lwjgl3:${LibExt.gdxVersion}")
    implementation("com.badlogicgames.gdx:gdx-platform:${LibExt.gdxVersion}:natives-desktop")
}

val mainClassName = "imgui.example.textedit.Main"
val assetsDir = File("../assets");

tasks.register<JavaExec>("textedit_run_desktop") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}