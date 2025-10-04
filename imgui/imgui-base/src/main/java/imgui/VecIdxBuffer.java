package imgui;

import com.github.xpenatan.jParser.idl.IDLBase;
import java.nio.ByteBuffer;

public class VecIdxBuffer extends IDLBase {

    public final static VecIdxBuffer NULL = native_new();

    public static VecIdxBuffer native_new() {
        return new VecIdxBuffer((byte) 0, (char) 0);
    }

    private VecIdxBuffer(byte v, char c) {
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
            "var jsObj = [MODULE].wrapPointer(this_addr, [MODULE].VecIdxBuffer);" +
            "var data = jsObj.get_Data();" +
            "var dataOut = [MODULE].HEAPU8.subarray(data, data + size);" +
            "bytes_addr.set(dataOut);"
        )
        private static native void internal_native_get_ByteBuffer(int this_addr, int size, org.teavm.jso.JSObject bytes_addr);
    */
    /*[-JNI;-NATIVE]
        VecIdxBuffer* nativeObject = (VecIdxBuffer*)this_addr;
        void* bufferAddress = env->GetDirectBufferAddress(out);
        memcpy(bufferAddress, nativeObject->Data, size);
    */
    public static native void internal_native_get_ByteBuffer(long this_addr, int size, ByteBuffer out);
}
