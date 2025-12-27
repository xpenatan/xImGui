package imgui.example.basic.renderer;


import com.github.xpenatan.jparser.idl.helper.IDLFloatArray;
import imgui.ImGui;

public class ColorRenderer implements UIRenderer {

    private final IDLFloatArray color3 = new IDLFloatArray(3);
    private final IDLFloatArray color4 = new IDLFloatArray(4);

    public ColorRenderer() {
    }

    @Override
    public void render() {

        if(ImGui.ColorEdit3("color 01", color3)) {
            float r = color3.getValue(0);
            float g = color3.getValue(1);
            float b = color3.getValue(2);
            System.out.println("Red: " + r + " Green: " + g + " Blue: " + b);
        }

        if(ImGui.ColorEdit4("color 02", color4)) {
            float r = color3.getValue(0);
            float g = color4.getValue(1);
            float b = color4.getValue(2);
            float a = color4.getValue(3);
            System.out.println("Red: " + r + " Green: " + g + " Blue: " + b + " Alpha: " + a);
        }
    }

    @Override
    public String getName() {
        return "Color";
    }
}
