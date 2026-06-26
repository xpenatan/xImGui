package imgui.example.basic;

import com.github.xpenatan.jparser.runtime.helper.NativeBoolArray;
import com.github.xpenatan.jparser.runtime.helper.NativeInt;
import com.github.xpenatan.jparser.runtime.helper.NativeIntArray;
import imgui.ImGui;
import imgui.enums.ImGuiCol;
import imgui.enums.ImGuiCond;
import imgui.enums.ImGuiDir;
import imgui.ImGuiDockNode;
import imgui.enums.ImGuiDockNodeFlags;
import imgui.enums.ImGuiDockNodeFlagsPrivate_;
import imgui.ImGuiInternal;
import imgui.ImGuiStyle;
import imgui.enums.ImGuiStyleVar;
import imgui.enums.ImGuiTabBarFlags;
import imgui.ImGuiViewport;
import imgui.enums.ImGuiWindowFlags;
import imgui.ImTemp;
import imgui.ImVec2;
import imgui.ImVec4;
import imgui.example.basic.renderer.ColorRenderer;
import imgui.example.basic.renderer.DragAndDropRenderer;
import imgui.example.basic.renderer.EditTextRenderer;
import imgui.example.basic.renderer.ImageRenderer;
import imgui.example.basic.renderer.ModalRenderer;
import imgui.example.basic.renderer.PlotRenderer;
import imgui.example.basic.renderer.SelectListRenderer;
import imgui.example.basic.renderer.TableRenderer;
import imgui.example.basic.renderer.UIRenderer;
import imgui.example.renderer.ImGuiRenderer;

import java.util.ArrayList;
import java.util.List;

public class BasicExample extends ImGuiRenderer {

    private boolean init = false;

    private List<UIRenderer> renderers = new ArrayList<>();

    private StringBuilder stringBuilder = new StringBuilder();

    @Override
    public void show() {
        super.show();

        renderers.add(new PlotRenderer());
        renderers.add(new ImageRenderer());
        renderers.add(new TableRenderer());
        renderers.add(new EditTextRenderer());
        renderers.add(new SelectListRenderer());
        renderers.add(new ColorRenderer());
        renderers.add(new DragAndDropRenderer());
        renderers.add(new ModalRenderer());

        ImGuiStyle style = ImGui.GetStyle();

        ImVec4 headerColor = style.get_Colors(ImGuiCol.Header.getValue());
        System.out.println("Color before: R: " + headerColor.get_x() + " G: " + headerColor.get_y() + " B: " + headerColor.get_z() + " A: " + headerColor.get_w());
        style.set_Colors(ImGuiCol.Header.getValue(), ImTemp.ImVec4_1(0.3f, 0.3f, 0.3f, 1f));
    }

    @Override
    public void renderImGui() {
        boolean showDocking = true;

        if(showDocking) {
            renderDock();
        }
        else {
            ImGui.ShowDemoWindow();

            if(init == false) {
                init = true;
                ImGui.SetNextWindowSize(new ImVec2(400, 400), ImGuiCond.Once);
            }

            ImGui.Begin("Hello");
            renderItems();
            ImGui.End();
        }
    }
    private void renderItems() {

        double v = ImGui.GetTime();

        ImGui.Text("Time: " + v);

        if(ImGui.BeginTabBar("##Renderer", ImGuiTabBarFlags.FittingPolicyScroll.or(ImGuiTabBarFlags.Reorderable))) {
            for(UIRenderer renderer : renderers) {
                if(ImGui.BeginTabItem(renderer.getName())) {
                    renderer.render();
                    ImGui.EndTabItem();
                }
            }
            ImGui.EndTabBar();
        }
    }


    static boolean first = false;

    ImGuiDockNodeFlags dockspace_flags = ImGuiDockNodeFlags.PassthruCentralNode;
    int dockspace_id;

    NativeInt tmp01 = new NativeInt();

