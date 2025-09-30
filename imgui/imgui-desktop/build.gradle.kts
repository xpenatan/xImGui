plugins {
    id("java")
}

val moduleName = "imgui-desktop"

val imguiDir = "${rootProject.projectDir}/imgui"
val windowsFile = "$imguiDir/imgui-build/build/c++/libs/windows/vc/imgui64.dll"
val linuxFile = "$imguiDir/imgui-build/build/c++/libs/linux/libimgui64.so"
val macArmFile = "$imguiDir/imgui-build/build/c++/libs/mac/arm/libimguiarm64.dylib"
val macFile = "$imguiDir/imgui-build/build/c++/libs/mac/libimgui64.dylib"

tasks.jar {
    from(windowsFile)
    from(linuxFile)
    from(macArmFile)
    from(macFile)
}

java {
    sourceCompatibility = JavaVersion.toVersion(LibExt.java8Target)
    targetCompatibility = JavaVersion.toVersion(LibExt.java8Target)
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