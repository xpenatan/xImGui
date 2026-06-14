package io.github.libfdx.imgui.gl;

import io.github.libfdx.core.FdxException;
import io.github.libfdx.graphics.GraphicsContext;
import io.github.libfdx.imgui.FdxImGuiRenderer;

public final class FdxImGuiGl {
    private FdxImGuiGl() {
    }

    public static FdxImGuiRenderer renderer() {
        return new FdxImGuiGlRenderer();
    }

    public static FdxImGuiRenderer renderer(GraphicsContext graphics) {
        if (graphics == null) {
            throw new FdxException("GraphicsContext cannot be null");
        }
        return renderer();
    }
}
