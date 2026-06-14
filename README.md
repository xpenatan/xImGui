# xImGui

![Build](https://github.com/xpenatan/xImGui/actions/workflows/snapshot.yml/badge.svg)

[![Maven Central Version](https://img.shields.io/maven-central/v/com.github.xpenatan.xImGui/imgui-core)](https://central.sonatype.com/namespace/com.github.xpenatan.xImGui)
[![Static Badge](https://img.shields.io/badge/snapshot---SNAPSHOT-red)](https://central.sonatype.com/service/rest/repository/browse/maven-snapshots/com/github/xpenatan/xImGui/)

xImGui is a java binding for C++ [dear-imgui](https://github.com/ocornut/imgui). <br>
It uses webidl file to generate java methods with the help of [jParser](https://github.com/xpenatan/jParser). <br>
It's meant to be small and 1-1 to C++. ImGui::Begin() is ImGui.Begin() and so on.

<p align="center"><img src="https://i.imgur.com/rXk4Aq0.gif"/></p>

## Supported extensions:
[imgui-node-editor](https://github.com/thedmd/imgui-node-editor) <br>
[ImGuiColorTextEdit](https://github.com/santaclose/ImGuiColorTextEdit/) <br>
[ImLayout](https://github.com/xpenatan/xImGui/tree/master/extensions/imlayout) <br>

### ImGui current state:

| Emscripten | Windows | Linux | Mac | Android | iOS |
|:----------:|:-------:|:-----:|:---:|:-------:|:---:|
|     ✅      | ✅ | ✅ |  ✅  | ⚠️ | ❌ |

* ✅: Have a working build.
* ⚠️: Have a working build, but it's not ready yet.
* ❌: Build not ready.

Note: 
```
* Only snapshot builds are currently available. 
* There are 2 ImGui builds. The first contains ImGui only. The second (Ext) contains ImGui with extensions. 
```

## Setup

    xImGuiVersion = "-SNAPSHOT"

```groovy
// Add repository to Root gradle
repositories {
    mavenLocal()
    mavenCentral()
    maven { url "https://oss.sonatype.org/content/repositories/snapshots/" }
    maven { url "https://oss.sonatype.org/content/repositories/releases/" }
}
```

### Core module
```groovy
dependencies {
    implementation("com.github.xpenatan.xImGui:imgui-core:$project.xImGuiVersion")
    implementation("com.github.xpenatan.xImGui:fdx-shared-impl:$project.xImGuiVersion")
    implementation("com.github.xpenatan.xImGui:fdx-gl-impl:$project.xImGuiVersion")     // OpenGL
    implementation("com.github.xpenatan.xImGui:fdx-wgpu-impl:$project.xImGuiVersion")   // WebGPU
    implementation("com.github.xpenatan.xImGui:fdx-vulkan-impl:$project.xImGuiVersion") // Vulkan

    // Extensions
    implementation "com.github.xpenatan.xImGui:imlayout-core:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:textedit-core:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:nodeeditor-core:$project.xImGuiVersion"
}
```

### Desktop module
```groovy
dependencies {
    implementation("com.github.xpenatan.xImGui:imgui-jni:$project.xImGuiVersion")
    implementation("com.github.xpenatan.xImGui:imgui-ffm:$project.xImGuiVersion")

    // Extensions
    implementation "com.github.xpenatan.xImGui:imlayout-jni:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:imlayout-ffm:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:textedit-jni:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:textedit-ffm:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:nodeeditor-jni:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:nodeeditor-ffm:$project.xImGuiVersion"
}
```

### TeaVM module
```groovy
dependencies {
    implementation("com.github.xpenatan.xImGui:imgui-web:$project.xImGuiVersion")

    // Extensions
    implementation "com.github.xpenatan.xImGui:imlayout-web:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:textedit-web:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:nodeeditor-web:$project.xImGuiVersion"
}
```

## Build source

* Requirements: Java 11, mingw64 and emscripten
* Windows only for now.
