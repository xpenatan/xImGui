import de.undercouch.gradle.tasks.download.Download
import org.gradle.kotlin.dsl.support.unzipTo

plugins {
    id("java")
    id("de.undercouch.download") version("5.4.0")
}

val mainClassName = "BuildImGui"

dependencies {
    implementation(project(":imgui:imgui-base"))
    implementation("com.github.xpenatan.jParser:gen-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-build:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-build-tool:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-web:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-jni:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-ffm:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-idl:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:runtime-core:${LibExt.jParserVersion}")
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
    args = mutableListOf("gen_ffm", "gen_jni", "gen_web")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_web_wasm") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_web", "web_wasm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64_jni") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "windows64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64_jni") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "linux64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64_jni") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "mac64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm_jni") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "macArm_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_android_jni") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "android_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_ios_jni") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "ios_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64_ffm") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "windows64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64_ffm") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "linux64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64_ffm") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "mac64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm_ffm") {
    group = "imgui"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "macArm_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}