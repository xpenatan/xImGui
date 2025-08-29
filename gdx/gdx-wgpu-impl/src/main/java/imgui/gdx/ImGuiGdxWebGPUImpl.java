package imgui.gdx;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.utils.BufferUtils;
import com.github.xpenatan.webgpu.WGPUAddressMode;
import com.github.xpenatan.webgpu.WGPUBindGroup;
import com.github.xpenatan.webgpu.WGPUBindGroupDescriptor;
import com.github.xpenatan.webgpu.WGPUBindGroupEntry;
import com.github.xpenatan.webgpu.WGPUBindGroupLayout;
import com.github.xpenatan.webgpu.WGPUBindGroupLayoutDescriptor;
import com.github.xpenatan.webgpu.WGPUBindGroupLayoutEntry;
import com.github.xpenatan.webgpu.WGPUBlendFactor;
import com.github.xpenatan.webgpu.WGPUBlendOperation;
import com.github.xpenatan.webgpu.WGPUBlendState;
import com.github.xpenatan.webgpu.WGPUBuffer;
import com.github.xpenatan.webgpu.WGPUBufferBindingType;
import com.github.xpenatan.webgpu.WGPUBufferDescriptor;
import com.github.xpenatan.webgpu.WGPUBufferUsage;
import com.github.xpenatan.webgpu.WGPUChainedStruct;
import com.github.xpenatan.webgpu.WGPUColorTargetState;
import com.github.xpenatan.webgpu.WGPUCommandEncoder;
import com.github.xpenatan.webgpu.WGPUDevice;
import com.github.xpenatan.webgpu.WGPUExtent3D;
import com.github.xpenatan.webgpu.WGPUFilterMode;
import com.github.xpenatan.webgpu.WGPUFragmentState;
import com.github.xpenatan.webgpu.WGPUIndexFormat;
import com.github.xpenatan.webgpu.WGPULoadOp;
import com.github.xpenatan.webgpu.WGPUPipelineLayout;
import com.github.xpenatan.webgpu.WGPUPipelineLayoutDescriptor;
import com.github.xpenatan.webgpu.WGPUPrimitiveTopology;
import com.github.xpenatan.webgpu.WGPURenderPassColorAttachment;
import com.github.xpenatan.webgpu.WGPURenderPassDescriptor;
import com.github.xpenatan.webgpu.WGPURenderPassEncoder;
import com.github.xpenatan.webgpu.WGPURenderPipeline;
import com.github.xpenatan.webgpu.WGPURenderPipelineDescriptor;
import com.github.xpenatan.webgpu.WGPUSType;
import com.github.xpenatan.webgpu.WGPUSampler;
import com.github.xpenatan.webgpu.WGPUSamplerBindingType;
import com.github.xpenatan.webgpu.WGPUSamplerDescriptor;
import com.github.xpenatan.webgpu.WGPUShaderModule;
import com.github.xpenatan.webgpu.WGPUShaderModuleDescriptor;
import com.github.xpenatan.webgpu.WGPUShaderSourceWGSL;
import com.github.xpenatan.webgpu.WGPUShaderStage;
import com.github.xpenatan.webgpu.WGPUStoreOp;
import com.github.xpenatan.webgpu.WGPUTexelCopyBufferLayout;
import com.github.xpenatan.webgpu.WGPUTexelCopyTextureInfo;
import com.github.xpenatan.webgpu.WGPUTexture;
import com.github.xpenatan.webgpu.WGPUTextureDescriptor;
import com.github.xpenatan.webgpu.WGPUTextureDimension;
import com.github.xpenatan.webgpu.WGPUTextureFormat;
import com.github.xpenatan.webgpu.WGPUTextureSampleType;
import com.github.xpenatan.webgpu.WGPUTextureUsage;
import com.github.xpenatan.webgpu.WGPUTextureView;
import com.github.xpenatan.webgpu.WGPUTextureViewDescriptor;
import com.github.xpenatan.webgpu.WGPUTextureViewDimension;
import com.github.xpenatan.webgpu.WGPUVectorBindGroupEntry;
import com.github.xpenatan.webgpu.WGPUVectorBindGroupLayout;
import com.github.xpenatan.webgpu.WGPUVectorBindGroupLayoutEntry;
import com.github.xpenatan.webgpu.WGPUVectorColorTargetState;
import com.github.xpenatan.webgpu.WGPUVectorInt;
import com.github.xpenatan.webgpu.WGPUVectorRenderPassColorAttachment;
import com.github.xpenatan.webgpu.WGPUVectorVertexAttribute;
import com.github.xpenatan.webgpu.WGPUVectorVertexBufferLayout;
import com.github.xpenatan.webgpu.WGPUVertexAttribute;
import com.github.xpenatan.webgpu.WGPUVertexBufferLayout;
import com.github.xpenatan.webgpu.WGPUVertexFormat;
import com.github.xpenatan.webgpu.WGPUVertexState;
import com.monstrous.gdx.webgpu.application.WebGPUContext;
import com.monstrous.gdx.webgpu.application.WgGraphics;
import imgui.ImDrawCmd;
import imgui.ImDrawData;
import imgui.ImDrawList;
import imgui.ImFontAtlas;
import imgui.ImGui;
import imgui.ImGuiIO;
import imgui.ImGuiImpl;
import imgui.ImVec4;
import imgui.idl.helper.IDLByteArray;
import imgui.idl.helper.IDLIntArray;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;

