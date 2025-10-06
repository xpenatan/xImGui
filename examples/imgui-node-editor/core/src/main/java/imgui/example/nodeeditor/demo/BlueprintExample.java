package imgui.example.nodeeditor.demo;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.utils.Array;
import imgui.ImGui;
import imgui.ImTemp;
import imgui.ImVec2;
import imgui.example.nodeeditor.blueprint.BlueprintNodeBuilder;
import imgui.example.nodeeditor.blueprint.Drawing;
import imgui.extension.nodeeditor.EditorContext;
import imgui.extension.nodeeditor.NodeEditor;
import imgui.extension.nodeeditor.PinKind;

public class BlueprintExample {

    public static String MENU_CREATE_NODE = "Create New Node";

    private Array<Node> nodes = new Array<>();
    private Array<Link> links = new Array<>();

    private int nextId = 1;

    BlueprintNodeBuilder builder;

    public BlueprintExample() {


        builder = new BlueprintNodeBuilder(0, 1, 1);
    }

    public void render(EditorContext editorContext) {
        NodeEditor.SetCurrentEditor(editorContext);
        NodeEditor.Begin("Node editor");
        {
            for(Node node : nodes) {
                if(node.type != NodeType.Blueprint && node.type != NodeType.Simple)
                    continue;

                boolean isSimple = node.type == NodeType.Simple;

                boolean hasOutputDelegates = false;
                for(Pin output : node.outputs) {
                    if(output.type == PinType.Delegate) {
                        hasOutputDelegates = true;
                    }
                }
                builder.Begin(node.id);

                if(!isSimple) {
                    builder.Header(node.color);

                    ImGui.TextUnformatted(node.name);
                    ImGui.Dummy(ImTemp.ImVec2_1(0, 28));

                    if(hasOutputDelegates) {
//                        ImGui::BeginVertical ("delegates", ImVec2(0, 28));
//                        ImGui::Spring (1, 0);
//                        for(auto & output :node.Outputs)
//                        {
//                            if(output.Type != PinType::Delegate)
//                                continue;
//
//                            auto alpha = ImGui::GetStyle ().Alpha;
//                            if(newLinkPin && !CanCreateLink(newLinkPin, & output) && &output != newLinkPin)
//                            alpha = alpha * (48.0f / 255.0f);
//
//                            ed::BeginPin (output.ID, ed::PinKind::Output);
//                            ed::PinPivotAlignment (ImVec2(1.0f, 0.5f));
//                            ed::PinPivotSize (ImVec2(0, 0));
//                            ImGui::BeginHorizontal (output.ID.AsPointer());
//                            ImGui::PushStyleVar (ImGuiStyleVar_Alpha, alpha);
//                            if(!output.Name.empty()) {
//                                ImGui::TextUnformatted (output.Name.c_str());
//                                ImGui::Spring (0);
//                            }
//                            DrawPinIcon(output, IsPinLinked(output.ID), (int)(alpha * 255));
//                            ImGui::Spring (0, ImGui::GetStyle ().ItemSpacing.x / 2);
//                            ImGui::EndHorizontal ();
//                            ImGui::PopStyleVar ();
//                            ed::EndPin ();
//
//                            //DrawItemRect(ImColor(255, 0, 0));
//                        }
//                        ImGui::Spring (1, 0);
//                        ImGui::EndVertical ();
//                        ImGui::Spring (0, ImGui::GetStyle ().ItemSpacing.x / 2);
                    }
                    else {

                    }
                    builder.EndHeader();
                }

                for(Pin input : node.inputs) {
//                    float alpha = ImGui.GetStyle().get_Alpha();
//                    if (newLinkPin && !CanCreateLink(newLinkPin, &input) && &input != newLinkPin) {
//                        alpha = alpha * (48.0f / 255.0f);
//                    }

                    builder.Input(input.id);
//                    ImGui.PushStyleVar(ImGuiStyleVar_Alpha, alpha);
//                    DrawPinIcon(input, IsPinLinked(input.ID), (int)(alpha * 255));
//                    ImGui::Spring (0);
                    if(!input.name.isEmpty()) {
                        ImGui.TextUnformatted(input.name);
//                        ImGui::Spring(0);
                    }
                    if(input.type == PinType.Bool) {
                        ImGui.Button("Hello");
//                        ImGui::Spring(0);
                    }
                    ImGui.PopStyleVar();
                    builder.EndInput();
                }

                builder.End();
            }

            for(Node node : nodes) {
                if(node.type != NodeType.Tree)
                    continue;
            }

            for(Node node : nodes) {
                if(node.type != NodeType.Houdini)
                    continue;
            }

            for(Node node : nodes) {
                if(node.type != NodeType.Comment)
                    continue;
            }


            ImVec2 openPopupPosition = ImGui.GetMousePos();
//            float mouseX = openPopupPosition.get_x();
//            float mouseY = openPopupPosition.get_y();

            NodeEditor.Suspend();
            if(NodeEditor.ShowBackgroundContextMenu()) {
                ImGui.OpenPopup(MENU_CREATE_NODE);
            }
            NodeEditor.Resume();

            NodeEditor.Suspend();
//            renderCreateNodeMenu(mouseX, mouseY);
            NodeEditor.Resume();
        }
        NodeEditor.End();
        NodeEditor.SetCurrentEditor(null);
    }

