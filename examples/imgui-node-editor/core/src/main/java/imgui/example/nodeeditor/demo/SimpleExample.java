package imgui.example.nodeeditor.demo;

import imgui.ImGui;
import imgui.ImVec2;
import imgui.extension.nodeeditor.EditorContext;
import imgui.extension.nodeeditor.NodeEditor;
import imgui.extension.nodeeditor.PinKind;

public class SimpleExample {

    public static void render(EditorContext editorContext) {
        NodeEditor.SetCurrentEditor(editorContext);

        NodeEditor.Begin("My Editor", ImVec2.TMP_1.set(0, 0));

        int uniqueId = 1;
        {
            NodeEditor.BeginNode(uniqueId++);
            ImGui.Text("Node A");
            {
                NodeEditor.BeginPin(uniqueId++, PinKind.Input);
                ImGui.Text("-> In");
                NodeEditor.EndPin();
            }

            ImGui.SameLine();

            {
                NodeEditor.BeginPin(uniqueId++, PinKind.Output);
                ImGui.Text("-> Out");
                NodeEditor.EndPin();
            }
            NodeEditor.EndNode();
        }

        NodeEditor.End();
        NodeEditor.SetCurrentEditor(EditorContext.NULL);
    }
}