public class ImGuiGdxWebGPUImpl implements ImGuiImpl {

    private WGPUDevice device;
    private WGPURenderPassEncoder renderPass;
    private WGPUTextureFormat renderFormat;
    private WGPURenderPipeline pipeline;
    private WGPUShaderModule shaderModule;
    private WGPUPipelineLayout pipelineLayout;
    private WGPUBindGroupLayout uniformBindGroupLayout;
    private WGPUBindGroupLayout textureBindGroupLayout;
    private WGPUSampler sampler;
    private WGPUBuffer uniformBuffer;
    private WGPUBindGroup uniformBindGroup;
    private WGPUTexture fontTexture;
    private WGPUTextureView fontTextureView;
    private WGPUBindGroup fontBindGroup;
    private WGPUBuffer vertexBuffer;
    private WGPUBuffer indexBuffer;
    private int vertexBufferSize = 0;
    private int indexBufferSize = 0;

    private boolean init = true;

    public ImGuiGdxWebGPUImpl() {
        WgGraphics gfx = (WgGraphics) Gdx.graphics;
        WebGPUContext webgpu = gfx.getContext();
        this.device = webgpu.device;
        this.renderFormat = webgpu.surfaceFormat;
    }

    public ImGuiGdxWebGPUImpl(WGPUDevice device, WGPUTextureFormat renderFormat) {
        this.device = device;
        this.renderFormat = renderFormat;
    }

    @Override
    public void newFrame() {
        if (init) {
            init = false;
            createDeviceObjects();
            createFontsTexture();
        }

        float deltaTime = Gdx.graphics.getDeltaTime();
        int width = Gdx.graphics.getWidth();
        int height = Gdx.graphics.getHeight();
        int backBufferWidth = Gdx.graphics.getBackBufferWidth();
        int backBufferHeight = Gdx.graphics.getBackBufferHeight();
        ImGui.UpdateDisplayAndInputAndFrame(deltaTime, width, height, backBufferWidth, backBufferHeight);
    }

    @Override
    public void render(ImDrawData drawData) {
        WgGraphics gfx = (WgGraphics) Gdx.graphics;
        WebGPUContext webgpu = gfx.getContext();
//        render(drawData, webgpu.encoder, webgpu.targetView);
    }

