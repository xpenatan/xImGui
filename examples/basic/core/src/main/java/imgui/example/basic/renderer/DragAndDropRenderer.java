package imgui.example.basic.renderer;

import com.github.xpenatan.jParser.api.NativeObject;
import com.github.xpenatan.jparser.runtime.helper.NativeInt;
import com.github.xpenatan.jparser.runtime.helper.NativeTemp;
import imgui.ImGui;
import imgui.ImGuiPayload;
import imgui.ImGuiString;

public class DragAndDropRenderer implements UIRenderer {

    private ImGuiString imString = new ImGuiString();

    public DragAndDropRenderer() {
    }

    @Override
    public void render() {
        ImGui.InputText("##test", imString, imString.getSize());

        if(ImGui.BeginDragDropSource()) {
            ImGui.SetDragDropPayload("DRAG_ENTITY_ID", NativeTemp.Int_1(3), Integer.BYTES);
            ImGui.Text("Dragging: " + "entityName");
            ImGui.EndDragDropSource();
        }

        ImGui.Text("Drag here");
        if(ImGui.BeginDragDropTarget()) {
            ImGuiPayload dragDropPayload = ImGui.AcceptDragDropPayload("DRAG_ENTITY_ID");
            if(!dragDropPayload.native_isNULL()) {
                System.out.println("dragDropPayload");
                int dataSize = dragDropPayload.get_DataSize();
                NativeObject data = dragDropPayload.get_Data();
                NativeInt idlInt = NativeTemp.Int_1(data);
                int data1 = idlInt.getValue();
                System.out.println("Value: " + data1);
            }
            ImGui.EndDragDropTarget();
        }
    }

    @Override
    public String getName() {
        return "Drag&Drop";
    }
}