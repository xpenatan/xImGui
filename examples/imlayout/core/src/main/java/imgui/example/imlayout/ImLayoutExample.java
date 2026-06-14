package imgui.example.imlayout;

import imgui.example.renderer.ImGuiRenderer;
import imgui.ImGui;
import imgui.ImVec2;

public class ImLayoutExample extends ImGuiRenderer {
    private boolean init = false;

    private ImLayoutView view;

    @Override
    public void show() {
        super.show();

        view = new ImLayoutView();
        view.init();
    }

    @Override
    public void renderImGui() {
        if(init == false) {
            init = true;
            ImGui.SetNextWindowSize(new ImVec2(400, 400));
        }

        ImGui.Begin("ImLayout Example");
        view.renderTabImGuiExtViews();
        ImGui.End();

        ImGui.ShowDemoWindow();
    }

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
    public void dispose() {
        view.dispose();
        super.dispose();
    }
}