    private void createDeviceObjects() {
        String wgslCode =
                "struct VertexIn {\n" +
                        "    @location(0) pos: vec2<f32>,\n" +
                        "    @location(1) uv: vec2<f32>,\n" +
                        "    @location(2) col: vec4<f32>,\n" +
                        "};\n" +
                        "\n" +
                        "struct VertexOut {\n" +
                        "    @builtin(position) pos: vec4<f32>,\n" +
                        "    @location(0) color: vec4<f32>,\n" +
                        "    @location(1) uv: vec2<f32>,\n" +
                        "};\n" +
                        "\n" +
                        "struct Uniforms {\n" +
                        "    ProjMtx: mat4x4<f32>,\n" +
                        "};\n" +
                        "\n" +
                        "@group(0) @binding(0) var<uniform> uniforms: Uniforms;\n" +
                        "\n" +
                        "@vertex\n" +
                        "fn vs_main(in: VertexIn) -> VertexOut {\n" +
                        "    var out: VertexOut;\n" +
                        "    out.pos = uniforms.ProjMtx * vec4<f32>(in.pos, 0.0, 1.0);\n" +
                        "    out.color = in.col;\n" +
                        "    out.uv = in.uv;\n" +
                        "    return out;\n" +
                        "}\n" +
                        "\n" +
                        "@group(1) @binding(0) var tex: texture_2d<f32>;\n" +
                        "@group(1) @binding(1) var samp: sampler;\n" +
                        "\n" +
                        "@fragment\n" +
                        "fn fs_main(in: VertexOut) -> @location(0) vec4<f32> {\n" +
                        "    return in.color * textureSample(tex, samp, in.uv);\n" +
                        "}\n";

        renderPass = new WGPURenderPassEncoder();
        WGPUShaderModuleDescriptor shaderDesc = WGPUShaderModuleDescriptor.obtain();
        WGPUShaderSourceWGSL wgslDesc = WGPUShaderSourceWGSL.obtain();
        wgslDesc.getChain().setNext(WGPUChainedStruct.NULL);
        wgslDesc.getChain().setSType(WGPUSType.ShaderSourceWGSL);
        wgslDesc.setCode(wgslCode);
        shaderDesc.setNextInChain(wgslDesc.getChain());

        shaderModule = new WGPUShaderModule();
        device.createShaderModule(shaderDesc, shaderModule);

        // Bind group layouts
        uniformBindGroupLayout = createBindGroupLayout(true); // For uniforms
        textureBindGroupLayout = createBindGroupLayout(false); // For texture/sampler

        // Pipeline layout
        WGPUPipelineLayoutDescriptor layoutDesc = WGPUPipelineLayoutDescriptor.obtain();

        WGPUVectorBindGroupLayout array = WGPUVectorBindGroupLayout.obtain();
        array.push_back(uniformBindGroupLayout);
        array.push_back(textureBindGroupLayout);
        layoutDesc.setBindGroupLayouts(array);
        pipelineLayout = new WGPUPipelineLayout();
        device.createPipelineLayout(layoutDesc, pipelineLayout);

        // Vertex layout
        WGPUVectorVertexAttribute attributes = WGPUVectorVertexAttribute.obtain();
        WGPUVertexAttribute attr01 = WGPUVertexAttribute.obtain();
        attr01.setFormat(WGPUVertexFormat.Float32x2);
        attr01.setOffset(0);
        attr01.setShaderLocation(0);
        attributes.push_back(attr01);

        WGPUVertexAttribute attr02 = WGPUVertexAttribute.obtain();
        attr02.setFormat(WGPUVertexFormat.Float32x2);
        attr02.setOffset(8);
        attr02.setShaderLocation(1);
        attributes.push_back(attr02);

        WGPUVertexAttribute attr03 = WGPUVertexAttribute.obtain();
        attr03.setFormat(WGPUVertexFormat.Unorm8x4);
        attr03.setOffset(16);
        attr03.setShaderLocation(2);
        attributes.push_back(attr03);

        WGPUVertexBufferLayout vertexLayout = WGPUVertexBufferLayout.obtain();
        vertexLayout.setArrayStride(20);
        vertexLayout.setAttributes(attributes);

        WGPURenderPipelineDescriptor pipelineDesc = WGPURenderPipelineDescriptor.obtain();

        // Vertex state
        WGPUVertexState vertexState = pipelineDesc.getVertex();
        vertexState.setModule(shaderModule);
        vertexState.setEntryPoint("vs_main");

        WGPUVectorVertexBufferLayout vertextBufferArray = WGPUVectorVertexBufferLayout.obtain();
        vertextBufferArray.push_back(vertexLayout);
        vertexState.setBuffers(vertextBufferArray);

        // Fragment state
        WGPUFragmentState fragmentState = WGPUFragmentState.obtain();
        fragmentState.setModule(shaderModule);
        fragmentState.setEntryPoint("fs_main");
        WGPUColorTargetState targetState = WGPUColorTargetState.obtain();
        targetState.setFormat(renderFormat);
        targetState.setBlend(createBlendState());
        WGPUVectorColorTargetState targets = WGPUVectorColorTargetState.obtain();
        targets.push_back(targetState);
        fragmentState.setTargets(targets);

        // Render pipeline descriptor
        pipelineDesc.setLayout(pipelineLayout);
        pipelineDesc.setFragment(fragmentState);
        pipelineDesc.getPrimitive().setTopology(WGPUPrimitiveTopology.TriangleList);
        pipelineDesc.getMultisample().setCount(1);
        pipeline = new WGPURenderPipeline();
        device.createRenderPipeline(pipelineDesc, pipeline);

        // Sampler
        WGPUSamplerDescriptor samplerDesc = WGPUSamplerDescriptor.obtain();
        samplerDesc.setAddressModeU(WGPUAddressMode.ClampToEdge);
        samplerDesc.setAddressModeV(WGPUAddressMode.ClampToEdge);
        samplerDesc.setMagFilter(WGPUFilterMode.Linear);
        samplerDesc.setMinFilter(WGPUFilterMode.Linear);
        samplerDesc.setMaxAnisotropy(1);
        sampler = new WGPUSampler();
        device.createSampler(samplerDesc, sampler);

        // Uniform buffer
        WGPUBufferDescriptor uniformDesc = WGPUBufferDescriptor.obtain();
        uniformDesc.setSize(64);
        uniformDesc.setUsage(WGPUBufferUsage.Uniform.or(WGPUBufferUsage.CopyDst));
        uniformBuffer = device.createBuffer(uniformDesc);

        // Uniform bind group
        WGPUBindGroupEntry uniformEntry = WGPUBindGroupEntry.obtain();
        uniformEntry.setBinding(0);
        uniformEntry.setBuffer(uniformBuffer);
        WGPUBindGroupDescriptor uniformBgDesc = WGPUBindGroupDescriptor.obtain();
        uniformBgDesc.setLayout(uniformBindGroupLayout);
        WGPUVectorBindGroupEntry entries = WGPUVectorBindGroupEntry.obtain();
        entries.push_back(uniformEntry);
        uniformBgDesc.setEntries(entries);
        uniformBindGroup = new WGPUBindGroup();
        device.createBindGroup(uniformBgDesc, uniformBindGroup);
    }

