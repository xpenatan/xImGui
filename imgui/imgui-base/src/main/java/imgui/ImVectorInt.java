package imgui;

import com.github.xpenatan.jParser.idl.IDLBase;

public class ImVectorInt extends IDLBase {

    public final static ImVectorInt NULL = native_new();

    public static ImVectorInt native_new() {
        return new ImVectorInt((byte) 0, (char) 0);
    }

    private ImVectorInt(byte v, char c) {
    }

    public int getData(int index) {
        return getDataNATIVE(native_address, index);
    }

    /*[-TEAVM;-NATIVE]
        var jsObj = [MODULE].wrapPointer(this_addr, [MODULE].ImVectorInt);
        return jsObj.getData(index);
    */
    /*[-JNI;-NATIVE]
        ImVectorInt* nativeObject = (ImVectorInt*)this_addr;
        unsigned int value = nativeObject->Data[index];
        return (jint)value;
    */
    private static native int getDataNATIVE(long this_addr, int index);
}