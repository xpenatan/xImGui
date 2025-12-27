package imgui.example.basic.renderer;

import com.badlogic.gdx.Gdx;
import com.github.xpenatan.jparser.idl.helper.IDLFloatArray;
import imgui.ImGui;
import imgui.ImTemp;

public class PlotRenderer implements UIRenderer {

    IDLFloatArray floatArray;
    int values_offset = 0;
    double refresh_time = 0.0;
    int maxScale = 60;

    public PlotRenderer() {
        floatArray = new IDLFloatArray(90);
    }

    public void render() {
        if(refresh_time == 0.0) {
            refresh_time = ImGui.GetTime();
        }
        int size = floatArray.getSize();
        int framesPerSecond = Gdx.graphics.getFramesPerSecond();
        float updateRate = 5f;
        while (refresh_time < ImGui.GetTime()) // Create data at fixed 60 Hz rate for the demo
        {
            floatArray.setValue(values_offset, framesPerSecond);
            values_offset = (values_offset + 1) % size;
            refresh_time += 1.0f / updateRate;
        }
        if(framesPerSecond > maxScale) {
            maxScale = framesPerSecond + 20;
        }

        String overlay = "FPS " + framesPerSecond;
        ImGui.PlotLines("##Lines", floatArray, size, values_offset, overlay, 0.0f, maxScale, ImTemp.ImVec2_1(-1, 80.0f));
    }

    @Override
    public String getName() {
        return "Plotting";
    }
}