    private WGPUBindGroupLayout createBindGroupLayout(boolean isUniform) {
        WGPUVectorBindGroupLayoutEntry entries = WGPUVectorBindGroupLayoutEntry.obtain();

        WGPUBindGroupLayoutEntry entry = WGPUBindGroupLayoutEntry.obtain();
        entry.setBinding(0);
        if (isUniform) {
            entry.setVisibility(WGPUShaderStage.Vertex);
            entry.getBuffer().setType(WGPUBufferBindingType.Uniform);
            entries.push_back(entry);
        } else {
            entry.setVisibility(WGPUShaderStage.Fragment);
            entry.getTexture().setSampleType(WGPUTextureSampleType.Float);
            entry.getTexture().setViewDimension(WGPUTextureViewDimension._2D);
            entries.push_back(entry);
        }
        if (!isUniform) {
            WGPUBindGroupLayoutEntry samplerEntry = WGPUBindGroupLayoutEntry.obtain();
            samplerEntry.setBinding(1);
            samplerEntry.setVisibility(WGPUShaderStage.Fragment);
            samplerEntry.getSampler().setType(WGPUSamplerBindingType.Filtering);
            entries.push_back(samplerEntry);
        }

        WGPUBindGroupLayoutDescriptor desc = WGPUBindGroupLayoutDescriptor.obtain();
        desc.setEntries(entries);
        WGPUBindGroupLayout groupLayout = new WGPUBindGroupLayout();
        device.createBindGroupLayout(desc, groupLayout);
        return groupLayout;
    }

