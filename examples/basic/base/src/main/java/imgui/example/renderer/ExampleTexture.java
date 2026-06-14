package imgui.example.renderer;

import io.github.libfdx.graphics.Texture;

public final class ExampleTexture implements AutoCloseable {
    private final Texture texture;
    private final long id;

    ExampleTexture(Texture texture, long id) {
        this.texture = texture;
        this.id = id;
    }

    public long id() {
        return id;
    }

    public int width() {
        return texture.width();
    }

    public int height() {
        return texture.height();
    }

    @Override
    public void close() {
        if (!ImGuiShared.imgui().textures().isDisposed()) {
            ImGuiShared.imgui().textures().remove(id);
        }
        if (!texture.isDisposed()) {
            texture.dispose();
        }
    }
}
