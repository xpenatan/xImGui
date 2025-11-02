package imgui;

import com.github.xpenatan.jParser.idl.IDLBase;
import idl.helper.IDLByteArray;
import idl.helper.IDLInt;

public class ImFontAtlas extends IDLBase {

    public final static ImFontAtlas NULL = native_new();

    public static ImFontAtlas native_new() {
        return new ImFontAtlas((byte) 0, (char) 0);
    }

    private ImFontAtlas(byte v, char c) {
    }

//    public ImFont AddFontFromMemoryTTF(byte[] fontData, int font_size) {
//        IDLByteArray byteArray = new IDLByteArray(fontData.length);
//        byteArray.copy(fontData);
//        return AddFontFromMemoryTTF(byteArray, byteArray.getSize(), font_size);
//    }
//
//    public void GetTexDataAsRGBA32(IDLByteArray pixelBuffer, IDLInt outWidth, IDLInt outHeight) {
//        GetTexDataAsRGBA32NATIVE(native_address, pixelBuffer.native_address, outWidth.native_void_address, outHeight.native_void_address);
//    }
//
//    public void GetTexDataAsAlpha8(IDLByteArray pixelBuffer, IDLInt outWidth, IDLInt outHeight) {
//        GetTexDataAsAlpha8(native_address, pixelBuffer.native_address, outWidth.native_void_address, outHeight.native_void_address);
//    }
//
//    /*[-TEAVM;-NATIVE]
//        var fontAtlas = [MODULE].wrapPointer(addr, [MODULE].ImFontAtlas);
//        var pixelBufferArray = [MODULE].wrapPointer(pixelBufferAddr, [MODULE].IDLByteArray);
//        [MODULE].ImHelper.prototype.memcpyFont32(fontAtlas, pixelBufferArray, widthAddr, heightAddr);
//    */
//    /*[-JNI;-NATIVE]
//        ImFontAtlas* fontAtlas = (ImFontAtlas*)addr;
//        IDLByteArray* pixelBuffer = (IDLByteArray*)pixelBufferAddr;
//        int* widthPtr = (int*)widthAddr;
//        int* heightPtr = (int*)heightAddr;
//        ImHelper::memcpyFont32(fontAtlas, pixelBuffer, widthPtr, heightPtr);
//    */
//    private static native void GetTexDataAsRGBA32NATIVE(long addr, long pixelBufferAddr, long widthAddr, long heightAddr);
//
//    /*[-TEAVM;-NATIVE]
//        var fontAtlas = [MODULE].wrapPointer(addr, [MODULE].ImFontAtlas);
//        var pixelBufferArray = [MODULE].wrapPointer(pixelBufferAddr, [MODULE].IDLByteArray);
//        [MODULE].ImHelper.prototype.memcpyFont8(fontAtlas, pixelBufferArray, widthAddr, heightAddr);
//    */
//    /*[-JNI;-NATIVE]
//        ImFontAtlas* fontAtlas = (ImFontAtlas*)addr;
//        IDLByteArray* pixelBuffer = (IDLByteArray*)pixelBufferAddr;
//        int* widthPtr = (int*)widthAddr;
//        int* heightPtr = (int*)heightAddr;
//        ImHelper::memcpyFont8(fontAtlas, pixelBuffer, widthPtr, heightPtr);
//    */
//    private static native void GetTexDataAsAlpha8(long addr, long pixelBufferAddr, long widthAddr, long heightAddr);
//
//    public native ImFont AddFontFromMemoryTTF(IDLBase font_data, int font_data_size, int size_pixels);
}