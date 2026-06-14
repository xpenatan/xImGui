package imgui.example.nodeeditor;

import com.github.xpenatan.jparser.runtime.helper.NativeString;
import imgui.example.nodeeditor.demo.BlueprintExample;
import imgui.example.nodeeditor.demo.SimpleExample;
import imgui.example.renderer.ImGuiRenderer;
import imgui.extension.nodeeditor.Config;
import imgui.extension.nodeeditor.EditorContext;
import imgui.extension.nodeeditor.LoadSaveSettingsListener;
import imgui.extension.nodeeditor.NodeEditor;
import imgui.extension.nodeeditor.SaveReasonFlags;

public class NodeEditorExample extends ImGuiRenderer {

    private EditorContext editorContext;

    private BlueprintExample blueprintExample;

    @Override
    public void show() {
        super.show();
        Config config  = new Config();
        editorContext = NodeEditor.CreateEditor(new LoadSaveSettingsListener() {
            @Override
            public void onLoad(NativeString data) {
            }

            @Override
            public boolean onSave(NativeString data, SaveReasonFlags reason) {
                return true;
            }
        });

        blueprintExample = new BlueprintExample();
    }

    @Override
    public void renderImGui() {
        SimpleExample.render(editorContext);
//        blueprintExample.render(editorContext);
    }

    @Override
    public void dispose() {
        super.dispose();

        NodeEditor.DestroyEditor(editorContext);
    }
}
