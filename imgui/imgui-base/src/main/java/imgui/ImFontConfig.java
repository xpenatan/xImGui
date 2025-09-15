package imgui;

import idl.IDLBase;

public class ImFontConfig extends IDLBase {

    public final static ImFontConfig NULL = native_new();

    public static ImFontConfig native_new() {
        return new ImFontConfig((byte) 0, (char) 0);
    }

    private ImFontConfig(byte v, char c) {
    }

    public native float get_SizePixels();
}