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

    implementation(project(":backends:fdx:fdx-wgpu-impl"))
    implementation("io.github.libfdx:backend_desktop:${LibExt.libFdxVersion}")
    implementation("io.github.libfdx:wgpu_desktop_ffm:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:backend_desktop_native:${LibExt.libFdxVersion}")
}

val mainClassName = "imgui.example.basic.Main"
val assetsDir = project.file("../../../assets")

tasks.register<JavaExec>("imgui_basic_desktop_wgpu_ffm_run") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}
