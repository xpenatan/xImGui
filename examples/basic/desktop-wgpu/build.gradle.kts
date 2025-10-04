import org.gradle.nativeplatform.platform.internal.DefaultNativePlatform

plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:basic:core"))
    implementation(project(":examples:impl:gdx-wgpu"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-desktop:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-desktop"))
    }

    implementation("com.badlogicgames.gdx:gdx-platform:${LibExt.gdxVersion}:natives-desktop")
    implementation("io.github.monstroussoftware.gdx-webgpu:gdx-desktop-webgpu:${LibExt.gdxWebGPUVersion}")
}

val mainClassName = "imgui.example.basic.Main"
val assetsDir = File("../assets");

tasks.register<JavaExec>("imgui_basic_run_desktop_wgpu") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}