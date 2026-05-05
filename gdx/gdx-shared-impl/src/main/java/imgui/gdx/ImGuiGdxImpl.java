package imgui.gdx;

import com.badlogic.gdx.Gdx;
import com.github.xpenatan.jparser.runtime.helper.NativeString;
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
            public void onGetClipboardText(NativeString strOut) {
                String contents = Gdx.app.getClipboard().getContents();
                strOut.append(contents);
            }

            @Override
            public void onSetClipboardText(NativeString text) {
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
