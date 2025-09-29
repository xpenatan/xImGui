package imgui;

import com.github.xpenatan.jParser.idl.IDLBase;

public final class ImDrawData extends IDLBase {

    public final static ImDrawData NULL = native_new();

    public static ImDrawData native_new() {
        return new ImDrawData((byte) 0, (char) 0);
    }

    private ImDrawData(byte b, char c) {
    }
}
