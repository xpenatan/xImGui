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
    implementation(project(":examples:imgui-node-editor:core"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-jni:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-jni_desktop:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:nodeeditor-jni:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:nodeeditor-jni_desktop:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-jni"))
        implementation(project(":extensions:imgui-node-editor:nodeeditor-jni"))
    }

    implementation(project(":fdx:fdx-gl-impl"))
    implementation("io.github.libfdx:backend_desktop:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:backend_desktop_native:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:gl_desktop_native:${LibExt.libFdxVersion}")
}

val mainClassName = "imgui.example.nodeeditor.Main"
val assetsDir = project.file("../../../assets")

tasks.register<JavaExec>("nodeeditor_desktop_run") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}
