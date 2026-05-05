plugins {
    id("java")
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
    targetCompatibility = JavaVersion.toVersion(LibExt.javaWebTarget)
}

val mainClassName = "imgui.example.imlayout.Build"

dependencies {
    implementation(project(":examples:basic:base"))
    implementation(project(":examples:imlayout:core"))
    implementation(project(":examples:impl:gdx"))

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-web:-SNAPSHOT")
        implementation("com.github.xpenatan.xImGui:imlayout-web:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-web"))
        implementation(project(":extensions:imlayout:imlayout-web"))
    }

    implementation("com.badlogicgames.gdx:gdx:${LibExt.gdxVersion}")
    implementation("com.github.xpenatan.gdx-teavm:backend-web:${LibExt.gdxTeaVMVersion}")
}

tasks.register<JavaExec>("imlayout_run_web") {
    group = "example-teavm"
    description = "Build basic example"
    mainClass.set(mainClassName)
    classpath = sourceSets["main"].runtimeClasspath
}