    void DrawPinIcon(Pin pin, boolean connected, int alpha) {
        Drawing.IconType iconType;
        int color = GetIconColor(pin.type, alpha);
        switch(pin.type) {
            case Flow:
                iconType = Drawing.IconType.Flow;
                break;
            case Bool:
                iconType = Drawing.IconType.Circle;
                break;
            case Int:
                iconType = Drawing.IconType.Circle;
                break;
            case Float:
                iconType = Drawing.IconType.Circle;
                break;
            case String:
                iconType = Drawing.IconType.Circle;
                break;
            case Object:
                iconType = Drawing.IconType.Circle;
                break;
            case Function:
                iconType = Drawing.IconType.Circle;
                break;
            case Delegate:
                iconType = Drawing.IconType.Square;
                break;
            default:
                return;
        }

//        ax::Widgets::Icon(ImVec2(static_cast < float>(m_PinIconSize), static_cast < float>(m_PinIconSize)),
//        iconType, connected, color, ImColor(32, 32, 32, alpha));
    }

    int GetIconColor(PinType type, int alpha)
    {
        switch (type) {
            default:
            case Flow:     return Color.toIntBits(255, 255, 255, alpha);
            case Bool:     return Color.toIntBits(220,  48,  48, alpha);
            case Int:      return Color.toIntBits( 68, 201, 156, alpha);
            case Float:    return Color.toIntBits(147, 226,  74, alpha);
            case String:   return Color.toIntBits(124,  21, 153, alpha);
            case Object:   return Color.toIntBits( 51, 150, 215, alpha);
            case Function: return Color.toIntBits(218,   0, 183, alpha);
            case Delegate: return Color.toIntBits(255,  48,  48, alpha);
        }
    }

    public Node SpawnInputActionNode() {
        Node node = new Node(GetNextId(), "InputAction Fire", Color.toIntBits(255, 128, 128, 255));
        nodes.add(node);
        node.outputs.add(new Pin(GetNextId(), "", PinType.Delegate));
        node.outputs.add(new Pin(GetNextId(), "Pressed", PinType.Flow));
        node.outputs.add(new Pin(GetNextId(), "Released", PinType.Flow));
        BuildNode(node);
        return node;
    }

    private void renderCreateNodeMenu(float mouseX, float mouseY) {
        if(ImGui.BeginPopup(MENU_CREATE_NODE)) {
            Node node = null;

            if(ImGui.MenuItem("Input Action")) {
                node = SpawnInputActionNode();
            }

            if(node != null) {
                BuildNodes();
                NodeEditor.SetNodePosition(node.id, ImTemp.ImVec2_1(mouseX, mouseY));
            }

            ImGui.EndPopup();
        }
    }

    void BuildNodes() {
        for(Node node : nodes) {
            BuildNode(node);
        }
    }

    void BuildNode(Node node) {
        for(Pin input : node.inputs) {
            input.node = node;
            input.kind = PinKind.Input;
        }

        for(Pin output : node.outputs) {
            output.node = node;
            output.kind = PinKind.Output;
        }
    }

    private int GetNextId() {
        return nextId++;
    }

    public static class Node {
        public int id;
        public String name;
        public Array<Pin> inputs = new Array<>();
        public Array<Pin> outputs = new Array<>();
        public int color = Color.toIntBits(255, 255, 255, 255);
        public NodeType type = NodeType.Blueprint;
        public Vector2 size = new Vector2(0, 0);

        public Node() {
        }

        public Node(int nodeID, String name, int color) {
            this.id = nodeID;
            this.name = name;
            this.color = color;
        }
    }

    public static class Link {
        public int id;
        public int startPinID;
        public int endPinID;
        public int color = Color.toIntBits(255, 255, 255, 255);
    }

    public static class Pin {
        public int id;
        public Node node;
        public String name = "";
        public PinType type;
        public PinKind kind;

        public Pin() {
        }

        public Pin(int pinID, String name, PinType type) {
            this.id = pinID;
            this.name = name;
            this.type = type;
        }
    }

    public enum NodeType {
        Blueprint,
        Simple,
        Tree,
        Comment,
        Houdini
    }

    public enum PinType {
        Flow,
        Bool,
        Int,
        Float,
        String,
        Object,
        Function,
        Delegate,
    }


}