    private WGPUBlendState createBlendState() {
        WGPUBlendState blend = WGPUBlendState.obtain();
        blend.getColor().setSrcFactor(WGPUBlendFactor.SrcAlpha);
        blend.getColor().setDstFactor(WGPUBlendFactor.OneMinusSrcAlpha);
        blend.getColor().setOperation(WGPUBlendOperation.Add);
        blend.getAlpha().setSrcFactor(WGPUBlendFactor.One);
        blend.getAlpha().setDstFactor(WGPUBlendFactor.OneMinusSrcAlpha);
        blend.getAlpha().setOperation(WGPUBlendOperation.Add);
        return blend;
    }

    private void createFontsTexture() {
        IDLIntArray width = new IDLIntArray(1);
        IDLIntArray height = new IDLIntArray(1);
        IDLByteArray bytesArray = new IDLByteArray(1);

        ImGuiIO io = ImGui.GetIO();
        ImFontAtlas fonts = io.get_Fonts();
        fonts.GetTexDataAsRGBA32(bytesArray, width, height);
        int widthValue = width.getValue(0);
        int heightValue = height.getValue(0);

        int size = bytesArray.getSize();
        ByteBuffer buffer = ByteBuffer.allocateDirect(size);
        buffer.order(ByteOrder.nativeOrder());
        for (int i = 0; i < size; i++) {
            buffer.put(i, bytesArray.getValue(i));
        }
        buffer.position(0);

        WGPUTextureDescriptor texDesc = WGPUTextureDescriptor.obtain();
        texDesc.getSize().setWidth(widthValue);
        texDesc.getSize().setHeight(heightValue);
        texDesc.getSize().setDepthOrArrayLayers(1);
        texDesc.setFormat(WGPUTextureFormat.RGBA8UnormSrgb);
        texDesc.setUsage(WGPUTextureUsage.TextureBinding.or(WGPUTextureUsage.CopyDst));
        texDesc.setDimension(WGPUTextureDimension._2D);
        texDesc.setMipLevelCount(1);
        texDesc.setSampleCount(1);
        fontTexture = new WGPUTexture();
        device.createTexture(texDesc, fontTexture);

        WGPUTexelCopyTextureInfo dest = WGPUTexelCopyTextureInfo.obtain();
        dest.setTexture(fontTexture);
        WGPUTexelCopyBufferLayout dataLayout = WGPUTexelCopyBufferLayout.obtain();
        dataLayout.setBytesPerRow(widthValue * 4);
        dataLayout.setRowsPerImage(heightValue);
        WGPUExtent3D writeSize = WGPUExtent3D.obtain();
        writeSize.setWidth(widthValue);
        writeSize.setHeight(heightValue);
        writeSize.setDepthOrArrayLayers(1);
        device.getQueue().writeTexture(dest, buffer, size, dataLayout, writeSize);

        WGPUTextureViewDescriptor viewDesc = WGPUTextureViewDescriptor.obtain();
        fontTextureView = new WGPUTextureView();
        fontTexture.createView(viewDesc, fontTextureView);

        WGPUBindGroupEntry texEntry = WGPUBindGroupEntry.obtain();
        texEntry.setBinding(0);
        texEntry.setTextureView(fontTextureView);
        WGPUBindGroupEntry sampEntry = WGPUBindGroupEntry.obtain();
        sampEntry.setBinding(1);
        sampEntry.setSampler(sampler);
        WGPUBindGroupDescriptor bgDesc = WGPUBindGroupDescriptor.obtain();
        bgDesc.setLayout(textureBindGroupLayout);
        WGPUVectorBindGroupEntry entries = WGPUVectorBindGroupEntry.obtain();
        entries.push_back(texEntry);
        entries.push_back(sampEntry);
        bgDesc.setEntries(entries);
        fontBindGroup = new WGPUBindGroup();
        device.createBindGroup(bgDesc, fontBindGroup);

        io.SetFontTexID(fontTextureView.native_address);
    }

