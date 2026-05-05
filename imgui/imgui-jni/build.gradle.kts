plugins {
    id("java-library")
}

val moduleName = "imgui-jni"

val imguiDir = "${rootProject.projectDir}/imgui"
val windowsFile = "$imguiDir/imgui-build/build/c++/libs/windows/vc/jni/imgui64.dll"
val linuxFile = "$imguiDir/imgui-build/build/c++/libs/linux/jni/libimgui64.so"
val macArmFile = "$imguiDir/imgui-build/build/c++/libs/mac/arm/jni/libimguiarm64.dylib"
val macFile = "$imguiDir/imgui-build/build/c++/libs/mac/jni/libimgui64.dylib"

dependencies {
    implementation("com.github.xpenatan.jParser:api-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:runtime-jni:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:runtime-jni-windows-64:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:runtime-jni-linux-x64:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:runtime-jni-mac-x64:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:runtime-jni-mac-arm64:${LibExt.jParserVersion}")
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

tasks.named("clean") {
    doFirst {
        val srcPath = "$projectDir/src/main/java"
        project.delete(files(srcPath))
    }
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
}

java {
    withJavadocJar()
    withSourcesJar()
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