package io.github.libfdx.imgui.gl;

import io.github.libfdx.imgui.FdxImGuiGraphicsRenderer;

final class FdxImGuiGlRenderer extends FdxImGuiGraphicsRenderer {
    FdxImGuiGlRenderer() {
        super("imgui gl");
    }

    @Override
    protected boolean supportsProvider(String providerId) {
        return "gl".equals(providerId) || "gles".equals(providerId) || "webgl".equals(providerId);
    }

    @Override
    protected boolean supportsBaseVertex(String providerId) {
        return "gl".equals(providerId);
    }

    @Override
    protected boolean scissorOriginBottomLeft(String providerId) {
        return true;
    }
}
