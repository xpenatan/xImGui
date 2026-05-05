// Core
include(":imgui:imgui-build")
include(":imgui:imgui-base")
include(":imgui:imgui-core")
include(":imgui:imgui-jni")
include(":imgui:imgui-ffm")
include(":imgui:imgui-web")
include(":imgui:imgui-android")

// Implementation
include(":gdx:gdx-shared-impl")
include(":gdx:gdx-gl-impl")
include(":gdx:gdx-wgpu-impl")
//include(":gdx:lwjgl3-impl")

// Extension ImLayout
include(":extensions:imlayout:imlayout-build")
include(":extensions:imlayout:imlayout-base")
include(":extensions:imlayout:imlayout-core")
include(":extensions:imlayout:imlayout-jni")
include(":extensions:imlayout:imlayout-ffm")
include(":extensions:imlayout:imlayout-web")

// Extension ImGuiColorTextEdit
include(":extensions:ImGuiColorTextEdit:textedit-build")
include(":extensions:ImGuiColorTextEdit:textedit-base")
include(":extensions:ImGuiColorTextEdit:textedit-core")
include(":extensions:ImGuiColorTextEdit:textedit-jni")
include(":extensions:ImGuiColorTextEdit:textedit-ffm")
include(":extensions:ImGuiColorTextEdit:textedit-web")

// Extension imgui-node-editor
include(":extensions:imgui-node-editor:nodeeditor-build")
include(":extensions:imgui-node-editor:nodeeditor-base")
include(":extensions:imgui-node-editor:nodeeditor-core")
include(":extensions:imgui-node-editor:nodeeditor-jni")
include(":extensions:imgui-node-editor:nodeeditor-ffm")
include(":extensions:imgui-node-editor:nodeeditor-web")

// Examples
include(":examples:impl:gdx")
include(":examples:impl:gdx-wgpu")

include(":examples:basic:base")
include(":examples:basic:core")
include(":examples:basic:desktop-gl-jni")
include(":examples:basic:desktop-gl-ffm")
include(":examples:basic:desktop-wgpu-jni")
include(":examples:basic:desktop-wgpu-ffm")
include(":examples:basic:web-gl")
include(":examples:basic:web-wgpu")
include(":examples:basic:android")

include(":examples:imlayout:core")
include(":examples:imlayout:desktop")
include(":examples:imlayout:teavm")

include(":examples:ImGuiColorTextEdit:core")
include(":examples:ImGuiColorTextEdit:desktop")
include(":examples:ImGuiColorTextEdit:teavm")

include(":examples:imgui-node-editor:core")
include(":examples:imgui-node-editor:desktop")
include(":examples:imgui-node-editor:teavm")

//include ":examples:gdx-tests:core"
//include ":examples:gdx-tests:desktop"
//includeBuild('D:\\Dev\\Projects\\java\\libgdx') {
//}

//includeBuild("E:\\Dev\\Projects\\java\\gdx-teavm") {
//    dependencySubstitution {
//        substitute(module("com.github.xpenatan.gdx-teavm:backend-web")).using(project(":backends:backend-web"))
//        substitute(module("com.github.xpenatan.gdx-teavm:backend-shared")).using(project(":backends:backend-shared"))
//    }
//}

//includeBuild("E:\\Dev\\Projects\\java\\jParser") {
//    dependencySubstitution {
//        substitute(module("com.github.xpenatan.jParser:gen-base")).using(project(":jParser:gen:gen-base"))
//        substitute(module("com.github.xpenatan.jParser:gen-build")).using(project(":jParser:gen:gen-build"))
//        substitute(module("com.github.xpenatan.jParser:gen-build-tool")).using(project(":jParser:gen:gen-build-tool"))
//        substitute(module("com.github.xpenatan.jParser:gen-core")).using(project(":jParser:gen:gen-core"))
//        substitute(module("com.github.xpenatan.jParser:gen-jni")).using(project(":jParser:gen:gen-jni"))
//        substitute(module("com.github.xpenatan.jParser:gen-ffm")).using(project(":jParser:gen:gen-ffm"))
//        substitute(module("com.github.xpenatan.jParser:gen-idl")).using(project(":jParser:gen:gen-idl"))
//        substitute(module("com.github.xpenatan.jParser:gen-web")).using(project(":jParser:gen:gen-web"))
//        substitute(module("com.github.xpenatan.jParser:api-core")).using(project(":jParser:api:api-core"))
//        substitute(module("com.github.xpenatan.jParser:api-web")).using(project(":jParser:api:api-web"))
//        substitute(module("com.github.xpenatan.jParser:loader-core")).using(project(":jParser:loader:loader-core"))
//        substitute(module("com.github.xpenatan.jParser:loader-web")).using(project(":jParser:loader:loader-web"))
//        substitute(module("com.github.xpenatan.jParser:runtime-core")).using(project(":jParser:runtime:runtime-core"))
//        substitute(module("com.github.xpenatan.jParser:runtime-web")).using(project(":jParser:runtime:runtime-web"))
//        substitute(module("com.github.xpenatan.jParser:runtime-jni")).using(project(":jParser:runtime:runtime-jni"))
//        substitute(module("com.github.xpenatan.jParser:runtime-ffm")).using(project(":jParser:runtime:runtime-ffm"))
//        substitute(module("com.github.xpenatan.jParser:runtime-android")).using(project(":jParser:runtime:runtime-android"))
//    }
//}

//includeBuild("E:\\Dev\\Projects\\java\\gdx-webgpu") {
//    dependencySubstitution {
//        substitute(module("io.github.monstroussoftware.gdx-webgpu:gdx-webgpu")).using(project(":gdx-webgpu"))
//        substitute(module("io.github.monstroussoftware.gdx-webgpu:backend-desktop")).using(project(":backends:backend-desktop"))
//        substitute(module("io.github.monstroussoftware.gdx-webgpu:backend-teavm")).using(project(":backends:backend-teavm"))
//    }
//}
