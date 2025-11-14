package imgui.example.basic.renderer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import imgui.ImGui;
import imgui.ImTemp;
import imgui.ImTextureRef;
import imgui.example.renderer.ImGuiShared;

public class ImageRenderer implements UIRenderer {

    private Texture texture;
    private Texture redColor;

    public ImageRenderer() {
        texture = ImGuiShared.instance.createTexture(Gdx.files.internal("data/badlogicsmall.jpg"));
        Pixmap pm = new Pixmap(100, 100, Pixmap.Format.RGBA8888);
        pm.setColor(1.0f, 0.5f, 0.5f, 1.0f);
        pm.fill();
        pm.setColor(0.5f, 1.0f, 0.5f, 1.0f);
        pm.fillCircle(50, 50, 40);
        redColor = ImGuiShared.instance.createTexture(pm);
        pm.dispose();
    }

    @Override
    public void render() {
        ImTextureRef textureRef = ImGuiShared.instance.getTextureRef(texture);
        ImGui.Image(textureRef, ImTemp.ImVec2_1(64, 64));
        ImGui.Image(ImGuiShared.instance.getTextureRef(redColor), ImTemp.ImVec2_1(redColor.getWidth(), redColor.getHeight()));
    }

    @Override
    public String getName() {
        return "Image";
    }
}
