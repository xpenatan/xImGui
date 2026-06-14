package imgui.example.renderer;

import imgui.ImGui;
import imgui.ImTemp;
import imgui.ImTextureRef;
import imgui.enums.ImGuiConfigFlags;
import io.github.libfdx.Fdx;
import io.github.libfdx.core.FdxException;
import io.github.libfdx.graphics.GraphicsContext;
import io.github.libfdx.graphics.Texture;
import io.github.libfdx.graphics.TextureDescriptor;
import io.github.libfdx.imgui.FdxImGui;
import io.github.libfdx.imgui.FdxImGuiRenderer;

import java.nio.ByteBuffer;

public final class ImGuiShared {
    private static Fdx fdx;
    private static FdxImGui imgui;

    private ImGuiShared() {
    }

    public static void initialize(Fdx fdx, FdxImGuiRenderer renderer) {
        if (ImGuiShared.imgui != null) {
            return;
        }
        if (fdx == null) {
            throw new FdxException("Fdx cannot be null");
        }
        ImGuiShared.fdx = fdx;
        ImGuiShared.imgui = FdxImGui.create(fdx, renderer);
        ImGui.GetIO().set_ConfigFlags(ImGuiConfigFlags.DockingEnable);
        ImGui.StyleColorsDark();
    }

    public static Fdx fdx() {
        if (fdx == null) {
            throw new FdxException("Example FDX context has not been initialized");
        }
        return fdx;
    }

    public static FdxImGui imgui() {
        if (imgui == null) {
            throw new FdxException("Example ImGui context has not been initialized");
        }
        return imgui;
    }

    public static void clearScreen(float red, float green, float blue, float alpha) {
        fdx().graphics().main().clear(red, green, blue, alpha);
    }

    public static ExampleTexture createSolidTexture(String label, int width, int height, int red, int green, int blue,
            int alpha) {
        ByteBuffer pixels = ByteBuffer.allocateDirect(width * height * 4);
        for (int i = 0; i < width * height; i++) {
            pixels.put((byte) red);
            pixels.put((byte) green);
            pixels.put((byte) blue);
            pixels.put((byte) alpha);
        }
        pixels.flip();
        return createTexture(label, width, height, pixels);
    }

    public static ExampleTexture createCheckerTexture(String label, int width, int height) {
        ByteBuffer pixels = ByteBuffer.allocateDirect(width * height * 4);
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                boolean bright = ((x / 8) + (y / 8)) % 2 == 0;
                pixels.put((byte) (bright ? 235 : 60));
                pixels.put((byte) (bright ? 190 : 85));
                pixels.put((byte) (bright ? 75 : 145));
                pixels.put((byte) 255);
            }
        }
        pixels.flip();
        return createTexture(label, width, height, pixels);
    }

    public static ExampleTexture createCircleTexture(String label, int width, int height) {
        ByteBuffer pixels = ByteBuffer.allocateDirect(width * height * 4);
        float cx = (width - 1) * 0.5f;
        float cy = (height - 1) * 0.5f;
        float radius = Math.min(width, height) * 0.42f;
        float radius2 = radius * radius;
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                float dx = x - cx;
                float dy = y - cy;
                boolean inside = dx * dx + dy * dy <= radius2;
                pixels.put((byte) (inside ? 115 : 230));
                pixels.put((byte) (inside ? 225 : 120));
                pixels.put((byte) (inside ? 130 : 120));
                pixels.put((byte) 255);
            }
        }
        pixels.flip();
        return createTexture(label, width, height, pixels);
    }

    public static ImTextureRef textureRef(ExampleTexture texture) {
        return ImTemp.ImTextureRef_1(texture.id());
    }

    public static int framesPerSecond() {
        float delta = fdx().app().deltaTime();
        if (delta <= 0.0f || !Float.isFinite(delta)) {
            return 0;
        }
        return Math.round(1.0f / delta);
    }

    public static int rgba(int red, int green, int blue, int alpha) {
        return (alpha & 255) << 24 | (blue & 255) << 16 | (green & 255) << 8 | (red & 255);
    }

    public static void dispose() {
        if (imgui != null && !imgui.isDisposed()) {
            imgui.dispose();
        }
        imgui = null;
        fdx = null;
    }

    private static ExampleTexture createTexture(String label, int width, int height, ByteBuffer pixels) {
        GraphicsContext graphics = fdx().graphics().main();
        Texture texture = graphics.device().createTexture(TextureDescriptor.rgba8(label, width, height));
        graphics.device().writeTexture(texture, pixels);
        long id = imgui().textures().register(texture);
        return new ExampleTexture(texture, id);
    }
}
