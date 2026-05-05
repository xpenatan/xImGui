package imgui.example.basic;

import com.badlogic.gdx.backends.lwjgl3.Lwjgl3Application;
import com.badlogic.gdx.backends.lwjgl3.Lwjgl3ApplicationConfiguration;
import imgui.example.renderer.ImGuiShared;
import imgui.example.renderer.ImGuiSharedGdx;

public class Main {
    public static void main(String[] args) {
        Lwjgl3ApplicationConfiguration config = new Lwjgl3ApplicationConfiguration();
        config.setWindowedMode(1444, 800);
        config.setTitle("ImGui GL FFM Basic Example");
        config.useVsync(false);
        config.setOpenGLEmulation(Lwjgl3ApplicationConfiguration.GLEmulation.GL30, 3, 2);

        ImGuiShared.instance = new ImGuiSharedGdx();
        new Lwjgl3Application(new ImGuiGame(), config);
    }
}