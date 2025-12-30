package imgui.example.imlayout.launcher;

import com.github.xpenatan.gdx.backends.teavm.TeaApplication;
import com.github.xpenatan.gdx.backends.teavm.TeaApplicationConfiguration;
import imgui.example.imlayout.ImGuiGame;
import imgui.example.renderer.ImGuiShared;
import imgui.example.renderer.ImGuiSharedGdx;

public class Launcher {

    public static void main(String[] args) {
        TeaApplicationConfiguration config = new TeaApplicationConfiguration("canvas");
        config.useDebugGL = false;
        config.width = 0;
        config.height = 0;
        config.showDownloadLogs = true;
//        config.useGL30 = false;
//        config.useGLArrayBuffer = true;
        ImGuiShared.instance = new ImGuiSharedGdx();
        new TeaApplication(new ImGuiGame(), config);
    }
}
