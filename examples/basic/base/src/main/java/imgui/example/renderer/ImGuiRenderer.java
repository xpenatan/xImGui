package imgui.example.renderer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.files.FileHandle;
import imgui.ImFontAtlas;
import imgui.ImGuiImpl;
import imgui.ImDrawData;
import imgui.ImGui;
import imgui.enums.ImGuiConfigFlags;
import imgui.ImGuiIO;

public abstract class ImGuiRenderer extends ScreenAdapter {

    private ImGuiImpl impl;

    protected InputMultiplexer input;

    @Override
    public void show() {
        ImGui.CreateContext();
        ImGuiIO io = ImGui.GetIO();
        io.set_ConfigFlags(ImGuiConfigFlags.DockingEnable);
        input = ImGuiShared.instance.createInput();
        impl = ImGuiShared.instance.createImpl();

        Gdx.input.setInputProcessor(input);

        ImFontAtlas fonts = ImGui.GetIO().get_Fonts();
        FileHandle fontFile01 = Gdx.files.internal("fonts/Cousine-Regular.ttf");
        FileHandle fontFile02 = Gdx.files.internal("fonts/DroidSans.ttf");

        // TODO impl custom font
//        fonts.AddFontFromMemoryTTF(fontFile01.readBytes(), 16).setName(fontFile01.name());
//        fonts.AddFontFromMemoryTTF(fontFile02.readBytes(), 20).setName(fontFile02.name());
    }

    @Override
    public void render(float delta) {
        ImGuiShared.instance.clearScreen(0.3f, 0.3f, 0.3f, 1);

        impl.newFrame();

        renderImGui();

        ImGui.Render();
        ImDrawData drawData = ImGui.GetDrawData();
        impl.render(drawData);
    }

    public abstract void renderImGui();

    @Override
    public void resize(int width, int height) {
    }

    @Override
    public void pause() {
    }

    @Override
    public void resume() {
    }

    @Override
    public void hide() {
        impl.dispose();
        ImGui.DestroyContext();
    }
}