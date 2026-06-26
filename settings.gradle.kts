// Core
include(":imgui:imgui-build")
include(":imgui:imgui-base")
include(":imgui:imgui-core")
include(":imgui:imgui-jni")
include(":imgui:imgui-ffm")
include(":imgui:imgui-web")
include(":imgui:imgui-android")

// Backend implementations
include(":backends:fdx:fdx-shared-impl")
include(":backends:fdx:fdx-gl-impl")
include(":backends:fdx:fdx-wgpu-impl")
include(":backends:fdx:fdx-vulkan-impl")

// Examples
include(":examples:basic:base")
include(":examples:basic:core")
include(":examples:basic:platform:desktop-gl-jni")
include(":examples:basic:platform:desktop-gl-ffm")
include(":examples:basic:platform:desktop-wgpu-jni")
include(":examples:basic:platform:desktop-wgpu-ffm")
include(":examples:basic:platform:web-gl")
include(":examples:basic:platform:web-wgpu")
include(":examples:basic:platform:android")
include(":examples:imlayout:core")
include(":examples:imlayout:platform:desktop")
include(":examples:imlayout:platform:teavm")
include(":examples:ImGuiColorTextEdit:core")
include(":examples:ImGuiColorTextEdit:platform:desktop")
include(":examples:ImGuiColorTextEdit:platform:teavm")
include(":examples:imgui-node-editor:core")
include(":examples:imgui-node-editor:platform:desktop")
include(":examples:imgui-node-editor:platform:teavm")

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

//includeBuild("E:\\Dev\\Projects\\java\\jParser") {
//    dependencySubstitution {
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
//        substitute(module("com.github.xpenatan.jParser:runtime-base")).using(project(":jParser:runtime:runtime-base"))
//        substitute(module("com.github.xpenatan.jParser:runtime-core")).using(project(":jParser:runtime:runtime-core"))
//        substitute(module("com.github.xpenatan.jParser:runtime-web")).using(project(":jParser:runtime:runtime-web"))
//        substitute(module("com.github.xpenatan.jParser:runtime-jni")).using(project(":jParser:runtime:runtime-jni"))
//        substitute(module("com.github.xpenatan.jParser:runtime-ffm")).using(project(":jParser:runtime:runtime-ffm"))
////        substitute(module("com.github.xpenatan.jParser:runtime-android")).using(project(":jParser:runtime:runtime-android"))
//    }
//}
