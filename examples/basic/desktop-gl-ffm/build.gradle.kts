import org.gradle.nativeplatform.platform.internal.DefaultNativePlatform

plugins {
    id("java")
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:basic:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-ffm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-ffm:-SNAPSHOT:windows_64")
        implementation("com.github.xpenatan.xImGui:imgui-ffm:-SNAPSHOT:linux_x64")
        implementation("com.github.xpenatan.xImGui:imgui-ffm:-SNAPSHOT:mac_x64")
        implementation("com.github.xpenatan.xImGui:imgui-ffm:-SNAPSHOT:mac_arm64")
    }
    else {
        implementation(project(":imgui:imgui-ffm"))
    }

    implementation("com.badlogicgames.gdx:gdx-backend-lwjgl3:${LibExt.gdxVersion}")
    implementation("com.badlogicgames.gdx:gdx-platform:${LibExt.gdxVersion}:natives-desktop")
}

val mainClassName = "imgui.example.basic.Main"
val assetsDir = File("../assets");

tasks.register<JavaExec>("imgui_basic_run_desktop_gl_ffm") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}