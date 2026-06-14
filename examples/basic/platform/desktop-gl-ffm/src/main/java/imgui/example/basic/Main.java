package imgui.example.basic;

import io.github.libfdx.backend.desktop.DesktopApplicationBackend;
import io.github.libfdx.backend.desktop.DesktopApplicationConfig;
import io.github.libfdx.backend.desktop.DesktopOpenGLProvider;
import io.github.libfdx.imgui.gl.FdxImGuiGl;

public class Main {
    public static void main(String[] args) {
        DesktopApplicationConfig config = new DesktopApplicationConfig()
                .size(1444, 800)
                .title("ImGui GL FFM Basic Example")
                .vSync(false)
                .graphics(new DesktopOpenGLProvider());
        new DesktopApplicationBackend().start(config, new ImGuiGame(FdxImGuiGl.renderer()));
    }
}
