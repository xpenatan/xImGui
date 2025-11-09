package imgui.example.renderer;

import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Texture;
import imgui.ImGuiImpl;
import imgui.ImTextureRef;

public final class ImGuiShared {

    public static ImGuiSharedInstance instance;

    public interface ImGuiSharedInstance {
        void clearScreen(float red, float green, float blue, float alpha);
        ImGuiImpl createImpl();
        InputMultiplexer createInput();
        Texture createTexture(FileHandle fileHandler);
        ImTextureRef getTextureRef(Texture texture);
    }
}