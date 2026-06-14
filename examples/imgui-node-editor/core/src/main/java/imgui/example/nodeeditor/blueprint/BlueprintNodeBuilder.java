package imgui.example.nodeeditor.blueprint;

import imgui.extension.nodeeditor.PinKind;

public class BlueprintNodeBuilder {

    public BlueprintNodeBuilder(int textureId, int textureWidth, int textureHeight) {

    }

    public void Begin(int nodeId) {

    }

    public void End() {

    }

    public void Header(int color) {

    }

    public void EndHeader() {

    }

    public void Input(int pinId) {

    }

    public void EndInput() {

    }

    public void Middle() {

    }

    public void Output(int pinId) {

    }

    public void EndOutput() {

    }

    private void SetStage(Stage stage) {

    }

    private void Pin(int pinId, PinKind kind) {

    }

    private void EndPin() {

    }

    int          HeaderTextureId;
    int          HeaderTextureWidth;
    int          HeaderTextureHeight;
    int          CurrentNodeId;
    Stage        CurrentStage;
    int          HeaderColor;
    ExampleVec2  NodeMin;
    ExampleVec2  NodeMax;
    ExampleVec2  HeaderMin;
    ExampleVec2  HeaderMax;
    ExampleVec2  ContentMin;
    ExampleVec2  ContentMax;
    boolean      HasHeader;

    public enum Stage {
        Invalid,
        Begin,
        Header,
        Content,
        Input,
        Output,
        Middle,
        End
    }
}
