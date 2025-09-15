package imgui;

public class VecCmdBuffer {

    public final static VecCmdBuffer NULL = native_new();

    public static VecCmdBuffer native_new() {
        return new VecCmdBuffer((byte) 0, (char) 0);
    }

    private VecCmdBuffer(byte v, char c) {
    }
}