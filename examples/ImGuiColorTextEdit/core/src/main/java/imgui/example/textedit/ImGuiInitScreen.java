package imgui.example.textedit;

import com.badlogic.gdx.ScreenAdapter;
import imgui.ImGuiLoader;
import imgui.extension.textedit.TextEditLoader;

public class ImGuiInitScreen extends ScreenAdapter {

    private ImGuiGame game;

    private boolean init = false;

    public ImGuiInitScreen(ImGuiGame game) {
        this.game = game;
    }

    @Override
    public void show() {
        ImGuiLoader.init((imgui_isSuccess, imgui_t) -> {
            if(imgui_t != null) {
                imgui_t.printStackTrace();
                return;
            }
            TextEditLoader.init((isSuccess, t) -> {
                if(t != null) {
                    t.printStackTrace();
                    return;
                }
                init = isSuccess;
            });
        });
    }

    @Override
    public void render(float delta) {
        if(init) {
            init = false;
            game.setScreen(new TextEditExample());
        }
    }
}
