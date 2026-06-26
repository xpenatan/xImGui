package io.github.libfdx.imgui.wgpu;

import io.github.libfdx.core.FdxException;
import io.github.libfdx.graphics.GraphicsContext;
import io.github.libfdx.imgui.FdxImGuiRenderer;

public final class FdxImGuiWgpu {
    private FdxImGuiWgpu() {
    }

    public static FdxImGuiRenderer renderer() {
        return new FdxImGuiWgpuRenderer();
    }

    public static FdxImGuiRenderer renderer(GraphicsContext graphics) {
        if (graphics == null) {
            throw new FdxException("GraphicsContext cannot be null");
        }
        return renderer();
    }
}
