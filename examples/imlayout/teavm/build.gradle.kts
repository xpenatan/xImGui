plugins {
    id("java")
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
        implementation("com.github.xpenatan.xImGui:imgui-teavm:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imlayout-teavm:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-teavm"))
        implementation(project(":extensions:imlayout:imlayout-teavm"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.gdx-teavm:backend-web:${LibExt.gdxTeaVMVersion}")
}

tasks.register<JavaExec>("imlayout_run_teavm") {
    group = "example-teavm"
    description = "Build basic example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}