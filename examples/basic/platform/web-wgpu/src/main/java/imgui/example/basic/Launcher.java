package imgui.example.basic;

import io.github.libfdx.backend.web.WebApplicationBackend;
import io.github.libfdx.backend.web.WebApplicationConfig;
import io.github.libfdx.graphics.wgpu.WebWGPUProvider;
import io.github.libfdx.imgui.wgpu.FdxImGuiWgpu;

public class Launcher {

    public static void main(String[] args) {
        WebApplicationConfig config = new WebApplicationConfig()
                .canvasId("canvas")
                .title("ImGui WebGPU Basic Example")
                .size(0, 0)
                .graphics(new WebWGPUProvider());
        new WebApplicationBackend().start(config, new ImGuiGame(FdxImGuiWgpu.renderer()));
    }
}
