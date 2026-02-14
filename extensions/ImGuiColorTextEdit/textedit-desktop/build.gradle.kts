plugins {
    id("java")
}

val moduleName = "textedit-desktop"

val libDir = "${project.projectDir}/../textedit-build/build/c++/libs"
val windowsFile = "$libDir/windows/vc/textedit64.dll"
val linuxFile = "$libDir/linux/libtextedit64.so"
val macArmFile = "$libDir/mac/arm/libtexteditarm64.dylib"
val macFile = "$libDir/mac/libtextedit64.dylib"

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