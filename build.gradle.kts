plugins {
    id("java")
    id("maven-publish")
    id("signing")
    id("org.jetbrains.kotlin.android") version "2.2.21" apply false
}

buildscript {
    repositories {
        mavenCentral()
        google()
    }

    val kotlinVersion = "2.1.10"

    dependencies {
        classpath("com.android.tools.build:gradle:8.12.3")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}

allprojects  {
    val jParserSnapshotModules = setOf(
        "api-core",
        "api-web",
        "gen-build",
        "gen-build-tool",
        "gen-c",
        "gen-core",
        "gen-ffm",
        "gen-idl",
        "gen-jni",
        "gen-web",
        "loader-core",
        "loader-web",
        "runtime-android",
        "runtime-base",
        "runtime-core",
        "runtime-ffm",
        "runtime-ffm_linux_x64",
        "runtime-ffm_mac_arm64",
        "runtime-ffm_mac_x64",
        "runtime-ffm_windows_x64",
        "runtime-jni",
        "runtime-jni_linux_x64",
        "runtime-jni_mac_arm64",
        "runtime-jni_mac_x64",
        "runtime-jni_windows_x64",
        "runtime-web",
        "runtime-web_wasm"
    )

    repositories {
        mavenLocal()
        google()
        mavenCentral()
        maven { url = uri("https://central.sonatype.com/repository/maven-snapshots/") }
        maven { url = uri("https://jitpack.io") }

        maven {
            url = uri("http://teavm.org/maven/repository/")
            isAllowInsecureProtocol = true
        }
    }

    configurations.configureEach {
        // Check for updates every sync
        resolutionStrategy.cacheChangingModulesFor(0, "seconds")
        resolutionStrategy.eachDependency {
            if(requested.group == "com.github.xpenatan.jParser" && requested.name in jParserSnapshotModules) {
                useVersion(LibExt.jParserVersion)
                because("xImGui targets the jParser snapshot TeaVM 0.15 service-based substitutions")
            }
        }
//        resolutionStrategy {
//            force("com.github.xpenatan.jWebGPU:webgpu-core:-SNAPSHOT")
//            force("com.github.xpenatan.jWebGPU:webgpu-jni:-SNAPSHOT")
//            force("com.github.xpenatan.jWebGPU:webgpu-ffm:-SNAPSHOT")
//            force("com.github.xpenatan.jWebGPU:webgpu-web:-SNAPSHOT")
//        }
    }
}

tasks.register("download_all_sources") {
    group = "imgui"
    description = "Download all sources"

    val source1 = ":imgui:imgui-build:download_source"
    val source2 = ":extensions:ImGuiColorTextEdit:textedit-build:download_source"
    val source3 = ":extensions:imgui-node-editor:nodeeditor-build:download_source"

    val list = listOf(source1, source2, source3)
    dependsOn(list)

    tasks.findByPath(source2)!!.mustRunAfter(source1)
    tasks.findByPath(source3)!!.mustRunAfter(source2)
}

apply(plugin = "publish")
