plugins {
    id("com.android.library")
    kotlin("android")
}

val moduleName = "imgui-android"

android {
    namespace = "imgui"
    compileSdk = 36

    defaultConfig {
        minSdk = 21
    }

    sourceSets {
        named("main") {
            jniLibs.srcDirs("$projectDir/../imgui-build/build/c++/libs/android")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.toVersion(LibExt.java11Target)
        targetCompatibility = JavaVersion.toVersion(LibExt.java11Target)
    }
}

dependencies {
}

// TODO Uncomment when android is ready
//publishing {
//    publications {
//        create<MavenPublication>("maven") {
//            artifactId = moduleName
//            group = LibExt.groupId
//            version = LibExt.libVersion
//            afterEvaluate {
//                from(components["release"])
//            }
//        }
//    }
//}