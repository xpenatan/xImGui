plugins {
    id("java")
    id("org.gretty") version("3.1.0")
}

gretty {
    contextPath = "/"
    extraResourceBase("build/dist/webapp")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
}

val mainClassName = "imgui.example.imlayout.Build"

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:imlayout:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-ext-teavm:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui-ext:ext-teavm"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.gdx-teavm:backend-teavm:${LibExt.gdxTeaVMVersion}")
}

tasks.register<JavaExec>("imlayout_build_teavm") {
    group = "example-teavm"
    description = "Build basic example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}

tasks.register("imlayout_run_teavm") {
    group = "example-teavm"
    description = "Run teavm app"
    val list = listOf("imlayout_build_teavm", "jettyRun")
    dependsOn(list)

    tasks.findByName("jettyRun")?.mustRunAfter("imlayout_build_teavm")
}