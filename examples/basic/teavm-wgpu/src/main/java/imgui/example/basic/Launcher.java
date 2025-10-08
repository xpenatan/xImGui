package imgui.example.basic;

import com.github.xpenatan.gdx.backends.teavm.TeaApplicationConfiguration;
import com.monstrous.gdx.webgpu.backends.teavm.WgTeaApplication;
import imgui.example.renderer.ImGuiShared;
import imgui.example.renderer.ImGuiSharedWGPU;

public class Launcher {

    public static void main(String[] args) {
        ImGuiShared.instance = new ImGuiSharedWGPU();

        TeaApplicationConfiguration config = new TeaApplicationConfiguration();
        config.width = 0;
        config.height = 0;
        config.usePhysicalPixels = true;
        new WgTeaApplication(new ImGuiGame(), config);
    }
}