package imgui.example.basic;

import io.github.libfdx.backend.web.WebBuilder;

import java.nio.file.Path;

public class Build {

    public static void main(String[] args) {
        WebBuilder.wasm()
                .classpathFromCurrentJvm()
                .webappDirectory(Path.of("build/dist"))
                .cacheDirectory(Path.of("build/teavm-cache"))
                .asset(Path.of("../../../assets"))
                .mainClass(Launcher.class.getName())
                .title("ImGui WebGPU Basic Example")
                .fillWindow()
                .obfuscated(true)
                .build();
    }
}
