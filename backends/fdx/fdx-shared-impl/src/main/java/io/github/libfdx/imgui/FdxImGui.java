package io.github.libfdx.imgui;

import imgui.ImGui;
import imgui.ImGuiContext;
import imgui.ImGuiIO;
import imgui.ImVec2;
import io.github.libfdx.Fdx;
import io.github.libfdx.core.FdxException;
import io.github.libfdx.display.Display;
import io.github.libfdx.graphics.GraphicsContext;
import io.github.libfdx.input.Input;

public final class FdxImGui implements io.github.libfdx.core.Disposable {
    private final Fdx fdx;
    private final Display display;
    private final Input input;
    private final GraphicsContext graphics;
    private final FdxImGuiRenderer renderer;
    private final FdxImGuiTextureRegistry textures;
    private final FdxImGuiInputBridge inputBridge;
    private final FdxImGuiRendererContext rendererContext;
    private final ImGuiContext context;
    private boolean frameBegun;
    private boolean disposed;

    public static FdxImGui create(Fdx fdx, FdxImGuiRenderer renderer) {
        if (fdx == null) {
            throw new FdxException("Fdx cannot be null");
        }
        return new FdxImGui(fdx, fdx.displays().main(), fdx.input(), fdx.graphics().main(), renderer);
    }

    public FdxImGui(Fdx fdx, Display display, Input input, GraphicsContext graphics, FdxImGuiRenderer renderer) {
        if (fdx == null) {
            throw new FdxException("Fdx cannot be null");
        }
        if (display == null) {
            throw new FdxException("Display cannot be null");
        }
        if (input == null) {
            throw new FdxException("Input cannot be null");
        }
        if (graphics == null) {
            throw new FdxException("GraphicsContext cannot be null");
        }
        if (renderer == null) {
            throw new FdxException("FdxImGuiRenderer cannot be null");
        }
        this.fdx = fdx;
        this.display = display;
        this.input = input;
        this.graphics = graphics;
        this.renderer = renderer;
        ImGui.CreateContext();
        context = ImGui.GetCurrentContext();
        if (context == null || context.native_isNULL()) {
            throw new FdxException("Could not create ImGui context");
        }
        ImGui.SetCurrentContext(context);
        ImGui.StyleColorsDark();
        textures = new FdxImGuiTextureRegistry();
        rendererContext = new FdxImGuiRendererContext(fdx, display, input, graphics, textures);
        renderer.initialize(rendererContext);
        inputBridge = new FdxImGuiInputBridge(context);
        input.addProcessor(inputBridge);
    }

    public ImGuiContext context() {
        return context;
    }

    public FdxImGuiTextureRegistry textures() {
        return textures;
    }

    public FdxImGuiRenderer renderer() {
        return renderer;
    }

    public void beginFrame() {
        ensureNotDisposed();
        if (frameBegun) {
            throw new FdxException("ImGui frame has already begun");
        }
        ImGui.SetCurrentContext(context);
        ImGuiIO io = ImGui.GetIO();
        int width = display.width();
        int height = display.height();
        int framebufferWidth = display.framebufferWidth();
        int framebufferHeight = display.framebufferHeight();
        ImVec2 displaySize = io.get_DisplaySize();
        displaySize.set_x(width);
        displaySize.set_y(height);
        ImVec2 displayScale = io.get_DisplayFramebufferScale();
        displayScale.set_x(width > 0 ? framebufferWidth / (float) width : 1.0f);
        displayScale.set_y(height > 0 ? framebufferHeight / (float) height : 1.0f);
        float deltaTime = fdx.app().deltaTime();
        io.set_DeltaTime(deltaTime > 0.0f && Float.isFinite(deltaTime) ? deltaTime : 1.0f / 60.0f);
        io.AddMousePosEvent(input.pointerX(), input.pointerY());
        ImGui.NewFrame();
        frameBegun = true;
    }

    public void render() {
        ensureNotDisposed();
        if (!frameBegun) {
            throw new FdxException("FdxImGui.beginFrame() must be called before render()");
        }
        ImGui.SetCurrentContext(context);
        ImGui.Render();
        renderer.render(ImGui.GetDrawData());
        frameBegun = false;
    }

    public void endFrame() {
        render();
    }

    @Override
    public void dispose() {
        if (disposed) {
            return;
        }
        disposed = true;
        input.removeProcessor(inputBridge);
        ImGui.SetCurrentContext(context);
        if (!renderer.isDisposed()) {
            renderer.dispose();
        }
        textures.disposeOwned();
        ImGui.DestroyContext(context);
        frameBegun = false;
    }

    @Override
    public boolean isDisposed() {
        return disposed;
    }

    private void ensureNotDisposed() {
        if (disposed) {
            throw new FdxException("FdxImGui has been disposed");
        }
    }
}
