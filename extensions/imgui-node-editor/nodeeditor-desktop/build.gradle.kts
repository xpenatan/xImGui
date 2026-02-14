plugins {
    id("java")
}

val moduleName = "nodeeditor-desktop"

val libDir = "${project.projectDir}/../nodeeditor-build/build/c++/libs"
val windowsFile = "$libDir/windows/vc/nodeeditor64.dll"
val linuxFile = "$libDir/linux/libnodeeditor64.so"
val macArmFile = "$libDir/mac/arm/libnodeeditorarm64.dylib"
val macFile = "$libDir/mac/libnodeeditor64.dylib"

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