plugins {
    id("java-library")
}

val moduleName = "imgui-web"

val emscriptenJS = "$projectDir/../imgui-build/build/c++/libs/emscripten/imgui.js"
val emscriptenWASM = "$projectDir/../imgui-build/build/c++/libs/emscripten/imgui.wasm"

tasks.jar {
    from(emscriptenJS, emscriptenWASM)
}

tasks.jar {
    from(emscriptenJS, emscriptenWASM)
}


dependencies {
    api("com.github.xpenatan.jParser:runtime-core:${LibExt.jParserVersion}")
    api("com.github.xpenatan.jParser:runtime-web:${LibExt.jParserVersion}")
    api("com.github.xpenatan.jParser:runtime-web-wasm:${LibExt.jParserVersion}")

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:loader-web:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:api-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:api-web:${LibExt.jParserVersion}")
}

tasks.named("clean") {
    doFirst {
        val srcPath = "$projectDir/src/main/java"
        val jsPath = "$projectDir/src/main/resources/imgui.wasm.js"
        project.delete(files(srcPath, jsPath))
    }
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
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