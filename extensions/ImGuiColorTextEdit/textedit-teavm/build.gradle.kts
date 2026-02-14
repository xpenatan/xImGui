plugins {
    id("java")
}

val moduleName = "textedit-teavm"

val emscriptenJS = "$projectDir/../textedit-build/build/c++/libs/emscripten/textedit.js"
val emscriptenWASM = "$projectDir/../textedit-build/build/c++/libs/emscripten/textedit.wasm"

tasks.jar {
    from(emscriptenJS, emscriptenWASM)
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
}

dependencies {
    implementation(project(":imgui:imgui-teavm"))
    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:loader-teavm:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:idl-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:idl-teavm:${LibExt.jParserVersion}")
    implementation("org.teavm:teavm-jso:${LibExt.teaVMVersion}")
}

tasks.named("clean") {
    doFirst {
        val srcPath = "$projectDir/src/main/java"
        project.delete(files(srcPath))
    }
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
        }
    }
}