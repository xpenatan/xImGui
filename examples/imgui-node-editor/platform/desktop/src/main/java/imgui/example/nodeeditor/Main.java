package imgui.example.nodeeditor;

import io.github.libfdx.backend.desktop.DesktopApplicationBackend;
import io.github.libfdx.backend.desktop.DesktopApplicationConfig;
import io.github.libfdx.backend.desktop.DesktopOpenGLProvider;
import io.github.libfdx.imgui.gl.FdxImGuiGl;

public class Main {
    public static void main(String[] args) {
        DesktopApplicationConfig config = new DesktopApplicationConfig()
                .size(1444, 800)
                .title("imgui-node-editor FDX GL Example")
                .vSync(true)
                .graphics(new DesktopOpenGLProvider());
        new DesktopApplicationBackend().start(config, new ImGuiGame(FdxImGuiGl.renderer()));
    }
}
