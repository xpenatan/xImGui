package imgui.example.renderer;

import com.badlogic.gdx.InputMultiplexer;
import com.monstrous.gdx.webgpu.graphics.utils.WgScreenUtils;
import imgui.ImGuiImpl;
import imgui.gdx.ImGuiGdxInputMultiplexer;
import imgui.gdx.ImGuiGdxWebGPUImpl;

public class ImGuiSharedWGPU implements ImGuiShared.ImGuiSharedInstance {
    @Override
    public void clearScreen(float r, float g, float b, float a) {
        WgScreenUtils.clear(r, g, b, a, true);
    }

    @Override
    public ImGuiImpl createImpl() {
        return new ImGuiGdxWebGPUImpl();
    }

    @Override
    public InputMultiplexer createInput() {
        return new ImGuiGdxInputMultiplexer();
    }
}
