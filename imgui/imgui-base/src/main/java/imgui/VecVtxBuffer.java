package imgui;

import com.github.xpenatan.jParser.idl.IDLBase;
import java.nio.ByteBuffer;

public class VecVtxBuffer extends IDLBase {

    public final static VecVtxBuffer NULL = native_new();

    public static VecVtxBuffer native_new() {
        return new VecVtxBuffer((byte) 0, (char) 0);
    }

    private VecVtxBuffer(byte v, char c) {
    }

    /*[-TEAVM;-REPLACE_BLOCK]
        {
            org.teavm.jso.typedarrays.Int8Array array = org.teavm.jso.typedarrays.Int8Array.fromJavaBuffer(out);
            internal_native_get_ByteBuffer((int)native_address, size, array);
        }
    */
    public void getByteBuffer(int size, ByteBuffer out) {
        internal_native_get_ByteBuffer(native_address, size, out);
    }

    /*[-TEAVM;-REPLACE]
        @org.teavm.jso.JSBody(params = {"this_addr", "size", "bytes_addr"}, script = "" +
            "var jsObj = [MODULE].wrapPointer(this_addr, [MODULE].VecVtxBuffer);" +
            "var data = jsObj.get_Data();" +
            "var dataOut = [MODULE].HEAPU8.subarray(data, data + size);" +
            "bytes_addr.set(dataOut);"
        )
        private static native void internal_native_get_ByteBuffer(int this_addr, int size, org.teavm.jso.JSObject bytes_addr);
    */
    /*[-JNI;-NATIVE]
        VecVtxBuffer* nativeObject = (VecVtxBuffer*)this_addr;
        void* bufferAddress = env->GetDirectBufferAddress(out);
        memcpy(bufferAddress, nativeObject->Data, size);
    */
    public static native void internal_native_get_ByteBuffer(long this_addr, int size, ByteBuffer out);
}
