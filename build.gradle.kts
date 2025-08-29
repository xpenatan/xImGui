plugins {
    id("java")
    id("maven-publish")
    id("signing")
    id("org.jetbrains.kotlin.android") version "1.8.21" apply false
}

buildscript {
    repositories {
        mavenCentral()
        google()
    }

    dependencies {
        classpath("com.android.tools.build:gradle:8.3.2")
    }
}

allprojects  {

    repositories {
        mavenLocal()
        google()
        mavenCentral()
        maven { url = uri("https://central.sonatype.com/repository/maven-snapshots/") }
        maven { url = uri("https://jitpack.io") }
    }

    configurations.configureEach {
        // Check for updates every sync
        resolutionStrategy.cacheChangingModulesFor(0, "seconds")
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

tasks.register("build_all_projects") {
    group = "imgui"
    description = "build all sources"

    val imguiSrc = ":imgui:imgui-build:build_project_all"
    val source2 = ":extensions:ImGuiColorTextEdit:textedit-build:build_project_all"
    val source3 = ":extensions:imgui-node-editor:nodeeditor-build:build_project_all"
    val source4 = ":extensions:imlayout:imlayout-build:build_project_all"
    val extSrc = ":imgui-ext:ext-build:build_project_all"

    val list = listOf(imguiSrc, source2, source3, source4, extSrc)
    dependsOn(list)

    tasks.findByPath(source2)!!.mustRunAfter(imguiSrc)
    tasks.findByPath(source3)!!.mustRunAfter(source2)
    tasks.findByPath(source4)!!.mustRunAfter(source3)
    tasks.findByPath(extSrc)!!.mustRunAfter(imguiSrc, source2, source3, source4)
}

apply(plugin = "publish")
