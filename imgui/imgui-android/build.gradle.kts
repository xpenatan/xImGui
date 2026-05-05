plugins {
    id("com.android.library")
}

val moduleName = "imgui-android"

android {
    namespace = "imgui"
    compileSdk = 36

    defaultConfig {
        minSdk = 29
    }

    sourceSets {
        named("main") {
            jniLibs.srcDirs("$projectDir/../imgui-build/build/c++/libs/android")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
        targetCompatibility = JavaVersion.toVersion(LibExt.javaMainTarget)
    }
}

dependencies {
    api("com.github.xpenatan.jParser:runtime-android:${LibExt.jParserVersion}")
}

tasks.named("clean") {
    doFirst {
        val srcPath = "$projectDir/src/main/java"
        project.delete(files(srcPath))
    }
}

// TODO Uncomment when android is ready
//publishing {
//    publications {
//        create<MavenPublication>("maven") {
//            artifactId = moduleName
//            group = LibExt.groupId
//            version = LibExt.libVersion
//            afterEvaluate {
//                artifact(tasks.named("bundleReleaseAar"))
//            }
//        }
//    }
//}