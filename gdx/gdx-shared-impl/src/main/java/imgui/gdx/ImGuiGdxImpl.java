package imgui.gdx;

import com.badlogic.gdx.Gdx;
import com.github.xpenatan.jparser.idl.helper.IDLString;
import imgui.ClipboardTextFunction;
import imgui.ImGui;
import imgui.ImGuiImpl;
import imgui.ImGuiPlatformIO;

public abstract class ImGuiGdxImpl implements ImGuiImpl {

    private ClipboardTextFunction clipboardTextFunction;

    public ImGuiGdxImpl() {
        setupClipboard();
    }

    private void setupClipboard() {
        ImGuiPlatformIO platformIO = ImGui.GetPlatformIO();
        ClipboardTextFunction.setClipboardTextFunction(platformIO, clipboardTextFunction = new ClipboardTextFunction() {
            @Override
            public void onGetClipboardText(IDLString strOut) {
                String contents = Gdx.app.getClipboard().getContents();
                strOut.append(contents);
            }

            @Override
            public void onSetClipboardText(IDLString text) {
                String contents = text.c_str();
                Gdx.app.getClipboard().setContents(contents);
            }
        });
    }

    public void dispose() {
        if(clipboardTextFunction != null) {
            clipboardTextFunction.dispose();
            clipboardTextFunction = null;
        }
    }
}
