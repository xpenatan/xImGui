package imgui.example.renderer;

public abstract class ImGuiRenderer {
    public void show() {
    }

    public final void render() {
        ImGuiShared.clearScreen(0.3f, 0.3f, 0.3f, 1.0f);
        ImGuiShared.imgui().beginFrame();
        renderImGui();
        ImGuiShared.imgui().render();
    }

    public abstract void renderImGui();

    public void resize(int width, int height) {
    }

    public void pause() {
    }

    public void resume() {
    }

    public void dispose() {
    }
}
