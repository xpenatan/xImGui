package imgui.example.basic;

import com.badlogic.gdx.Gdx;
import com.github.xpenatan.gdx.backends.teavm.TeaApplication;
import com.github.xpenatan.gdx.backends.teavm.TeaApplicationConfiguration;
import com.github.xpenatan.gdx.backends.teavm.TeaFiles;
import imgui.example.renderer.ImGuiShared;
import imgui.example.renderer.ImGuiSharedGdx;

public class Launcher {

    public static void main(String[] args) {
        TeaApplicationConfiguration config = new TeaApplicationConfiguration("canvas");
        config.useDebugGL = false;
        config.width = 0;
        config.height = 0;
        config.useGL30 = false;
        ImGuiShared.instance = new ImGuiSharedGdx();
        new TeaApplication(new ImGuiGame() {
            @Override
            public void create() {
                TeaFiles files = (TeaFiles)Gdx.files;
//                files.localStorage.debug = true;
//                files.localStorage.printAllFiles();
                super.create();
            }
        }, config);
    }
}
