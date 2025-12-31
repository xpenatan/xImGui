package imgui.example.renderer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.files.FileHandle;
import com.github.xpenatan.jparser.idl.helper.IDLByteArray;
import imgui.ImFontAtlas;
import imgui.ImFontConfig;
import imgui.ImGuiContext;
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

        ImGuiContext imGuiContext = ImGui.GetCurrentContext();
        boolean b = imGuiContext.native_isNULL();
        ImGuiIO io = ImGui.GetIO();
        io.set_ConfigFlags(ImGuiConfigFlags.DockingEnable);
        input = ImGuiShared.instance.createInput();
        impl = ImGuiShared.instance.createImpl();

        Gdx.input.setInputProcessor(input);

        FileHandle fontFile01 = Gdx.files.internal("fonts/Cousine-Regular.ttf");
        FileHandle fontFile02 = Gdx.files.internal("fonts/DroidSans.ttf");
        addFont(fontFile01, fontFile01.name());
        addFont(fontFile02, fontFile02.name());
    }

    private void addFont(FileHandle fontFile, String name) {
        byte[] bytes = fontFile.readBytes();
        IDLByteArray byteArray = new IDLByteArray(bytes.length);
        for(int i = 0; i < bytes.length; i++) {
            byteArray.setValue(i, bytes[i]);
        }
        ImFontConfig fontConfig = new ImFontConfig();
        byte[] bytes1 = name.getBytes();
        for(int i = 0; i < bytes1.length; i++) {
            fontConfig.set_Name(i, bytes1[i]);
        }
        ImFontAtlas fonts = ImGui.GetIO().get_Fonts();
        // Cannot dispose byteArray as it is used by ImGui after this method
        // Font size is controlled by ImGui FontSizeBase
        fonts.AddFontFromMemoryTTF(byteArray, bytes.length, 0, fontConfig);
        fontConfig.dispose();
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