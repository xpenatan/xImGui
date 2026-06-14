package imgui.example.imlayout.views;

import com.github.xpenatan.jparser.runtime.helper.NativeBoolArray;
import com.github.xpenatan.jparser.runtime.helper.NativeFloatArray;
import com.github.xpenatan.jparser.runtime.helper.NativeIntArray;
import imgui.ImGui;
import imgui.ImGuiContext;
import imgui.ImTemp;
import imgui.ImTextureRef;
import imgui.enums.ImGuiDir;
import imgui.example.renderer.ExampleTexture;
import imgui.example.renderer.ImGuiShared;
import imgui.extension.imlayout.ImLayout;

public class CollapseView {

    private ExampleTexture buttonTexture;

    private NativeBoolArray isDebug = new NativeBoolArray(1);

    private NativeBoolArray dummyCheckbox = new NativeBoolArray(1);

    private NativeBoolArray isCollapseOpen = new NativeBoolArray(1);
    private NativeBoolArray isCollapseOpen2 = new NativeBoolArray(1);

    private NativeFloatArray alignX = new NativeFloatArray(1);
    private NativeFloatArray offsetX = new NativeFloatArray(1);
    private NativeFloatArray alignY = new NativeFloatArray(1);
    private NativeFloatArray offsetY = new NativeFloatArray(1);

    private NativeIntArray guiInt = new NativeIntArray(1);

    public void init() {
        alignX.setValue(0, 0.5f);
        offsetX.setValue(0, 0.0f);
        alignY.setValue(0, 0.5f);
        offsetY.setValue(0, 0.0f);
        buttonTexture = ImGuiShared.createCheckerTexture("imlayout button", 32, 32);
    }

    public void dispose() {
        buttonTexture.close();
    }

    public void render() {
        ImGuiContext imGuiContext = ImGui.GetCurrentContext();
        boolean b = imGuiContext.native_isNULL();
        ImLayout.DrawBoundingBox(100f, 100f,40f, 40f, 255, 0, 0);

        if(ImLayout.BeginCollapseLayout("##idd", "Hello", ImLayout.MATCH_PARENT, ImLayout.WRAP_PARENT)) {
            ImGui.Button("HI");

        }
        ImLayout.EndCollapseLayout();

        ImLayout.BeginCollapseLayoutEx("##ID1", isCollapseOpen, "Stuff", ImLayout.MATCH_PARENT, ImLayout.WRAP_PARENT);

        if(isDebug.getValue(0)) {
            ImLayout.ShowLayoutDebug();
        }

        ImGui.Checkbox("DummyCheckBox", dummyCheckbox);

        ImGui.SameLine();

        ImLayout.BeginAlign("##ID2", ImLayout.MATCH_PARENT, ImLayout.MATCH_PARENT, 1.0f, 0.5f, -5, 0);
        ImGui.Button("Ok");
        ImGui.SameLine();
        ImGui.Text("Custom Align");
        ImLayout.EndAlign();

        ImLayout.EndCollapseFrameLayout();

        if(isCollapseOpen.getValue(0)) {

            ImGui.Checkbox("LayoutDebug", isDebug);

            ImLayout.BeginCollapseLayout("##ID3", isCollapseOpen2, "Alignment options", ImLayout.MATCH_PARENT, ImLayout.WRAP_PARENT);
            if(isCollapseOpen2.getValue(0)) {
                ImGui.SliderFloat("AlignX", alignX, 0.0f, 1.0f, "%.2f");
                ImGui.SliderFloat("OffsetX", offsetX, -10.0f, 10.0f, "%.2f");
                ImGui.SliderFloat("AlignY", alignY, 0.0f, 1.0f, "%.2f");
                ImGui.SliderFloat("OffsetY", offsetY, -10.0f, 10.0f, "%.2f");
            }
            ImLayout.EndCollapseLayout();

            ImGui.ArrowButton("##Left", ImGuiDir.Left);
            ImGui.SameLine();
            ImGui.ArrowButton("##Right", ImGuiDir.Right);
            ImGui.SameLine();
            ImGui.ArrowButton("##Up", ImGuiDir.Up);
            ImGui.SameLine();
            ImGui.ArrowButton("##Down", ImGuiDir.Down);

            ImGui.RadioButton("radio a", guiInt, 0);
            ImGui.SameLine();
            ImGui.RadioButton("radio b", guiInt, 1);
            ImGui.SameLine();
            ImGui.RadioButton("radio c", guiInt, 2);
            ImGui.SameLine();
            ImGui.RadioButton("radio true", true);

            ImGui.Bullet();
            ImGui.SameLine();
            ImGui.Text("Bullet text");

            ImLayout.BeginAlign("##ID4", ImLayout.MATCH_PARENT, 200, alignX.getValue(0), alignY.getValue(0), offsetX.getValue(0), offsetY.getValue(0));

            if(isDebug.getValue(0)) {
                ImLayout.ShowLayoutDebug();
            }

            ImTextureRef textureRef = ImGuiShared.textureRef(buttonTexture);
            ImGui.Image(textureRef, ImTemp.ImVec2_1(32, 32));
            ImGui.ImageButton("##textId", textureRef, ImTemp.ImVec2_1(42, 42));

            ImLayout.EndAlign();
        }
        ImLayout.EndCollapseLayout();
    }
}