    private void renderDock() {

        ImGuiWindowFlags window_flags = ImGuiWindowFlags.MenuBar.or(ImGuiWindowFlags.NoDocking);

        window_flags = window_flags.or(ImGuiWindowFlags.NoTitleBar).or(ImGuiWindowFlags.NoCollapse).or(ImGuiWindowFlags.NoResize).or(ImGuiWindowFlags.NoMove);
        window_flags = window_flags.or(ImGuiWindowFlags.NoBringToFrontOnFocus).or(ImGuiWindowFlags.NoNavFocus);

        if ((dockspace_flags.and(ImGuiDockNodeFlags.PassthruCentralNode).getValue()) > 0)
            window_flags = window_flags.or(ImGuiWindowFlags.NoBackground);
        ImGuiViewport imGuiViewport = ImGui.GetMainViewport();

        ImGui.SetNextWindowPos(imGuiViewport.get_Pos());
        ImGui.SetNextWindowSize(imGuiViewport.get_Size());

        // Create docking space
        ImGui.PushStyleVar(ImGuiStyleVar.WindowPadding, ImTemp.ImVec2_1(0.0f, 0.0f));
        ImGui.Begin("DockSpace111", NativeBoolArray.NULL, window_flags);
        ImGui.PopStyleVar();

        dockspace_id = ImGui.GetID("MyDockSpace");
        if (!first) {
            // Dock all windows when app start
            first = true;
            resetLayout(0);
        }
        ImGui.DockSpace(dockspace_id, ImTemp.ImVec2_1(0f, 0f), dockspace_flags);

        ImGui.End();
        // End of docking space

        renderMenu();

        ImGui.ShowDemoWindow();

        ImGui.Begin("Game Window");
        ImGui.End();
        ImGui.Begin("Hierarchy");
        ImGui.End();
        ImGui.Begin("Assets");
        ImGui.End();

        if(ImGui.Begin("Inspector")) {
        }
        ImGui.End();

        if(ImGui.Begin("Game Editor")) {
            renderItems();
        }
        ImGui.End();
        ImGui.Begin("GUI Editor");
        ImGui.End();

    }

