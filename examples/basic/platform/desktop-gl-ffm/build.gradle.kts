import org.gradle.nativeplatform.platform.internal.DefaultNativePlatform

plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:basic:core"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-ffm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-ffm_windows_x64:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-ffm_linux_x64:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-ffm_mac_x64:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-ffm_mac_arm64:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-ffm"))
    }

    implementation(project(":backends:fdx:fdx-gl-impl"))
    implementation("io.github.libfdx:backend_desktop:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:backend_desktop_native:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:gl_desktop_native:${LibExt.libFdxVersion}")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1:natives-linux")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1:natives-macos")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1:natives-macos-arm64")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1:natives-windows")
}

val mainClassName = "imgui.example.basic.Main"
val assetsDir = project.file("../../../assets")

tasks.register<JavaExec>("imgui_basic_desktop_gl_ffm_run") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}
