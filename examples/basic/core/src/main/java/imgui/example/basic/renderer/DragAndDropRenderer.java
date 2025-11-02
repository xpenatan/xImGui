package imgui.example.basic.renderer;

import com.github.xpenatan.jParser.idl.IDLBase;
import imgui.idl.helper.IDLTemp;
import imgui.ImGui;
import imgui.ImGuiPayload;
import imgui.ImGuiString;
import imgui.idl.helper.IDLInt;

public class DragAndDropRenderer implements UIRenderer {

    private ImGuiString imString = new ImGuiString();

    public DragAndDropRenderer() {
    }

    @Override
    public void render() {
        ImGui.InputText("##test", imString, imString.getSize());

        if(ImGui.BeginDragDropSource()) {
            ImGui.SetDragDropPayload("DRAG_ENTITY_ID", IDLTemp.Int_1(3), Integer.BYTES);
            ImGui.Text("Dragging: " + "entityName");
            ImGui.EndDragDropSource();
        }

        ImGui.Text("Drag here");
        if(ImGui.BeginDragDropTarget()) {
            ImGuiPayload dragDropPayload = ImGui.AcceptDragDropPayload("DRAG_ENTITY_ID");
            if(!dragDropPayload.native_isNULL()) {
                System.out.println("dragDropPayload");
                IDLBase data = dragDropPayload.get_Data();
                IDLInt idlInt = IDLInt.native_new();
                idlInt.native_copy(data);
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