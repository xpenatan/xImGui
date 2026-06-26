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
    implementation(project(":examples:ImGuiColorTextEdit:core"))

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

    implementation(project(":fdx:fdx-gl-impl"))
    implementation("io.github.libfdx:backend_desktop:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:backend_desktop_native:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:gl_desktop_native:${LibExt.libFdxVersion}")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1:natives-linux")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1:natives-macos")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1:natives-macos-arm64")
    runtimeOnly("org.lwjgl:lwjgl-opengl:3.4.1:natives-windows")
}

val mainClassName = "imgui.example.textedit.Main"
val assetsDir = project.file("../../../assets")

tasks.register<JavaExec>("textedit_desktop_run") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}
