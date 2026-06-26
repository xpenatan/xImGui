package io.github.libfdx.imgui.vulkan;

import io.github.libfdx.core.FdxException;
import io.github.libfdx.graphics.GraphicsContext;
import io.github.libfdx.imgui.FdxImGuiRenderer;

public final class FdxImGuiVulkan {
    private FdxImGuiVulkan() {
    }

    public static FdxImGuiRenderer renderer() {
        return new FdxImGuiVulkanRenderer();
    }

    public static FdxImGuiRenderer renderer(GraphicsContext graphics) {
        if (graphics == null) {
            throw new FdxException("GraphicsContext cannot be null");
        }
        return renderer();
    }
}
