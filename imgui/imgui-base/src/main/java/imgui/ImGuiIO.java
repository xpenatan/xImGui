package imgui;

import com.github.xpenatan.jParser.idl.IDLBase;

public class ImGuiIO extends IDLBase {

    public final static ImGuiIO NULL = native_new();

    public static ImGuiIO TMP_EMPTY = new ImGuiIO(false);

    public static ImGuiIO native_new() {
        return new ImGuiIO((byte) 0, (char) 0);
    }

    private ImGuiIO(byte v, char c) {
    }

    public ImGuiIO(boolean cMemoryOwn) {
    }

    public void SetClipboardTextFunction(ClipboardTextFunction function) {
        setClipboardTextFunctionNATIVE(native_address, function.native_address);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        var clipboardFunction = [MODULE].wrapPointer(function_addr, [MODULE].ClipboardTextFunction);
        [MODULE].ImHelper.prototype.setClipboardTextFunction(io, clipboardFunction);
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        ClipboardTextFunction* clipboardFunction = (ClipboardTextFunction*)function_addr;
        ImHelper::setClipboardTextFunction(io, clipboardFunction);
    */
    private static native void setClipboardTextFunctionNATIVE(long addr, long function_addr);
}
