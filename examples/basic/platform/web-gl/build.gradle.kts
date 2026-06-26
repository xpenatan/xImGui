plugins {
    id("java")
}

val wasmLibraries by configurations.creating {
    isCanBeConsumed = false
    isCanBeResolved = true
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaFFMTarget)
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:basic:core"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-web:-SNAPSHOT")
        wasmLibraries("com.github.xpenatan.xImGui:imgui-web_wasm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:fdx-gl-impl:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-web"))
        wasmLibraries(project(path = ":imgui:imgui-web", configuration = "wasmRuntimeElements"))
        implementation(project(":backends:fdx:fdx-gl-impl"))
    }

    implementation("io.github.libfdx:backend_web:${LibExt.libFdxVersion}")
    implementation("io.github.libfdx:gl_web:${LibExt.libFdxVersion}")
}

val mainClassName = "imgui.example.basic.Build"

tasks.register<JavaExec>("imgui_basic_web_gl_run") {
    group = "example-teavm"
    description = "Build basic example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath + wasmLibraries
    inputs.files(wasmLibraries)
    doLast {
        copy {
            from(wasmLibraries.map { zipTree(it) }) {
                include("*.js", "*.wasm")
            }
            into(layout.buildDirectory.dir("dist/scripts"))
        }
    }
}
