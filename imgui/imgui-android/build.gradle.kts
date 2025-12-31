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
        sourceCompatibility = JavaVersion.toVersion(LibExt.java8Target)
        targetCompatibility = JavaVersion.toVersion(LibExt.java8Target)
    }
}

dependencies {
    api("com.github.xpenatan.jParser:idl-helper-android:${LibExt.jParserVersion}")
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