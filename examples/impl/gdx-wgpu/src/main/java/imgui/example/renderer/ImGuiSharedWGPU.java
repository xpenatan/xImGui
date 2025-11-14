package imgui.example.renderer;

import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.monstrous.gdx.webgpu.graphics.WgTexture;
import com.monstrous.gdx.webgpu.graphics.utils.WgScreenUtils;
import imgui.ImGuiImpl;
import imgui.ImTemp;
import imgui.ImTextureRef;
import imgui.gdx.ImGuiGdxInputMultiplexer;
import imgui.gdx.ImGuiGdxWGPUImpl;

public class ImGuiSharedWGPU implements ImGuiShared.ImGuiSharedInstance {
    @Override
    public void clearScreen(float r, float g, float b, float a) {
        WgScreenUtils.clear(r, g, b, a, true);
    }

    @Override
    public ImGuiImpl createImpl() {
        return new ImGuiGdxWGPUImpl();
    }

    @Override
    public InputMultiplexer createInput() {
        return new ImGuiGdxInputMultiplexer();
    }

    @Override
    public Texture createTexture(FileHandle fileHandler) {
        return new WgTexture(fileHandler);
    }

    @Override
    public Texture createTexture(Pixmap pixmap) {
        return new WgTexture(pixmap);
    }

    @Override
    public ImTextureRef getTextureRef(Texture texture) {
        WgTexture tex = (WgTexture)texture;
        long l = tex.getTextureView().native_getAddressLong();
        return ImTemp.ImTextureRef_1(l);
    }
}
