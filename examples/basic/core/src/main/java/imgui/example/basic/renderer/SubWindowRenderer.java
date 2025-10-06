package imgui.example.basic.renderer;

import imgui.ImGui;
import imgui.ImGuiDockNodeFlags;
import imgui.ImGuiStyleVar;
import imgui.ImGuiViewport;
import imgui.ImGuiWindowClass;
import imgui.ImGuiWindowFlags;
import imgui.ImTemp;
import imgui.ImVec2;

public class SubWindowRenderer implements UIRenderer {

    private ImGuiWindowClass rootWindowClass;
    private ImGuiWindowClass windowClass1;
    private ImGuiWindowClass windowClass2;

    public SubWindowRenderer() {
    }

    @Override
    public void render() {
        if(rootWindowClass == null) {
            rootWindowClass = new ImGuiWindowClass();
            windowClass1 = new ImGuiWindowClass();
            windowClass2 = new ImGuiWindowClass();
        }

        ImGuiWindowClass TopLevelEditorWindowClass = rootWindowClass;
        TopLevelEditorWindowClass.set_ClassId(1111);
        TopLevelEditorWindowClass.set_DockingAllowUnclassed(false);

        ImGuiWindowClass ToolWindowsClass01 = windowClass1;
        ToolWindowsClass01.set_DockingAllowUnclassed(false);
        ToolWindowsClass01.set_DockingAlwaysTabBar(false);
        ToolWindowsClass01.set_ClassId(22221);

        ImGuiWindowClass ToolWindowsClass02 = windowClass2;
        ToolWindowsClass02.set_DockingAllowUnclassed(false);
        ToolWindowsClass02.set_DockingAlwaysTabBar(false);
        ToolWindowsClass02.set_ClassId(3333);

        ImGuiViewport viewport = ImGui.GetMainViewport();
        ImGui.SetNextWindowPos(viewport.get_Pos());
        ImGui.SetNextWindowSize(viewport.get_Size());

        ImGuiWindowFlags flags;
        flags = ImGuiWindowFlags.NoDocking.or(ImGuiWindowFlags.NoCollapse).or(ImGuiWindowFlags.NoResize).or(ImGuiWindowFlags.NoMove);
        flags = flags.or(ImGuiWindowFlags.NoBringToFrontOnFocus).or(ImGuiWindowFlags.NoNavFocus);

        ImGui.PushStyleVar(ImGuiStyleVar.WindowPadding, ImTemp.ImVec2_1(0.0f, 0.0f));
        ImGui.Begin("No document###DocumentRoot", null, flags);
        ImGui.PopStyleVar();
        int root_dockspace_id = 99999;
        ImGui.DockSpace(root_dockspace_id, ImTemp.ImVec2_1(0, 0), null, TopLevelEditorWindowClass);
        ImGui.End();

        ImGui.Begin("Dock 01");
        int dockspace_id01 = 11211;
        ImVec2 dockspace_size1 = ImGui.GetContentRegionAvail();
        ImGui.DockSpace(dockspace_id01, dockspace_size1, ImGuiDockNodeFlags.None, ToolWindowsClass01);
        ImGui.End();

        ImGui.Begin("Dock 02");
        int dockspace_id02 = 22222;
        ImVec2 dockspace_size2 = ImGui.GetContentRegionAvail();
        ImGui.DockSpace(dockspace_id02, dockspace_size2, null, ToolWindowsClass02);
        ImGui.End();

        ImGui.SetNextWindowClass(ToolWindowsClass01);
        ImGui.Begin("Tool 01");
        ImGui.End();

        ImGui.SetNextWindowClass(ToolWindowsClass01);
        ImGui.Begin("Game 01");
        ImGui.End();

        ImGui.SetNextWindowClass(ToolWindowsClass02);
        ImGui.Begin("Tool 02");
        ImGui.End();

        ImGui.SetNextWindowClass(ToolWindowsClass02);
        ImGui.Begin("Game 02");
        ImGui.End();
    }

    @Override
    public String getName() {
        return "SubWindow";
    }
}