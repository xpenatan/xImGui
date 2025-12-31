plugins {
    id("java")
}

val moduleName = "imlayout-desktop"

val libDir = "${project.projectDir}/../imlayout-build/build/c++/libs"
val windowsFile = "$libDir/windows/vc/imlayout64.dll"
val linuxFile = "$libDir/linux/libimlayout64.so"
val macArmFile = "$libDir/mac/arm/libimlayoutarm64.dylib"
val macFile = "$libDir/mac/libimlayout64.dylib"

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