package imgui.example.basic;

import com.github.xpenatan.webgpu.JWebGPUBackend;
import com.monstrous.gdx.webgpu.backends.desktop.WgDesktopApplication;
import com.monstrous.gdx.webgpu.backends.desktop.WgDesktopApplicationConfiguration;
import imgui.example.renderer.ImGuiShared;
import imgui.example.renderer.ImGuiSharedWGPU;

public class Main {
    public static void main(String[] args) {
        ImGuiShared.instance = new ImGuiSharedWGPU();

        WgDesktopApplicationConfiguration config = new WgDesktopApplicationConfiguration();
        config.setWindowedMode(640, 480);
        config.setTitle("WGPU ImGui Basic Example");
        config.enableGPUtiming = false;
        config.useVsync(false);
        config.backendWebGPU = JWebGPUBackend.WGPU;
        new WgDesktopApplication(new ImGuiGame(), config);
    }
}
