package imgui;

public class ImRect {

    public final static ImRect NULL = native_new();
    public static ImRect TMP_1 = new ImRect();
    public static ImRect TMP_2 = new ImRect();
    public static ImRect TMP_3 = new ImRect();
    public static ImRect TMP_4 = new ImRect();

    public native void set_Min(ImVec2 min);
    public native void set_Max(ImVec2 max);

    public static ImRect native_new() {
        return new ImRect((byte) 0, (char) 0);
    }

    private ImRect(byte v, char c) {
    }

    public ImRect() {
    }

    public ImRect set(float x1, float y1, float x2, float y2) {
        set_Min(ImVec2.TMP_2.set(x1, y1));
        set_Max(ImVec2.TMP_2.set(x2, y2));
        return this;
    }

    public ImRect set(ImVec2 min, ImVec2 max) {
        set_Min(min);
        set_Max(max);
        return this;
    }
}
