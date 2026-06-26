plugins {
    id("com.android.application")
    id("kotlin-android")
}

group = "imgui.example.basic.android"

android {
    namespace = "imgui.basic"
    compileSdk = 34

    defaultConfig {
        applicationId = "imgui.basic"
        minSdk = 29
        versionCode = 1
        versionName = "1.0"
    }

    sourceSets {
        named("main") {
            assets.srcDirs(project.file("../../../assets"))
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.toVersion(LibExt.javaModernTarget)
        targetCompatibility = JavaVersion.toVersion(LibExt.javaModernTarget)
    }
    kotlinOptions {
        jvmTarget = LibExt.javaModernTarget
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.0.3")

    configurations.configureEach {
        exclude(module = "imgui-core")
    }

    if(LibExt.useRepoLibs) {
        implementation("com.github.xpenatan.xImGui:imgui-android:-SNAPSHOT")
    }
    else {
        implementation(project(":imgui:imgui-android"))
    }

    implementation(project(":examples:basic:base"))
    implementation(project(":examples:basic:core"))
    implementation(project(":backends:fdx:fdx-gl-impl"))
    implementation("io.github.libfdx:backend_android:${LibExt.libFdxVersion}")
    implementation("io.github.libfdx:fdx_android:${LibExt.libFdxVersion}")
}
