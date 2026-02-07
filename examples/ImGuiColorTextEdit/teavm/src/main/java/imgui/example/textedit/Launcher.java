package imgui.example.textedit;

import com.github.xpenatan.gdx.teavm.backends.web.WebApplication;
import com.github.xpenatan.gdx.teavm.backends.web.WebApplicationConfiguration;
import imgui.example.renderer.ImGuiShared;
import imgui.example.renderer.ImGuiSharedGdx;

public class Launcher {

    public static void main(String[] args) {
        WebApplicationConfiguration config = new WebApplicationConfiguration("canvas");
        config.useDebugGL = false;
        config.width = 0;
        config.height = 0;
//        config.useGL30 = false;
//        config.useGLArrayBuffer = true;
        ImGuiShared.instance = new ImGuiSharedGdx();
        new WebApplication(new ImGuiGame(), config);
    }
}
