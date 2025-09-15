package imgui;

import idl.IDLBase;
import idl.helper.IDLByteArray;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class ImDrawList extends IDLBase {

    /*[-JNI;-NATIVE]
        static int DRAWLIST_TYPE_DEFAULT = 0;
        static int DRAWLIST_TYPE_BACKGROUND = 1;
        static int DRAWLIST_TYPE_FOREGROUND = 2;

        ImDrawList * getDrawList(int type) {
            ImDrawList* drawList = NULL;
            if(type == DRAWLIST_TYPE_DEFAULT)
                drawList = ImGui::GetWindowDrawList();
            else if(type == DRAWLIST_TYPE_BACKGROUND)
                drawList = ImGui::GetBackgroundDrawList();
            else if(type == DRAWLIST_TYPE_FOREGROUND)
                drawList = ImGui::GetForegroundDrawList();
            return drawList;
        }
    */

    public final static int VTX_BUFFER_SIZE = 8+8+4;// = ImVec2 + ImVec2 + ImU32;
    public final static int IDX_BUFFER_SIZE = 2; // short
    public final static int cmdBufferSize = (1 + 4 + 1) * 4; // = ImVec4 + ImTextureID + int + int + int
    private static final int RESIZE_FACTOR = 5_000;

    public final static int TYPE_DEFAULT = 0;
    public final static int TYPE_BACKGROUND = 1;
    public final static int TYPE_FOREGROUND = 2;

    private int type = TYPE_DEFAULT;

    public final static ImDrawList NULL = native_new();

    IDLByteArray vtxBuffer;
    IDLByteArray idxBuffer;

    public ByteBuffer vtxByteBuffer;
    public ByteBuffer idxByteBuffer;

    private ImDrawCmd imDrawCmd = ImDrawCmd.native_new();

    public static ImDrawList native_new() {
        return new ImDrawList((byte) 0, (char) 0);
    }

    private ImDrawList(byte v, char c) {
    }

    public ImDrawList(int type) {
        this.type = type;
    }

    public int getFlags() {
        return getFlagsNATIVE(native_address);
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawList);
        return nativeObject.get_Flags();
    */
    /*[-JNI;-NATIVE]
        ImDrawList* nativeObject = (ImDrawList*)addr;
        return nativeObject->Flags;
    */
    private static native int getFlagsNATIVE(long addr);

    public ImDrawCmd getCmdBuffer(int index) {
        long pointer = getCmdBufferNATIVE(native_address, index);
        imDrawCmd.internal_reset(pointer, false);
        return imDrawCmd;
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawList);
        var cmdBuffer = nativeObject.get_CmdBuffer();
        var drawCmd = cmdBuffer.getData(index);
        return [MODULE].getPointer(drawCmd);
    */
    /*[-JNI;-NATIVE]
        ImDrawList* nativeObject = (ImDrawList*)addr;
        return (jlong)&nativeObject->CmdBuffer.Data[index];
    */
    private static native long getCmdBufferNATIVE(long addr, int index);

    public int getCmdBufferSize() {
        return getCmdBufferSizeNATIVE(native_address);
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawList);
        return nativeObject.CmdBuffer.size();
    */
    /*[-JNI;-NATIVE]
        ImDrawList* nativeObject = (ImDrawList*)addr;
        return nativeObject->CmdBuffer.size();
    */
    private static native int getCmdBufferSizeNATIVE(long addr);

    public ByteBuffer getIdxBufferData() {
        int idxBufferSize = getIdxBufferSizeNATIVE(native_address);
        int idxBufferCapacity = idxBufferSize * IDX_BUFFER_SIZE;
        if (idxByteBuffer == null || idxByteBuffer.capacity() < idxBufferCapacity) {
            if(idxByteBuffer != null) {
                idxByteBuffer.clear();
            }
            if(idxBuffer != null) {
                idxBuffer.dispose();
            }
            idxBuffer = new IDLByteArray(idxBufferCapacity + RESIZE_FACTOR);
            idxByteBuffer = ByteBuffer.allocateDirect(idxBufferCapacity + RESIZE_FACTOR).order(ByteOrder.nativeOrder());
        }
        getIdxBufferDataNATIVE(native_address, idxBuffer.native_address, idxBufferCapacity);
        idxByteBuffer.position(0);
        idxByteBuffer.limit(idxBufferCapacity);
        for(int i = 0; i < idxBufferCapacity; i++) {
            idxByteBuffer.put(i, idxBuffer.getValue(i));
        }
        idxByteBuffer.position(0);
        idxByteBuffer.limit(idxBufferCapacity);
        return idxByteBuffer;
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawList);
        var charArray = [MODULE].wrapPointer(bufferAddr, [MODULE].IDLByteArray);
        var charArrayPtr = charArray.getPointer();
        [MODULE].ImHelper.prototype.memcpyIdx(charArrayPtr, nativeObject, bufferCapacity);
    */
    /*[-JNI;-NATIVE]
        ImDrawList* nativeObject = (ImDrawList*)addr;
        IDLByteArray* charArray = (IDLByteArray*)bufferAddr;
        ImHelper::memcpyIdx(charArray->getPointer(), nativeObject, bufferCapacity);
    */
    private static native void getIdxBufferDataNATIVE(long addr, long bufferAddr, int bufferCapacity);

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawList);
        return nativeObject.IdxBuffer.size();
    */
    /*[-JNI;-NATIVE]
        ImDrawList* nativeObject = (ImDrawList*)addr;
        return nativeObject->IdxBuffer.size();
    */
    private static native int getIdxBufferSizeNATIVE(long addr);

    public ByteBuffer getVtxBufferData() {
        int vtxBufferSize = getVtxBufferSizeNATIVE(native_address);
        int vtxBufferCapacity = vtxBufferSize * VTX_BUFFER_SIZE;
        if (vtxByteBuffer == null || vtxByteBuffer.capacity() < vtxBufferCapacity) {
            if(vtxByteBuffer != null) {
                vtxByteBuffer.clear();
            }
            if(vtxBuffer != null) {
                vtxBuffer.dispose();
            }
            vtxBuffer = new IDLByteArray(vtxBufferCapacity + RESIZE_FACTOR);
            vtxByteBuffer = ByteBuffer.allocateDirect(vtxBufferCapacity + RESIZE_FACTOR).order(ByteOrder.nativeOrder());
        }
        // TODO find a better way to get native byte buffer for c++ and teavm
        getVtxBufferDataNATIVE(native_address, vtxBuffer.native_address, vtxBufferCapacity);
        vtxByteBuffer.position(0);
        vtxByteBuffer.limit(vtxBufferCapacity);
        for(int i = 0; i < vtxBufferCapacity; i++) {
            vtxByteBuffer.put(i, vtxBuffer.getValue(i));
        }
        vtxByteBuffer.position(0);
        vtxByteBuffer.limit(vtxBufferCapacity);
        return vtxByteBuffer;
    }

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawList);
        var charArray = [MODULE].wrapPointer(bufferAddr, [MODULE].IDLByteArray);
        var charArrayPtr = charArray.getPointer();
        [MODULE].ImHelper.prototype.memcpyVtx(charArrayPtr, nativeObject, bufferCapacity);
    */
    /*[-JNI;-NATIVE]
        ImDrawList* nativeObject = (ImDrawList*)addr;
        IDLByteArray* charArray = (IDLByteArray*)bufferAddr;
        ImHelper::memcpyVtx(charArray->getPointer(), nativeObject, bufferCapacity);
    */
    private static native void getVtxBufferDataNATIVE(long addr, long bufferAddr, int bufferCapacity);

    /*[-TEAVM;-NATIVE]
        var nativeObject = [MODULE].wrapPointer(addr, [MODULE].ImDrawList);
        return nativeObject.VtxBuffer.size();
    */
    /*[-JNI;-NATIVE]
        ImDrawList* nativeObject = (ImDrawList*)addr;
        return nativeObject->VtxBuffer.size();
    */
    private static native int getVtxBufferSizeNATIVE(long addr);

}