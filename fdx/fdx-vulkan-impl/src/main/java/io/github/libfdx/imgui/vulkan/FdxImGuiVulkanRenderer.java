package io.github.libfdx.imgui.vulkan;

import io.github.libfdx.imgui.FdxImGuiGraphicsRenderer;

final class FdxImGuiVulkanRenderer extends FdxImGuiGraphicsRenderer {
    FdxImGuiVulkanRenderer() {
        super("imgui vulkan");
    }

    @Override
    protected boolean supportsProvider(String providerId) {
        return "vulkan".equals(providerId);
    }

    @Override
    protected boolean supportsBaseVertex(String providerId) {
        return true;
    }

    @Override
    protected boolean scissorOriginBottomLeft(String providerId) {
        return false;
    }
}
