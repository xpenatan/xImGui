plugins {
    id("java")
    id("org.gretty") version("3.1.0")
}

gretty {
    contextPath = "/"
    extraResourceBase("build/dist/webapp")
}

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:basic:core"))
    implementation(project(":examples:impl:gdx-wgpu"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-teavm:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-teavm"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.gdx-teavm:backend-teavm:${LibExt.gdxTeaVMVersion}")
    implementation("io.github.monstroussoftware.gdx-webgpu:gdx-teavm-webgpu:${LibExt.gdxWebGPUVersion}")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
}

val mainClassName = "imgui.example.basic.Build"

tasks.register<JavaExec>("imgui_basic_build_teavm_wgpu") {
    group = "example-teavm"
    description = "Build basic example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register("imgui_basic_run_teavm_wgpu") {
    group = "example-teavm"
    description = "Run teavm app"
    val list = listOf("imgui_basic_build_teavm_wgpu", "jettyRun")
    dependsOn(list)

    tasks.findByName("jettyRun")?.mustRunAfter("imgui_basic_build_teavm_wgpu")
}