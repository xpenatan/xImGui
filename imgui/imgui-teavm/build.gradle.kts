plugins {
    id("java-library")
}

val moduleName = "imgui-teavm"

val emscriptenJS = "$projectDir/../imgui-build/build/c++/libs/emscripten/imgui.js"
val emscriptenWASM = "$projectDir/../imgui-build/build/c++/libs/emscripten/imgui.wasm"

tasks.jar {
    from(emscriptenJS, emscriptenWASM)
}

tasks.jar {
    from(emscriptenJS, emscriptenWASM)
}


dependencies {
    api("com.github.xpenatan.jParser:idl-helper-core:${LibExt.jParserVersion}")
    api("com.github.xpenatan.jParser:idl-helper-teavm:${LibExt.jParserVersion}")

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:loader-teavm:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:idl-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:idl-teavm:${LibExt.jParserVersion}")
    implementation("org.teavm:teavm-jso:${LibExt.teaVMVersion}")
    implementation("org.teavm:teavm-core:${LibExt.teaVMVersion}")
    implementation("org.teavm:teavm-classlib:${LibExt.teaVMVersion}")
    implementation("org.teavm:teavm-jso-apis:${LibExt.teaVMVersion}")
}

tasks.named("clean") {
    doFirst {
        val srcPath = "$projectDir/src/main/java"
        val jsPath = "$projectDir/src/main/resources/imgui.wasm.js"
        project.delete(files(srcPath, jsPath))
    }
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
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