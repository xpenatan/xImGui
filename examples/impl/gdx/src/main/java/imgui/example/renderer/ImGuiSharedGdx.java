package imgui.example.renderer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import imgui.ImGuiImpl;
import imgui.gdx.ImGuiGdxImpl;
import imgui.gdx.ImGuiGdxInputMultiplexer;

public class ImGuiSharedGdx implements ImGuiShared.ImGuiSharedInstance {
    @Override
    public void clearScreen(float red, float green, float blue, float alpha) {
        Gdx.gl.glClearColor(0.3f, 0.3f, 0.3f, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
    }

    @Override
    public ImGuiImpl createImpl() {
        return new ImGuiGdxImpl();
    }

    @Override
    public InputMultiplexer createInput() {
        return new ImGuiGdxInputMultiplexer();
    }

    @Override
    public Texture createTexture(FileHandle fileHandler) {
        return new Texture(fileHandler);
    }
}
