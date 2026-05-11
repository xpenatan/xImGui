import org.gradle.nativeplatform.platform.internal.DefaultNativePlatform

plugins {
    id("java")
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:basic:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-jni:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-jni_windows_x64:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-jni_linux_x64:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-jni_mac_x64:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-jni_mac_arm64:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-jni"))
    }

    implementation("com.badlogicgames.gdx:gdx-backend-lwjgl3:${LibExt.gdxVersion}")
    implementation("com.badlogicgames.gdx:gdx-platform:${LibExt.gdxVersion}:natives-desktop")
}

val mainClassName = "imgui.example.basic.Main"
val assetsDir = File("../assets");

tasks.register<JavaExec>("imgui_basic_run_desktop_gl_jni") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}