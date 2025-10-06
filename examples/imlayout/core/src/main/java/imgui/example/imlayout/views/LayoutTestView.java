package imgui.example.imlayout.views;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import imgui.ImGui;
import imgui.ImGuiButtonFlags;
import imgui.ImGuiButtonFlagsPrivate_;
import imgui.ImGuiTableColumnFlags;
import imgui.ImGuiTableFlags;
import imgui.ImRect;
import imgui.ImTemp;
import imgui.ImVec2;
import imgui.extension.imlayout.ImGuiLayout;
import imgui.extension.imlayout.ImLayout;
import imgui.extension.imlayout.ImOrientation;

public class LayoutTestView {

    boolean selected;

    public void render() {
        float mouseX = Gdx.input.getX();
        float mouseY = Gdx.input.getY();

        ImLayout.BeginLayout("Stuff", ImLayout.WRAP_PARENT, ImLayout.WRAP_PARENT);
        ImLayout.ShowLayoutDebug();
        ImGuiLayout curLayout = ImLayout.GetCurrentLayout();
        ImVec2 position = curLayout.get_position();
        ImVec2 size = curLayout.get_size();
        float posX = position.get_x();
        float posY = position.get_y();
        float sizeX = size.get_x();
        float sizeY = size.get_y();
        float posSizeX = posX + sizeX;
        float posSizeY = posY + sizeY;

        ImGui.Text("MouseX: " + mouseX);
        ImGui.SameLine();
        ImGui.Text("MouseY: " + mouseY);
        ImGui.Text("posX: " + posX);
        ImGui.Text("posY: " + posY);
        ImGui.Text("posSizeX: " + posSizeX);
        ImGui.Text("posSizeY: " + posSizeY);

        ImLayout.EndLayout();

        ImGuiTableFlags flags = ImGuiTableFlags.Resizable.or(ImGuiTableFlags.ScrollY);
        if(ImGui.BeginTable("ContentBrowser", 2, flags)) {

            ImGui.TableSetupColumn("C0", ImGuiTableColumnFlags.WidthStretch, 0.2f);
            ImGui.TableSetupColumn("C1", ImGuiTableColumnFlags.WidthStretch, 0.8f);

            ImGui.TableNextRow();
            ImGui.TableSetColumnIndex(0);
            {
                renderTree();
            }
            ImGui.TableSetColumnIndex(1);
            {
                renderCustomButtonBehavior();
            }
            ImGui.EndTable();
        }
    }

    private void renderCustomButtonBehavior() {
        ImLayout.BeginLayout("TestID", ImLayout.WRAP_PARENT, ImLayout.WRAP_PARENT);
        ImGui.Text("Click");
        ImGui.Text("Meeeeee!!!");
        ImLayout.EndLayout();

        ImRect rect = ImTemp.ImRect_1(ImGui.GetItemRectMin(), ImGui.GetItemRectMax());
        int selectedColor = Color.toIntBits(255, 255, 255, 60);
        int houveredColor = Color.toIntBits(255, 255, 255, 60);
        int houveredStrokeColor = Color.toIntBits(255, 255, 255, 100);
        ImGuiButtonFlags.CUSTOM.setValue(ImGuiButtonFlagsPrivate_.PressedOnRelease.getValue());
        int click = ImLayout.ButtonBehavior(199, rect, selected, selectedColor, houveredColor, houveredStrokeColor, ImGuiButtonFlags.CUSTOM, 0.160f);
        if (click > 0) {
            if(click == 1) {
                selected = !selected;
            }
            System.out.println("CLICKS:" + click);
        }
    }

    private void renderTree() {
        float height = 10;
        ImLayout.BeginTree("RootId");
        ImLayout.BeginTreeLayout(ImLayout.GetTreeHeight(height), false, false);
        ImLayout.SetOrientation(ImOrientation.HORIZONTAL);
        {
            ImLayout.BeginAlign("111", ImLayout.MATCH_PARENT, ImLayout.MATCH_PARENT, 0f, 0.5f);
            ImGui.Text("Root");

            ImLayout.ShowLayoutDebug();
            ImLayout.EndAlign();
            ImGui.SameLine();
        }

        {
            ImLayout.BeginAlign("222", ImLayout.MATCH_PARENT, ImLayout.MATCH_PARENT, 0.5f, 0.5f);
            ImGui.Text("- " + 2);
            ImLayout.ShowLayoutDebug();
            ImLayout.EndAlign();
        }

        ImLayout.EndTreeLayout();
        if(ImLayout.IsTreeOpen()) {
            {
                ImLayout.BeginTree("Assets");
                ImLayout.BeginTreeLayout(ImLayout.GetTreeHeight(height), false, false);
                ImGui.Text("Assets");
                ImLayout.EndTreeLayout();
                if(ImLayout.IsTreeOpen()) {
                    {
                        ImLayout.BeginTree("Item01");
                        ImLayout.BeginTreeLayout(ImLayout.GetTreeHeight(height), true, false);
                        ImGui.Text("Item01");

                        ImGui.SameLine();

                        if(ImGui.Button("HELLO")) {
                            System.out.println("HELLOO");
                        }
                        ImLayout.EndTreeLayout();
                        if(ImLayout.IsTreeOpen()) {
                        }
                        ImLayout.EndTree();
                    }
                    {
                        ImLayout.BeginTree("Item02");
                        ImLayout.BeginTreeLayout(ImLayout.GetTreeHeight(height), true, false);
                        ImGui.Text("Item02");
                        ImLayout.EndTreeLayout();
                        if(ImLayout.IsTreeOpen()) {
                        }
                        ImLayout.EndTree();
                    }
                    {
                        ImLayout.BeginTree("Item03");
                        ImLayout.BeginTreeLayout(ImLayout.GetTreeHeight(height), true, false);
                        ImGui.Text("Item03");
                        ImLayout.EndTreeLayout();
                        if(ImLayout.IsTreeOpen()) {
                        }
                        ImLayout.EndTree();
                    }
                    {
                        ImLayout.BeginTree("Item04");
                        ImLayout.BeginTreeLayout(ImLayout.GetTreeHeight(height), true, false);
                        ImGui.Text("Item04");
                        ImLayout.EndTreeLayout();
                        if(ImLayout.IsTreeOpen()) {
                        }
                        ImLayout.EndTree();
                    }
                }
                ImLayout.EndTree();
            }
        }
        ImLayout.EndTree();
    }
}
