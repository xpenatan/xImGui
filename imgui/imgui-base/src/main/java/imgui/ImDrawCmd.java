package imgui;

import idl.IDLBase;

public class ImDrawCmd extends IDLBase {

    /*[-JNI;-NATIVE]
        #if defined(_MSC_VER) && _MSC_VER <= 1500 // MSVC 2008 or earlier
        #include <stddef.h>     // intptr_t
        #else
        #include <stdint.h>     // intptr_t
        #endif
    */


    public final static ImDrawCmd NULL = native_new();

    public static ImDrawCmd native_new() {
        return new ImDrawCmd((byte) 0, (char) 0);
    }

    private ImDrawCmd(byte v, char c) {
    }

    public long getTextureId() {
        return getTextureIdNATIVE(native_address);
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawCmd);
        var textureId = [MODULE].ImHelper.prototype.getTextureId(nativeObject);
        return textureId;
    */
    /*[-JNI;-NATIVE]
        ImDrawCmd* nativeObject = (ImDrawCmd*)addr;
        jlong textureId = ImHelper::getTextureId(nativeObject);
        return textureId;
    */
    private static native long getTextureIdNATIVE(long addr);

    public int getIdxOffset() {
        return getIdxOffsetNATIVE(native_address);
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawCmd);
        var jsObj = nativeObject.get_IdxOffset();
        return jsObj;
    */
    /*[-JNI;-NATIVE]
        ImDrawCmd* nativeObject = (ImDrawCmd*)addr;
        return nativeObject->IdxOffset;
    */
    private static native int getIdxOffsetNATIVE(long addr);

    public int getVtxOffset() {
        return getVtxOffsetNATIVE(native_address);
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawCmd);
        var jsObj = nativeObject.get_VtxOffset();
        return jsObj;
    */
    /*[-JNI;-NATIVE]
        ImDrawCmd* nativeObject = (ImDrawCmd*)addr;
        return nativeObject->VtxOffset;
    */
    private static native int getVtxOffsetNATIVE(long addr);

    public int getElemCount() {
        return getElemCountNATIVE(native_address);
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawCmd);
        var jsObj = nativeObject.get_ElemCount();
        return jsObj;
    */
    /*[-JNI;-NATIVE]
        ImDrawCmd* nativeObject = (ImDrawCmd*)addr;
        return nativeObject->ElemCount;
    */
    private static native int getElemCountNATIVE(long addr);
}
