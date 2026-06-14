package io.github.libfdx.imgui.wgpu;

import io.github.libfdx.imgui.FdxImGuiGraphicsRenderer;

final class FdxImGuiWgpuRenderer extends FdxImGuiGraphicsRenderer {
    FdxImGuiWgpuRenderer() {
        super("imgui wgpu");
    }

    @Override
    protected boolean supportsProvider(String providerId) {
        return "wgpu".equals(providerId);
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
