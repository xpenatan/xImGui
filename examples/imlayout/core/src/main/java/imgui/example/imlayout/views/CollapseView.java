package imgui.example.imlayout.views;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.github.xpenatan.jparser.idl.helper.IDLBoolArray;
import com.github.xpenatan.jparser.idl.helper.IDLFloatArray;
import com.github.xpenatan.jparser.idl.helper.IDLIntArray;
import imgui.ImGui;
import imgui.ImGuiContext;
import imgui.ImTemp;
import imgui.ImTextureRef;
import imgui.enums.ImGuiDir;
import imgui.example.renderer.ImGuiShared;
import imgui.extension.imlayout.ImLayout;

public class CollapseView {

    private Texture buttonTexture;

    private IDLBoolArray isDebug = new IDLBoolArray(1);

    private IDLBoolArray dummyCheckbox = new IDLBoolArray(1);

    private IDLBoolArray isCollapseOpen = new IDLBoolArray(1);
    private IDLBoolArray isCollapseOpen2 = new IDLBoolArray(1);

    private IDLFloatArray alignX = new IDLFloatArray(1);
    private IDLFloatArray offsetX = new IDLFloatArray(1);
    private IDLFloatArray alignY = new IDLFloatArray(1);
    private IDLFloatArray offsetY = new IDLFloatArray(1);

    private IDLIntArray guiInt = new IDLIntArray(1);

    public void init() {
        alignX.setValue(0, 0.5f);
        offsetX.setValue(0, 0.0f);
        alignY.setValue(0, 0.5f);
        offsetY.setValue(0, 0.0f);
        buttonTexture = new Texture(Gdx.files.internal("data/badlogicsmall.jpg"));
    }

    public void dispose() {
        buttonTexture.dispose();
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

            ImTextureRef textureRef = ImGuiShared.instance.getTextureRef(buttonTexture);
            ImGui.Image(textureRef, ImTemp.ImVec2_1(32, 32));
            ImGui.ImageButton("##textId", textureRef, ImTemp.ImVec2_1(42, 42));

            ImLayout.EndAlign();
        }
        ImLayout.EndCollapseLayout();
    }
}
