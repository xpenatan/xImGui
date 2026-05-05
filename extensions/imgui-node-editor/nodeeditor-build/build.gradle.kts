import de.undercouch.gradle.tasks.download.Download
import org.gradle.kotlin.dsl.support.unzipTo

plugins {
    id("java")
    id("de.undercouch.download") version("5.5.0")
}

val mainClassName = "imgui.BuildNodeEditor"

dependencies {
    implementation(project(":imgui:imgui-core"))
    implementation("com.github.xpenatan.jParser:gen-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-build:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-build-tool:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-web:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-jni:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-ffm:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-idl:${LibExt.jParserVersion}")
}

val buildDir = layout.buildDirectory.get().asFile
val zippedPath = "${buildDir}/nodeeditor.zip"
val sourcePath = "${buildDir}/nodeeditor/"
val sourceDestination = "${buildDir}/imgui-node-editor/"

tasks.register<Download>("download_source") {
    group = "node-editor"
    description = "Download source"
    src("https://github.com/stephen-os/imgui-node-editor/archive/3161c85bdeb654268797b216ea9a66739e03c446.zip")
    dest(File(zippedPath))
    doLast {
        unzipTo(File(sourcePath), dest)
        copy{
            from("$sourcePath/imgui-node-editor-3161c85bdeb654268797b216ea9a66739e03c446")
            into(sourceDestination)
        }
        delete(sourcePath)
        delete(zippedPath)
    }
}

tasks.register<JavaExec>("build_project") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "gen_jni", "gen_web")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_web_wasm") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_web", "web_wasm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64_jni") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "windows64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64_jni") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "linux64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64_jni") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "mac64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm_jni") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "macArm_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_android_jni") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "android_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_ios_jni") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "ios_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64_ffm") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "windows64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64_ffm") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "linux64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64_ffm") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "mac64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm_ffm") {
    group = "node-editor"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "macArm_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}