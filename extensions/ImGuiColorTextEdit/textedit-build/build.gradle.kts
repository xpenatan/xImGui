import de.undercouch.gradle.tasks.download.Download
import org.gradle.kotlin.dsl.support.unzipTo

plugins {
    id("java")
    id("de.undercouch.download") version("5.5.0")
}

val mainClassName = "imgui.BuildTextEdit"

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
val zippedPath = "${buildDir}/text-edit.zip"
val sourcePath = "${buildDir}/text-edit/"
val sourceDestination = "${buildDir}/ImGuiColorTextEdit/"

val zippedVendorPath = "${buildDir}/regex.zip"
val sourceVendorPath = "${buildDir}/regex/"
val sourceVendorDestination = "${buildDir}/ImGuiColorTextEdit/vendor/regex"

tasks.register<Download>("download_textedit_source") {
    group = "textedit"
    description = "Download source"
    src("https://github.com/santaclose/ImGuiColorTextEdit/archive/264bee49ddc3c789b05d928d09c628649458da47.zip")
    dest(File(zippedPath))
    doLast {
        unzipTo(File(sourcePath), dest)
        copy{
            from("$sourcePath/ImGuiColorTextEdit-264bee49ddc3c789b05d928d09c628649458da47")
            into(sourceDestination)
        }
        delete(sourcePath)
        delete(zippedPath)
    }
}

tasks.register<Download>("download_vendor_source") {
    group = "textedit"
    description = "Download source"
    src("https://github.com/boostorg/regex/archive/4cbcd3078e6ae10d05124379623a1bf03fcb9350.zip")
    dest(File(zippedVendorPath))
    doLast {
        unzipTo(File(sourceVendorPath), dest)
        copy{
            from("$sourceVendorPath/regex-4cbcd3078e6ae10d05124379623a1bf03fcb9350/")
            into(sourceVendorDestination)
        }
        delete(sourceVendorPath)
        delete(zippedVendorPath)
    }
}

tasks.register("download_source") {
    group = "textedit"
    description = "Download source"

    val list = listOf("download_textedit_source", "download_vendor_source")
    dependsOn(list)

    tasks.findByName("download_vendor_source")?.mustRunAfter("download_textedit_source")
}

tasks.register<JavaExec>("build_project") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "gen_jni", "gen_web")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_web_wasm") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_web", "web_wasm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64_jni") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "windows64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64_jni") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "linux64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64_jni") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "mac64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm_jni") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "macArm_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_android_jni") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "android_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_ios_jni") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "ios_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64_ffm") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "windows64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64_ffm") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "linux64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64_ffm") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "mac64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm_ffm") {
    group = "textedit"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "macArm_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}