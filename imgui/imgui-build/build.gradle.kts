import de.undercouch.gradle.tasks.download.Download
import org.gradle.kotlin.dsl.support.unzipTo

plugins {
    id("java")
    id("de.undercouch.download") version("5.4.0")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
}

val mainClassName = "BuildImGui"

dependencies {
    implementation(project(":imgui:imgui-base"))
    implementation("com.github.xpenatan.jParser:jParser-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:jParser-build:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:jParser-build-tool:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:jParser-teavm:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:jParser-cpp:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:jParser-idl:${LibExt.jParserVersion}")
}

val buildDir = layout.buildDirectory.get().asFile
val zippedPath = "${buildDir}/imgui-source.zip"
val sourcePath = "${buildDir}/imgui-source"
val sourceDestination = "${buildDir}/imgui/"

tasks.register<Download>("download_source") {
    group = "imgui"
    description = "Download imgui source"
    src("https://github.com/ocornut/imgui/archive/v1.92.4-docking.zip")
    dest(File(zippedPath))
    doLast {
        unzipTo(File(sourcePath), dest)
        copy{
            from(sourcePath)
            into(sourceDestination)

            eachFile {
                val paths = relativePath.segments.drop(1)
                relativePath = RelativePath(true, *paths.toTypedArray())
            }
        }
        delete(sourcePath)
        delete(zippedPath)
    }
}

tasks.register<JavaExec>("build_project") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf()
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_all") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("teavm", "windows64", "linux64", "mac64", "macArm", "android", "ios")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_teavm") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("teavm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("windows64")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("linux64")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("mac64")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("macArm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_android") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("android")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_ios") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("ios")
    classpath = sourceSets["main"].runtimeClasspath
}