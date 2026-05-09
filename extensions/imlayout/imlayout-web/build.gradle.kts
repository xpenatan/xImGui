plugins {
    id("java")
}

val moduleName = "imlayout-web"

val emscriptenJS = "$projectDir/../imlayout-build/build/c++/libs/emscripten/imlayout.js"
val emscriptenWASM = "$projectDir/../imlayout-build/build/c++/libs/emscripten/imlayout.wasm"

val wasmJar = tasks.register<Jar>("wasmJar") {
    from(emscriptenJS, emscriptenWASM)
    archiveBaseName.set("${moduleName}_wasm")
    archiveClassifier.set("")
}

val isPublishingTask = gradle.startParameter.taskNames.any { it.contains("publish", ignoreCase = true) }

tasks.named<Jar>("jar") {
    if(!isPublishingTask) {
        from(emscriptenJS, emscriptenWASM)
    }
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
}

dependencies {
    implementation(project(":imgui:imgui-web"))
    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.jParser:loader-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:loader-web:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:api-core:${LibExt.jParserVersion}")
    implementation("com.github.xpenatan.jParser:api-web:${LibExt.jParserVersion}")
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

        create<MavenPublication>("mavenWasm") {
            artifactId = "${moduleName}_wasm"
            group = LibExt.groupId
            version = LibExt.libVersion
            artifact(wasmJar)
        }
    }
}
