plugins {
    id("java")
}

val mainClassName = "imgui.BuildImLayout"

dependencies {
    implementation(project(":imgui:imgui-core")) // Will use IDL helper class form imgui core
    implementation("com.github.xpenatan.jParser:gen-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-build:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-build-tool:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-web:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-jni:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-ffm:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:gen-idl:${LibExt.jParserVersion}")
}

tasks.register<JavaExec>("build_project") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "gen_jni", "gen_web")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_web_wasm") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_web", "web_wasm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64_jni") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "windows64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64_jni") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "linux64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64_jni") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "mac64_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm_jni") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "macArm_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_android_jni") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "android_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_ios_jni") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_jni", "ios_jni")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_windows64_ffm") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "windows64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_linux64_ffm") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "linux64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_mac64_ffm") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "mac64_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("build_project_macArm_ffm") {
    group = "imlayout"
    description = "Generate native project"
    mainClass.set(mainClassName)
    args = mutableListOf("gen_ffm", "macArm_ffm")
    classpath = sourceSets["main"].runtimeClasspath
}