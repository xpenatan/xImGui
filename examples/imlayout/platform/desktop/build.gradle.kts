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
    implementation(project(":examples:imlayout:core"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-jni:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imgui-jni_desktop:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imlayout-jni:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imlayout-jni_desktop:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-jni"))
        implementation(project(":extensions:imlayout:imlayout-jni"))
    }

    implementation(project(":fdx:fdx-gl-impl"))
    implementation("io.github.libfdx:backend_desktop:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:backend_desktop_native:${LibExt.libFdxVersion}")
    runtimeOnly("io.github.libfdx:gl_desktop_native:${LibExt.libFdxVersion}")
}

val mainClassName = "imgui.example.imlayout.Main"
val assetsDir = project.file("../../../assets")

tasks.register<JavaExec>("imlayout_desktop_run") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}
