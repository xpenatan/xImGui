package imgui.example.basic.renderer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import imgui.ImGui;
import imgui.ImTemp;
import imgui.example.renderer.ImGuiShared;

public class ImageRenderer implements UIRenderer {

    private Texture texture;

    public ImageRenderer() {
        texture = ImGuiShared.instance.createTexture(Gdx.files.internal("data/badlogicsmall.jpg"));
    }

    @Override
    public void render() {
        ImGui.Image(texture.getTextureObjectHandle(), ImTemp.ImVec2_1(64, 64));
    }

    @Override
    public String getName() {
        return "Image";
    }
}
