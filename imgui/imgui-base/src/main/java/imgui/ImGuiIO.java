package imgui;

import idl.IDLBase;
import idl.helper.IDLByteArray;
import idl.helper.IDLIntArray;

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

//    public boolean ContainsConfigFlags(ImGuiConfigFlags flags) {
//        return ContainsConfigFlagsNATIVE(getCPointer(), flags.getValue());
//    }
//
//    /*[-TEAVM;-NATIVE]
//        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
//        var newFlag = io.get_ConfigFlags() & flag;
//        return newFlag == flag;
//    */
//    /*[-JNI;-NATIVE]
//        ImGuiIO* io = (ImGuiIO*)addr;
//        int newFlag = io->ConfigFlags & flag;
//        return newFlag == flag;
//    */
//    private static native boolean ContainsConfigFlagsNATIVE(long addr, int flag);

    public void SetDockingFlags(boolean ConfigDockingNoSplit, boolean ConfigDockingWithShift, boolean ConfigDockingAlwaysTabBar, boolean ConfigDockingTransparentPayload) {
        SetDockingFlagsNATIVE(native_address, ConfigDockingNoSplit, ConfigDockingWithShift, ConfigDockingAlwaysTabBar, ConfigDockingTransparentPayload);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        io.set_ConfigDockingNoSplit(ConfigDockingNoSplit);
        io.set_ConfigDockingWithShift(ConfigDockingWithShift);
        io.set_ConfigDockingAlwaysTabBar(ConfigDockingAlwaysTabBar);
        io.set_ConfigDockingTransparentPayload(ConfigDockingTransparentPayload);
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        io->ConfigDockingNoSplit = ConfigDockingNoSplit;
        io->ConfigDockingWithShift = ConfigDockingWithShift;
        io->ConfigDockingAlwaysTabBar = ConfigDockingAlwaysTabBar;
        io->ConfigDockingTransparentPayload = ConfigDockingTransparentPayload;
    */
    private static native void SetDockingFlagsNATIVE(long addr, boolean ConfigDockingNoSplit, boolean ConfigDockingWithShift, boolean ConfigDockingAlwaysTabBar, boolean ConfigDockingTransparentPayload);

    public void SetFontGlobalScale(float scale) {
        SetFontGlobalScaleNATIVE(native_address, scale);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        io.set_FontGlobalScale(scale);
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        io->FontGlobalScale = scale;
    */
    private static native void SetFontGlobalScaleNATIVE(long addr, float scale);

    public boolean getWantCaptureMouse() {
        return getWantCaptureMouseNATIVE(native_address);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        return io.get_WantCaptureMouse();
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        return io->WantCaptureMouse;
    */
    private static native boolean getWantCaptureMouseNATIVE(long addr);

    //TODO fix replace. generator not yet cast int on multiple methods.

//    /*[-TEAVM;-REPLACE]
//    public void setIniFilename(String fileName) {
//        long cPointer1 = getCPointer();
//        if(fileName == null) {
//            removeIniFilenameNATIVE((int)cPointer1);
//        }else {
//            setIniFilenameNATIVE((int)cPointer1, fileName.getBytes());
//        }
//    }
//    */
//    public void setIniFilename(String fileName) {
//        long cPointer1 = getCPointer();
//        if(fileName == null) {
//            removeIniFilenameNATIVE(cPointer1);
//        }else {
//            setIniFilenameNATIVE(cPointer1, fileName.getBytes());
//        }
//    }
//
//    /*[-TEAVM;-NATIVE]
//        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
//        [MODULE].ImHelper.prototype.setIniFilename(io, fileName);
//    */
//    /*[-JNI;-NATIVE]
//        ImGuiIO* io = (ImGuiIO*)addr;
//        io->IniFilename = fileName.data;
//    */
//    private static native void setIniFilenameNATIVE(long addr, byte[] fileName);
//
//    /*[-TEAVM;-NATIVE]
//        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
//        [MODULE].ImHelper.prototype.removeIniFilename(io);
//    */
//    /*[-JNI;-NATIVE]
//        ImGuiIO* io = (ImGuiIO*)addr;
//        io->IniFilename = NULL;
//    */
//    private static native void removeIniFilenameNATIVE(long addr);

    public boolean containsIniFilename() {
        return containsIniFilenameNATIVE(native_address);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        return [MODULE].ImHelper.prototype.containsIniFilename();
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        return io->IniFilename != NULL;
    */
    private static native boolean containsIniFilenameNATIVE(long addr);

    public void SetFontTexID(long id) {
        SetFontTexIDNATIVE(native_address, id);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        io.get_Fonts().set_TexID(id);
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        io->Fonts->TexID = (ImTextureID)id;
    */
    private static native void SetFontTexIDNATIVE(long addr, long id);

    public void UpdateKeyTyped(int c) {
        updateKeyTyped(native_address, c);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        if (c > 0 && c < 0x10000)
            io.AddInputCharacter(c);
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        if (c > 0 && c < 0x10000)
            io->AddInputCharacter((unsigned short)c);
    */
    private static native void updateKeyTyped(long addr, int c);

    public void AddMousePosEvent(float x, float y) {
        AddMousePosEventNATIVE(native_address, x, y);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        io.AddMousePosEvent(x, y);
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        io->AddMousePosEvent(x, y);
    */
    private static native void AddMousePosEventNATIVE(long addr, float x, float y);

    public void AddMouseButtonEvent(int button, boolean down) {
        AddMouseButtonEventNATIVE(native_address, button, down);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        io.AddMouseButtonEvent(button, down);
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        io->AddMouseButtonEvent(button, down);
    */
    private static native void AddMouseButtonEventNATIVE(long addr, int button, boolean down);

    public void AddMouseWheelEvent(float xOffset, float yOffset) {
        AddMouseWheelEventNATIVE(native_address, xOffset, yOffset);
    }

    /*[-TEAVM;-NATIVE]
        var io = [MODULE].wrapPointer(addr, [MODULE].ImGuiIO);
        io.AddMouseWheelEvent(xOffset, yOffset);
    */
    /*[-JNI;-NATIVE]
        ImGuiIO* io = (ImGuiIO*)addr;
        io->AddMouseWheelEvent(xOffset, yOffset);
    */
    private static native void AddMouseWheelEventNATIVE(long addr, float xOffset, float yOffset);

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