    @Override
    public void dispose() {
        renderPass.dispose();
        pipeline.release();
        pipeline.dispose();
        shaderModule.release();
        shaderModule.dispose();
        pipelineLayout.release();
        pipelineLayout.dispose();
        uniformBindGroupLayout.release();
        uniformBindGroupLayout.dispose();
        textureBindGroupLayout.release();
        textureBindGroupLayout.dispose();
        sampler.release();
        sampler.dispose();
        uniformBuffer.release();
        uniformBuffer.dispose();
        uniformBindGroup.release();
        uniformBindGroup.dispose();
        fontTexture.release();
        fontTexture.dispose();
        fontTextureView.release();
        fontTextureView.dispose();
        fontBindGroup.release();
        fontBindGroup.dispose();
        if (vertexBuffer != null) {
            vertexBuffer.release();
            vertexBuffer.dispose();
        }
        if (indexBuffer != null) {
            indexBuffer.release();
            indexBuffer.dispose();
        }
    }

    public void render(imgui.ImDrawData drawData, WGPUCommandEncoder encoder, WGPUTextureView targetView) {
        if (drawData.getCmdListsCount() == 0) return;

        // Upload proj matrix
        float[] orthoProj = new float[16];
        float L = drawData.getDisplayPosX();
        float R = drawData.getDisplayPosX() + drawData.getDisplaySizeX();
        float T = drawData.getDisplayPosY();
        float B = drawData.getDisplayPosY() + drawData.getDisplaySizeY();
        orthoProj[0] = 2.0f / (R - L); orthoProj[4] = 0.0f; orthoProj[8] = 0.0f; orthoProj[12] = (R + L) / (L - R);
        orthoProj[1] = 0.0f; orthoProj[5] = 2.0f / (T - B); orthoProj[9] = 0.0f; orthoProj[13] = (T + B) / (B - T);
        orthoProj[2] = 0.0f; orthoProj[6] = 0.0f; orthoProj[10] = 0.5f; orthoProj[14] = 0.5f;
        orthoProj[3] = 0.0f; orthoProj[7] = 0.0f; orthoProj[11] = 0.0f; orthoProj[15] = 1.0f;
        ByteBuffer projBuffer = BufferUtils.newByteBuffer(64);
        FloatBuffer floatView = projBuffer.asFloatBuffer();
        floatView.put(orthoProj);
        device.getQueue().writeBuffer(uniformBuffer, 0, projBuffer, 64);


        WGPURenderPassColorAttachment colorAttach = WGPURenderPassColorAttachment.obtain();
        colorAttach.setView(targetView);
        colorAttach.setLoadOp(WGPULoadOp.Load);
        colorAttach.setStoreOp(WGPUStoreOp.Store);
        WGPURenderPassDescriptor passDesc = WGPURenderPassDescriptor.obtain();
        WGPUVectorRenderPassColorAttachment attachments = WGPUVectorRenderPassColorAttachment.obtain();
        attachments.push_back(colorAttach);
        passDesc.setColorAttachments(attachments);

        encoder.beginRenderPass(passDesc, renderPass);

        renderPass.setPipeline(pipeline);
        renderPass.setBindGroup(0, uniformBindGroup, WGPUVectorInt.NULL);

        int vtxOffset = 0;
        int idxOffset = 0;

        float clip_offX = drawData.getDisplayPosX(); // (0,0) unless using multi-viewports
        float clip_offY = drawData.getDisplayPosY();
        float clip_scaleX = drawData.getFramebufferScaleX(); // (1,1) unless using retina display which are often (2,2)
        float clip_scaleY = drawData.getFramebufferScaleY();

        for (int n = 0; n < drawData.getCmdListsCount(); n++) {
            ImDrawList cmdList = drawData.getCmdLists(n);

            ByteBuffer vtxBufferData = cmdList.getVtxBufferData();
            ByteBuffer idxBufferData = cmdList.getIdxBufferData();
            int limit = vtxBufferData.limit();
            int limit1 = idxBufferData.limit();

            int vtxSize = vtxBufferData.limit() * 20;
            int idxSize = vtxBufferData.limit() * 2;
            setupBuffers(vtxSize, idxSize);

            ByteBuffer vtxData = cmdList.getVtxBufferData();
            device.getQueue().writeBuffer(vertexBuffer, vtxOffset, vtxData, vtxSize);

            ByteBuffer idxData = cmdList.getIdxBufferData();
            device.getQueue().writeBuffer(indexBuffer, idxOffset, idxData, idxSize);

            renderPass.setVertexBuffer(0, vertexBuffer, vtxOffset, vtxSize);
            renderPass.setIndexBuffer(indexBuffer, WGPUIndexFormat.Uint16, idxOffset, idxSize);

            for (int cmd_i = 0; cmd_i < cmdList.getCmdBufferSize(); cmd_i++) {
                ImDrawCmd pcmd = cmdList.getCmdBuffer(cmd_i);
                ImVec4 clipRect = pcmd.get_ClipRect();
                float clipRectX = clipRect.get_x();
                float clipRectY = clipRect.get_y();
                float clipRectZ = clipRect.get_z();
                float clipRectW = clipRect.get_w();
                float clip_minX = (clipRectX - clip_offX) * clip_scaleX;
                float clip_minY = (clipRectY - clip_offY) * clip_scaleY;
                float clip_maxX = (clipRectZ - clip_offX) * clip_scaleX;
                float clip_maxY = (clipRectW - clip_offY) * clip_scaleY;
                if(clip_maxX < clip_minX || clip_maxY < clip_minY)
                    continue;

                int textureId = pcmd.getTextureId();

                renderPass.setBindGroup(1, fontBindGroup, WGPUVectorInt.NULL);

                renderPass.setViewport(clipRectX - drawData.getDisplayPosX(), clipRectY - drawData.getDisplayPosY(), clipRectZ - clipRectX, clipRectW - clipRectY, 0, 1);
                renderPass.setScissorRect((int)clipRectX, (int)clipRectY, (int)(clipRectZ - clipRectX), (int)(clipRectW - clipRectY));

                renderPass.drawIndexed((int)pcmd.getElemCount(), 1, (int)pcmd.getIdxOffset(), (int)pcmd.getVtxOffset(), 0);
            }

            vtxOffset += vtxSize;
            idxOffset += idxSize;
        }
        renderPass.end();
    }

    private void setupBuffers(int newVtxSize, int newIdxSize) {
        if (newVtxSize > vertexBufferSize) {
            if (vertexBuffer != null) {
                vertexBuffer.release();
                vertexBuffer.dispose();
            }
            vertexBufferSize = newVtxSize * 2;
            WGPUBufferDescriptor desc = WGPUBufferDescriptor.obtain();
            desc.setSize(vertexBufferSize);
            desc.setUsage(WGPUBufferUsage.Vertex.or(WGPUBufferUsage.CopyDst));
            vertexBuffer = device.createBuffer(desc);
        }
        if (newIdxSize > indexBufferSize) {
            if (indexBuffer != null) indexBuffer.release();
            indexBufferSize = newIdxSize * 2;
            WGPUBufferDescriptor desc = WGPUBufferDescriptor.obtain();
            desc.setSize(indexBufferSize);
            desc.setUsage(WGPUBufferUsage.Index.or(WGPUBufferUsage.CopyDst));
            indexBuffer = device.createBuffer(desc);
        }
    }
}
