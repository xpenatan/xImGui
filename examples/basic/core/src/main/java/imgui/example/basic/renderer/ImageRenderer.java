package imgui.example.basic.renderer;

import imgui.ImGui;
import imgui.ImTemp;
import imgui.ImTextureRef;
import imgui.example.renderer.ExampleTexture;
import imgui.example.renderer.ImGuiShared;

public class ImageRenderer implements UIRenderer {

    private ExampleTexture texture;
    private ExampleTexture circle;

    public ImageRenderer() {
        texture = ImGuiShared.createCheckerTexture("checker", 64, 64);
        circle = ImGuiShared.createCircleTexture("circle", 100, 100);
    }

    @Override
    public void render() {
        ImTextureRef textureRef = ImGuiShared.textureRef(texture);
        ImGui.Image(textureRef, ImTemp.ImVec2_1(64, 64));
        ImGui.Image(ImGuiShared.textureRef(circle), ImTemp.ImVec2_1(circle.width(), circle.height()));
    }

    @Override
    public String getName() {
        return "Image";
    }
}
