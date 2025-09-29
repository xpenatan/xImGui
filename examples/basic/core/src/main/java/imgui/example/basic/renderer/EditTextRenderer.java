package imgui.example.basic.renderer;

import com.github.xpenatan.jParser.idl.IDLBase;
import imgui.ImGui;
import imgui.ImGuiDataType;
import imgui.ImGuiInputTextFlags;
import imgui.ImGuiInternal;
import imgui.ImGuiMouseButton;
import imgui.ImGuiSliderFlags;
import imgui.ImGuiString;
import imgui.ImGuiWindow;
import imgui.idl.helper.IDLFloatArray;

public class EditTextRenderer implements UIRenderer {

    private final IDLFloatArray imguiFloat1 = new IDLFloatArray(1);
    private final IDLFloatArray imguiFloat2 = new IDLFloatArray(2);
    private final IDLFloatArray imguiFloat3 = new IDLFloatArray(3);
    private final IDLFloatArray imguiFloat4 = new IDLFloatArray(4);

    private final ImGuiString imguiString1 = new ImGuiString();
    private final ImGuiString imguiString2 = new ImGuiString();

    public String value = "";

    public EditTextRenderer() {
    }

    boolean flag = false;

    public void render() {

        String format = "%.3f";


        int id = 93123;
        ImGuiWindow window = ImGuiInternal.GetCurrentWindow();
        ImGui.Text("Click Drag");
        if(ImGui.IsItemClicked(ImGuiMouseButton.Left)) {
            flag = true;
            System.out.println("Item Clicked");
        }
        if(flag && ImGui.IsMouseReleased(ImGuiMouseButton.Left)) {
            System.out.println("Mouse Released");
            flag = false;
        }
        if(flag) {
            ImGuiInternal.SetActiveID(id, window);
        }
        ImGuiSliderFlags flags = ImGuiSliderFlags.None;
        if(ImGuiInternal.DragBehavior(id, ImGuiDataType.Float, imguiFloat1, 0.1f, IDLBase.NULL, IDLBase.NULL, format, flags)) {
            System.out.println("Dragging");
        }

        ImGui.DragFloat("TestFloat", imguiFloat1);
        ImGui.DragFloat2("TestFloat2", imguiFloat2);
        ImGui.DragFloat3("TestFloat3", imguiFloat3);
        ImGui.DragFloat4("TestFloat4", imguiFloat4, 0.01f, -2, 2);

        if(ImGui.InputText("TestString1", imguiString1, imguiString1.getSize())) {
            String value = imguiString1.getValue();
            System.out.println("value 1: " + value);
        }
        imguiString2.setValue(value);
        if(ImGui.InputText("TestString2", imguiString2, imguiString2.getSize(), ImGuiInputTextFlags.EnterReturnsTrue)) {
            value = imguiString2.getValue();
            System.out.println("value 2: " + value);
        }

    }

    @Override
    public String getName() {
        return "EditText";
    }
}
