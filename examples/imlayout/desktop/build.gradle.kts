import org.gradle.nativeplatform.platform.internal.DefaultNativePlatform

plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java8Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java8Target)
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:imlayout:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-desktop:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imlayout-desktop:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-desktop"))
        implementation(project(":extensions:imlayout:imlayout-desktop"))
    }

    implementation("com.badlogicgames.gdx:gdx-backend-lwjgl3:${LibExt.gdxVersion}")
    implementation("com.badlogicgames.gdx:gdx-platform:${LibExt.gdxVersion}:natives-desktop")
}

val mainClassName = "imgui.example.imlayout.Main"
val assetsDir = File("../assets");

tasks.register<JavaExec>("imlayout_run_desktop") {
    group = "example-desktop"
    description = "Run desktop app"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
    workingDir = assetsDir

    if(DefaultNativePlatform.getCurrentOperatingSystem().isMacOsX) {
        jvmArgs("-XstartOnFirstThread")
    }
}