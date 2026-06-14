package imgui.example.basic;

import io.github.libfdx.backend.desktop.DesktopApplicationBackend;
import io.github.libfdx.backend.desktop.DesktopApplicationConfig;
import io.github.libfdx.graphics.wgpu.WGPUProvider;
import io.github.libfdx.imgui.wgpu.FdxImGuiWgpu;

public class Main {
    public static void main(String[] args) {
        DesktopApplicationConfig config = new DesktopApplicationConfig()
                .size(1444, 800)
                .title("ImGui WGPU FFM Basic Example")
                .vSync(false)
                .graphics(new WGPUProvider().vSync(false));
        new DesktopApplicationBackend().start(config, new ImGuiGame(FdxImGuiWgpu.renderer()));
    }
}
