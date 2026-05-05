plugins {
    id("java")
}

val moduleName = "textedit-jni"

val libDir = "${project.projectDir}/../textedit-build/build/c++/libs"
val windowsFile = "$libDir/windows/vc/jni/textedit64.dll"
val linuxFile = "$libDir/linux/jni/libtextedit64.so"
val macArmFile = "$libDir/mac/arm/jni/libtexteditarm64.dylib"
val macFile = "$libDir/mac/jni/libtextedit64.dylib"

dependencies {
    implementation(project(":imgui:imgui-core"))
    implementation("com.github.xpenatan.jParser:api-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:runtime-core:${LibExt.jParserVersion}")
}

val platforms: MutableMap<String, Jar.() -> Unit> = mutableMapOf()
if(file(windowsFile).exists()) {
    platforms["windows-64"] = { from(windowsFile) }
}
if(file(linuxFile).exists()) {
    platforms["linux-x64"] = { from(linuxFile) }
}
if(file(macFile).exists()) {
    platforms["mac-x64"] = { from(macFile) }
}
if(file(macArmFile).exists()) {
    platforms["mac-arm64"] = { from(macArmFile) }
}

val nativeJars = platforms.map { (classifier, config) ->
    tasks.register<Jar>("nativeJar${classifier}") {
        config()
        archiveClassifier.set(classifier)
    }
}

val nativeRuntime by configurations.creating {
    isCanBeConsumed = true
    isCanBeResolved = false
}

val includeNativesInMainJar = !gradle.startParameter.taskNames.any { it.contains("publish", ignoreCase = true) }
tasks.jar {
    if(includeNativesInMainJar) {
        if(file(windowsFile).exists()) from(windowsFile)
        if(file(linuxFile).exists()) from(linuxFile)
        if(file(macFile).exists()) from(macFile)
        if(file(macArmFile).exists()) from(macArmFile)
    }
}

artifacts {
    nativeJars.forEach { add(nativeRuntime.name, it) }
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
}

java {
    withJavadocJar()
    withSourcesJar()
}

tasks.named("clean") {
    doFirst {
        val srcPath = "$projectDir/src/main/java"
        project.delete(files(srcPath))
    }
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            artifactId = moduleName
            group = LibExt.groupId
            version = LibExt.libVersion
            from(components["java"])
            nativeJars.forEach { artifact(it) }
        }
    }
}