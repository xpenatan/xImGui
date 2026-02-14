# xImGui

![Build](https://github.com/xpenatan/xImGui/actions/workflows/snapshot.yml/badge.svg)

[![Maven Central Version](https://img.shields.io/maven-central/v/com.github.xpenatan.xImGui/imgui-core)](https://central.sonatype.com/search?namespace=com.github.xpenatan.xImGui)
[![Static Badge](https://img.shields.io/badge/snapshot---SNAPSHOT-red)](https://central.sonatype.com/service/rest/repository/browse/maven-snapshots/com/github/xpenatan/xImGui/)

xImGui is a java binding for C++ [dear-imgui](https://github.com/ocornut/imgui). <br>
It uses webidl file to generate java methods with the help of [jParser](https://github.com/xpenatan/jParser). <br>
It's meant to be small and 1-1 to C++. ImGui::Begin() is ImGui.Begin() and so on.

<p align="center"><img src="https://i.imgur.com/rXk4Aq0.gif"/></p>

## Supported extensions:
[imgui-node-editor](https://github.com/thedmd/imgui-node-editor) <br>
[ImGuiColorTextEdit](https://github.com/santaclose/ImGuiColorTextEdit/) <br>
[ImLayout](https://github.com/xpenatan/xImGui/tree/master/extensions/imlayout) <br>

## Examples
| Examples |                                                      WebGPU                                                       |                                                    WebGL                                                     
|:--------:|:-----------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------:|
|  Basic   | [JS](https://xpenatan.github.io/xImGui/wgpu/basic/js) / [WASM](https://xpenatan.github.io/xImGui/wgpu/basic/wasm) | [JS](https://xpenatan.github.io/xImGui/gl/basic/js) / [WASM](https://xpenatan.github.io/xImGui/gl/basic/wasm) | 

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
* It's best to try the examples first to see how it works before adding to your project.
* There are 2 ImGui builds. The first contains ImGui only. The second (Ext) contains ImGui with extensions. 
```

## How to run examples
There are two ways to run examples. 
* Build the source and run:
```./gradlew :examples:basic:desktop:basic-run-desktop```
* Change LibExt.exampleUseRepoLibs to true in Dependencies.kt and that will make all examples use snapshot from repository

## Setup

    gdxVersion = "1.13.5"
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
    implementation("com.github.xpenatan.xImGui:gdx-gl-impl:$project.xImGuiVersion")   // OpenGL
    implementation("com.github.xpenatan.xImGui:gdx-wgpu-impl:$project.xImGuiVersion") // WebGPU
    implementation("com.github.xpenatan.xImGui:imgui-core:$project.xImGuiVersion")

    // Extensions
    implementation "com.github.xpenatan.xImGui:imlayout-core:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:textedit-core:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:nodeeditor-core:$project.xImGuiVersion"
}
```

### Desktop module
```groovy
dependencies {
    implementation("com.github.xpenatan.xImGui:imgui-desktop:$project.xImGuiVersion")

    // Extensions
    implementation "com.github.xpenatan.xImGui:imlayout-desktop:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:textedit-desktop:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:nodeeditor-desktop:$project.xImGuiVersion"
}
```

### TeaVM module
```groovy
dependencies {
    implementation("com.github.xpenatan.xImGui:imgui-teavm:$project.xImGuiVersion")

    // Extensions
    implementation "com.github.xpenatan.xImGui:imlayout-teavm:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:textedit-teavm:$project.xImGuiVersion"
    implementation "com.github.xpenatan.xImGui:nodeeditor-teavm:$project.xImGuiVersion"
}
```

## Build source

* Requirements: Java 11, mingw64 and emscripten
* Windows only for now.