    private boolean resetLayout(int layout) {
        ImGuiViewport imGuiViewport = ImGui.GetMainViewport();

        ImGui.SetWindowFocus(null);
        ImGuiInternal.DockBuilderRemoveNode(dockspace_id); // clear any previous layout
        dockspace_id = ImGuiInternal.DockBuilderAddNode(dockspace_id, dockspace_flags.getCustom().setValue(
                dockspace_flags.getValue() | ImGuiDockNodeFlagsPrivate_.DockSpace.getValue()));
        ImGuiDockNode rootNode = ImGuiInternal.DockBuilderGetNode(dockspace_id);
        if(rootNode == null || rootNode.native_isNULL()) {
            return false;
        }
        ImGuiInternal.DockBuilderSetNodeSize(dockspace_id, imGuiViewport.get_Size());

        int centralID = 0;

        if(layout == 0 ) {
            int rightId = splitNode(dockspace_id, ImGuiDir.Right, 0.2f, tmp01);
            int leftId = tmp01.getValue();
            if(rightId == 0 || leftId == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            int bottomId = splitNode(leftId, ImGuiDir.Down, 0.3f, tmp01);
            int topId = tmp01.getValue();
            if(bottomId == 0 || topId == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }
            int topLeft = splitNode(topId, ImGuiDir.Left, 0.4f, tmp01);
            centralID = tmp01.getValue();
            if(topLeft == 0 || centralID == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            int rightTopId = splitNode(rightId, ImGuiDir.Up, 0.5f, tmp01);
            int rightBottomId = tmp01.getValue();
            if(rightTopId == 0 || rightBottomId == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            int bottomLeftId = splitNode(bottomId, ImGuiDir.Left, 0.4f, tmp01);
            int bottomRightId = tmp01.getValue();
            if(bottomLeftId == 0 || bottomRightId == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            // Plug in all layout ids to window title
            ImGuiInternal.DockBuilderDockWindow("Game Editor", centralID);
            ImGuiInternal.DockBuilderDockWindow("GUI Editor", centralID);
            ImGuiInternal.DockBuilderDockWindow("Game Window", topLeft);
            ImGuiInternal.DockBuilderDockWindow("Dear ImGui Demo", bottomRightId);
            ImGuiInternal.DockBuilderDockWindow("Hierarchy", rightTopId);
            ImGuiInternal.DockBuilderDockWindow("Inspector", rightBottomId);
            ImGuiInternal.DockBuilderDockWindow("Assets", bottomLeftId);
        }
        else {
            int rightId = splitNode(dockspace_id, ImGuiDir.Right, 0.2f, tmp01);

            int leftId = tmp01.getValue();
            if(rightId == 0 || leftId == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            int bottomId = splitNode(leftId, ImGuiDir.Down, 0.2f, tmp01);
            int topId = tmp01.getValue();
            if(bottomId == 0 || topId == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            int leftLeftId = splitNode(topId, ImGuiDir.Left, 0.2f, tmp01);
            int middleId = tmp01.getValue();
            if(leftLeftId == 0 || middleId == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            int middleLeftId = splitNode(middleId, ImGuiDir.Left, 0.5f, tmp01);
            centralID = tmp01.getValue();
            if(middleLeftId == 0 || centralID == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            int rightTopId = splitNode(rightId, ImGuiDir.Up, 0.5f, tmp01);
            int rightBottomId = tmp01.getValue();
            if(rightTopId == 0 || rightBottomId == 0) {
                ImGuiInternal.DockBuilderFinish(dockspace_id);
                return false;
            }

            ImGuiInternal.DockBuilderDockWindow("Game Editor", centralID);
            ImGuiInternal.DockBuilderDockWindow("GUI Editor", centralID);
            ImGuiInternal.DockBuilderDockWindow("Game Window", middleLeftId);
            ImGuiInternal.DockBuilderDockWindow("Dear ImGui Demo", rightBottomId);
            ImGuiInternal.DockBuilderDockWindow("Hierarchy", leftLeftId);
            ImGuiInternal.DockBuilderDockWindow("Inspector", rightTopId);
            ImGuiInternal.DockBuilderDockWindow("Assets", bottomId);
        }

        ImGuiDockNode node = ImGuiInternal.DockBuilderGetNode(centralID);
        if(node != null && !node.native_isNULL()) {
            // Select Game editor tab
            int gameEditor = ImGuiInternal.ImHashStr("Game Editor", 0, 0);
            int id = ImGuiInternal.ImHashStr("#TAB", 0, gameEditor);
            node.set_SelectedTabId(id);
        }

        ImGuiInternal.DockBuilderFinish(dockspace_id);
        return true;
    }

    private int splitNode(int nodeId, ImGuiDir splitDir, float sizeRatio, NativeInt outIdAtOppositeDir) {
        if(!hasDockNode(nodeId)) {
            outIdAtOppositeDir.set(0);
            return 0;
        }
        outIdAtOppositeDir.set(0);
        return ImGuiInternal.DockBuilderSplitNode(nodeId, splitDir, sizeRatio, NativeIntArray.NULL, outIdAtOppositeDir);
    }

    private boolean hasDockNode(int nodeId) {
        if(nodeId == 0) {
            return false;
        }
        ImGuiDockNode node = ImGuiInternal.DockBuilderGetNode(nodeId);
        return node != null && !node.native_isNULL();
    }

    private void renderMenu() {
        if(ImGui.BeginMainMenuBar()) {
            if(ImGui.BeginMenu("File")) {
                if(ImGui.MenuItem("Save")) {
                }
                if(ImGui.MenuItem("Load")) {
                }
                ImGui.EndMenu();
            }

            if(ImGui.BeginMenu("View")) {
                if(ImGui.BeginMenu("Layout")) {
                    if(ImGui.MenuItem("Layout 01")) {
                        resetLayout(0);
                    }
                    if(ImGui.MenuItem("Layout 02")) {
                        resetLayout(1);
                    }

                    ImGui.EndMenu();
                }

                ImGui.EndMenu();
            }
            ImGui.EndMainMenuBar();
        }
    }
}
