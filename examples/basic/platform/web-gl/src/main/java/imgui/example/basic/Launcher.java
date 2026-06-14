package imgui.example.basic;

import io.github.libfdx.backend.web.WebApplicationBackend;
import io.github.libfdx.backend.web.WebApplicationConfig;
import io.github.libfdx.graphics.gl.web.WebGLProvider;
import io.github.libfdx.imgui.gl.FdxImGuiGl;

public class Launcher {

    public static void main(String[] args) {
        WebApplicationConfig config = new WebApplicationConfig()
                .canvasId("canvas")
                .title("ImGui WebGL Basic Example")
                .size(0, 0)
                .graphics(new WebGLProvider());
        new WebApplicationBackend().start(config, new ImGuiGame(FdxImGuiGl.renderer()));
    }
}
