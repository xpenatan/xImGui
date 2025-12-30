package imgui.extension.imlayout;

public class ImLayout {
    public static final int WRAP_PARENT = get_WRAP_PARENT();
    public static final int MATCH_PARENT = get_MATCH_PARENT();
    public static final int MATCH_WRAP_PARENT = get_MATCH_WRAP_PARENT();

    public static native int get_WRAP_PARENT();
    public static native int get_MATCH_PARENT();
    public static native int get_MATCH_WRAP_PARENT();
}