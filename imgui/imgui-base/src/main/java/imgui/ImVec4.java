package imgui;

import com.github.xpenatan.jParser.idl.IDLBase;

public class ImVec4 extends IDLBase {

    public final static ImVec4 NULL = native_new();

    public static ImVec4 TMP_INTERNAL_1 = new ImVec4();

    public static ImVec4 native_new() {
        return new ImVec4((byte) 0, (char) 0);
    }

    private ImVec4(byte v, char c) {
    }

    public ImVec4() {
    }

    public native float get_x();
    public native float get_y();
    public native float get_z();
    public native float get_w();
    public native void set_x(float x);
    public native void set_y(float y);
    public native void set_z(float z);
    public native void set_w(float w);

    public ImVec4 set(float x, float y, float z, float w) {
        set_x(x);
        set_y(y);
        set_z(z);
        set_w(w);
        return this;
    }

    public ImVec4 set(ImVec4 vec) {
        float x = vec.get_x();
        float y = vec.get_y();
        float z = vec.get_z();
        float w = vec.get_w();
        set_x(x);
        set_y(y);
        set_z(z);
        set_w(w);
        return this;
    }
}
