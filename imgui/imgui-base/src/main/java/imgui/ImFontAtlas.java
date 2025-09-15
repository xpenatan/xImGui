package imgui;

import idl.IDLBase;
import idl.helper.IDLByteArray;
import idl.helper.IDLIntArray;

public class ImFontAtlas extends IDLBase {

    public final static ImFontAtlas NULL = native_new();

    public static ImFontAtlas native_new() {
        return new ImFontAtlas((byte) 0, (char) 0);
    }

    private ImFontAtlas(byte v, char c) {
    }

    public ImFont AddFontFromMemoryTTF(byte[] fontData, int font_size) {
        IDLByteArray byteArray = new IDLByteArray(fontData.length);
        byteArray.copy(fontData);
        return AddFontFromMemoryTTF(byteArray, byteArray.getSize(), font_size);
    }

    public void GetTexDataAsRGBA32(IDLByteArray pixelBuffer, IDLIntArray outWidth, IDLIntArray outHeight) {
        GetTexDataAsRGBA32NATIVE(native_address, pixelBuffer.native_address, outWidth.native_address, outHeight.native_address);
    }

    /*[-TEAVM;-NATIVE]
        var fontAtlas = [MODULE].wrapPointer(addr, [MODULE].ImFontAtlas);
        var pixelBufferArray = [MODULE].wrapPointer(pixelBufferAddr, [MODULE].IDLByteArray);
        var widthIntArray = [MODULE].wrapPointer(widthAddr, [MODULE].IDLIntArray);
        var heightIntArray = [MODULE].wrapPointer(heightAddr, [MODULE].IDLIntArray);
        var widthArr = widthIntArray.getPointer();
        var heightArr = heightIntArray.getPointer();
        [MODULE].ImHelper.prototype.memcpyFont(fontAtlas, pixelBufferArray, widthArr, heightArr);
    */
    /*[-JNI;-NATIVE]
        ImFontAtlas* fontAtlas = (ImFontAtlas*)addr;
        IDLByteArray* pixelBuffer = (IDLByteArray*)pixelBufferAddr;
        IDLIntArray* widthIntArray = (IDLIntArray*)widthAddr;
        IDLIntArray* heightIntArray = (IDLIntArray*)heightAddr;
        int* widthPtr = (int*)widthIntArray->getData();
        int* heightPtr = (int*)heightIntArray->getData();
        ImHelper::memcpyFont(fontAtlas, pixelBuffer, widthPtr, heightPtr);
    */
    private static native void GetTexDataAsRGBA32NATIVE(long addr, long pixelBufferAddr, long widthAddr, long heightAddr);

    public native ImFont AddFontFromMemoryTTF(IDLBase font_data, int font_data_size, int size_pixels);
}