package imgui.gdx;

import com.badlogic.gdx.Gdx;
import com.github.xpenatan.jParser.idl.IDLBase;
import com.github.xpenatan.webgpu.WGPUAddressMode;
import com.github.xpenatan.webgpu.WGPUBindGroup;
import com.github.xpenatan.webgpu.WGPUBindGroupDescriptor;
import com.github.xpenatan.webgpu.WGPUBindGroupEntry;
import com.github.xpenatan.webgpu.WGPUBindGroupLayout;
import com.github.xpenatan.webgpu.WGPUBindGroupLayoutDescriptor;
import com.github.xpenatan.webgpu.WGPUBindGroupLayoutEntry;
import com.github.xpenatan.webgpu.WGPUBlendComponent;
import com.github.xpenatan.webgpu.WGPUBlendFactor;
import com.github.xpenatan.webgpu.WGPUBlendOperation;
import com.github.xpenatan.webgpu.WGPUBlendState;
import com.github.xpenatan.webgpu.WGPUBuffer;
import com.github.xpenatan.webgpu.WGPUBufferBindingType;
import com.github.xpenatan.webgpu.WGPUBufferDescriptor;
import com.github.xpenatan.webgpu.WGPUBufferUsage;
import com.github.xpenatan.webgpu.WGPUChainedStruct;
import com.github.xpenatan.webgpu.WGPUColor;
import com.github.xpenatan.webgpu.WGPUColorTargetState;
import com.github.xpenatan.webgpu.WGPUColorWriteMask;
import com.github.xpenatan.webgpu.WGPUCommandEncoder;
import com.github.xpenatan.webgpu.WGPUCullMode;
import com.github.xpenatan.webgpu.WGPUDevice;
import com.github.xpenatan.webgpu.WGPUExtent3D;
import com.github.xpenatan.webgpu.WGPUFilterMode;
import com.github.xpenatan.webgpu.WGPUFragmentState;
import com.github.xpenatan.webgpu.WGPUFrontFace;
import com.github.xpenatan.webgpu.WGPUIndexFormat;
import com.github.xpenatan.webgpu.WGPULoadOp;
import com.github.xpenatan.webgpu.WGPUMipmapFilterMode;
import com.github.xpenatan.webgpu.WGPUPipelineLayout;
import com.github.xpenatan.webgpu.WGPUPipelineLayoutDescriptor;
import com.github.xpenatan.webgpu.WGPUPrimitiveState;
import com.github.xpenatan.webgpu.WGPUPrimitiveTopology;
import com.github.xpenatan.webgpu.WGPURenderPassColorAttachment;
import com.github.xpenatan.webgpu.WGPURenderPassDepthStencilAttachment;
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
import com.github.xpenatan.webgpu.WGPUTextureAspect;
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
import com.github.xpenatan.webgpu.WGPUVertexStepMode;
import com.monstrous.gdx.webgpu.application.WebGPUContext;
import com.monstrous.gdx.webgpu.application.WgGraphics;
import imgui.ImDrawCmd;
import imgui.ImDrawData;
import imgui.ImDrawList;
import imgui.ImFontAtlas;
import imgui.ImGui;
import imgui.ImGuiIO;
import imgui.ImGuiImpl;
import imgui.ImVec2;
import imgui.ImVec4;
import imgui.VecIdxBuffer;
import imgui.VecVtxBuffer;
import imgui.idl.helper.IDLByteArray;
import imgui.idl.helper.IDLIntArray;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.HashMap;

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
    private final HashMap<Long, WGPUBindGroup> textureBindGroups = new HashMap<>();

    private boolean init = true;

    private IDLBase empty_01 = IDLBase.native_new();

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
        render(drawData, webgpu.encoder, webgpu.getTargetView());
    }

    private void createDeviceObjects() {
        String wgslCode = "" +
                "struct VertexInput {\n" +
                "    @location(0) position: vec2<f32>,\n" +
                "    @location(1) uv: vec2<f32>,\n" +
                "    @location(2) color: vec4<f32>,\n" +
                "};\n" +
                "\n" +
                "struct VertexOutput {\n" +
                "    @builtin(position) position: vec4<f32>,\n" +
                "    @location(0) color: vec4<f32>,\n" +
                "    @location(1) uv: vec2<f32>,\n" +
                "};\n" +
                "\n" +
                "struct Uniforms {\n" +
                "    mvp: mat4x4<f32>,\n" +
                "    gamma: f32\n" +
                "};\n" +
                "\n" +
                "@group(0) @binding(0) var<uniform> uniforms: Uniforms;\n" +
                "\n" +
                "@vertex\n" +
                "fn vs_main(in: VertexInput) -> VertexOutput {\n" +
                "    var out: VertexOutput;\n" +
                "    out.position = uniforms.mvp * vec4<f32>(in.position, 0.0, 1.0);\n" +
                "    out.color = in.color;\n" +
                "    out.uv = in.uv;\n" +
                "    return out;\n" +
                "}\n" +
                "\n" +
                "@group(1) @binding(0) var s: sampler;\n" +
                "@group(1) @binding(1) var t: texture_2d<f32>;\n" +
                "\n" +
                "@fragment\n" +
                "fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {\n" +
                "    let color = in.color * textureSample(t, s, in.uv);\n" +
                "    let corrected_color = pow(color.rgb, vec3<f32>(uniforms.gamma));\n" +
                "    return vec4<f32>(corrected_color, color.a);\n" +
                "}\n";

        WGPUShaderModuleDescriptor shaderDesc = WGPUShaderModuleDescriptor.obtain();
        WGPUShaderSourceWGSL wgslDesc = WGPUShaderSourceWGSL.obtain();
        wgslDesc.getChain().setNext(WGPUChainedStruct.NULL);
        wgslDesc.getChain().setSType(WGPUSType.ShaderSourceWGSL);
        wgslDesc.setCode(wgslCode);
        shaderDesc.setNextInChain(wgslDesc.getChain());

        shaderModule = new WGPUShaderModule();
        device.createShaderModule(shaderDesc, shaderModule);
        shaderModule.setLabel("Shader Module");

        // Bind group layouts
        createBindGroupLayout();

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
        vertexLayout.setStepMode(WGPUVertexStepMode.Vertex);

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
        targetState.setWriteMask(WGPUColorWriteMask.All);
        WGPUVectorColorTargetState targets = WGPUVectorColorTargetState.obtain();
        targets.push_back(targetState);
        fragmentState.setTargets(targets);

        // Render pipeline descriptor
        pipelineDesc.setLayout(pipelineLayout);
        pipelineDesc.setFragment(fragmentState);
        WGPUPrimitiveState primitive = pipelineDesc.getPrimitive();
        primitive.setTopology(WGPUPrimitiveTopology.TriangleList);
        primitive.setFrontFace(WGPUFrontFace.CCW);
        primitive.setCullMode(WGPUCullMode.None);
        pipelineDesc.getMultisample().setCount(1);
        pipeline = new WGPURenderPipeline();
        device.createRenderPipeline(pipelineDesc, pipeline);
        pipeline.setLabel("Pipeline");

        // Sampler
        WGPUSamplerDescriptor samplerDesc = WGPUSamplerDescriptor.obtain();
        samplerDesc.setMinFilter(WGPUFilterMode.Linear);
        samplerDesc.setMagFilter(WGPUFilterMode.Linear);
        samplerDesc.setMipmapFilter(WGPUMipmapFilterMode.Linear);
        samplerDesc.setAddressModeU(WGPUAddressMode.ClampToEdge);
        samplerDesc.setAddressModeV(WGPUAddressMode.ClampToEdge);
        samplerDesc.setAddressModeW(WGPUAddressMode.ClampToEdge);
        samplerDesc.setMaxAnisotropy(1);
        sampler = new WGPUSampler();
        device.createSampler(samplerDesc, sampler);
        sampler.setLabel("Sampler");

        int gammaSize = 1;
        int orthoProjSize = 16;
        int uniformSize = orthoProjSize * Float.BYTES + gammaSize * Float.BYTES;
        int uniformAlign= (int)memAlign(uniformSize, 16);

        // Uniform buffer
        WGPUBufferDescriptor uniformDesc = WGPUBufferDescriptor.obtain();
        uniformDesc.setSize(uniformAlign);
        uniformDesc.setUsage(WGPUBufferUsage.Uniform.or(WGPUBufferUsage.CopyDst));
        uniformBuffer = device.createBuffer(uniformDesc);
        uniformBuffer.setLabel("Uniform Buffer");

        // Uniform bind group
        WGPUBindGroupDescriptor uniformBgDesc = WGPUBindGroupDescriptor.obtain();
        uniformBgDesc.setLayout(uniformBindGroupLayout);
        WGPUVectorBindGroupEntry entries = WGPUVectorBindGroupEntry.obtain();

        WGPUBindGroupEntry uniformEntry = WGPUBindGroupEntry.obtain();

        uniformEntry.setBinding(0);
        uniformEntry.setBuffer(uniformBuffer);
        uniformEntry.setSize(uniformAlign);
        entries.push_back(uniformEntry);

        uniformBgDesc.setEntries(entries);
        uniformBindGroup = new WGPUBindGroup();
        device.createBindGroup(uniformBgDesc, uniformBindGroup);
        uniformBindGroup.setLabel("Uniform Bind Group");

        renderPass = new WGPURenderPassEncoder();
    }

    private void createBindGroupLayout() {

        {
            //Uniform
            WGPUVectorBindGroupLayoutEntry entries = WGPUVectorBindGroupLayoutEntry.obtain();
            WGPUBindGroupLayoutEntry entry = WGPUBindGroupLayoutEntry.obtain();
            entry.setBinding(0);
            entry.setVisibility(WGPUShaderStage.Vertex.or(WGPUShaderStage.Fragment));
            entry.getBuffer().setType(WGPUBufferBindingType.Uniform);
            entries.push_back(entry);

            WGPUBindGroupLayoutDescriptor desc = WGPUBindGroupLayoutDescriptor.obtain();
            desc.setEntries(entries);
            uniformBindGroupLayout = new WGPUBindGroupLayout();; // For uniforms
            device.createBindGroupLayout(desc, uniformBindGroupLayout);
            uniformBindGroupLayout.setLabel("Uniform Bind Group Layout");
        }

        {
            // texture/sampler
            WGPUVectorBindGroupLayoutEntry entries = WGPUVectorBindGroupLayoutEntry.obtain();

            WGPUBindGroupLayoutEntry samplerEntry = WGPUBindGroupLayoutEntry.obtain();
            samplerEntry.setBinding(0);
            samplerEntry.setVisibility(WGPUShaderStage.Fragment);
            samplerEntry.getSampler().setType(WGPUSamplerBindingType.Filtering);
            entries.push_back(samplerEntry);

            WGPUBindGroupLayoutEntry textureEntry = WGPUBindGroupLayoutEntry.obtain();
            textureEntry.setBinding(1);
            textureEntry.setVisibility(WGPUShaderStage.Fragment);
            textureEntry.getTexture().setSampleType(WGPUTextureSampleType.Float);
            textureEntry.getTexture().setViewDimension(WGPUTextureViewDimension._2D);
            entries.push_back(textureEntry);

            WGPUBindGroupLayoutDescriptor desc = WGPUBindGroupLayoutDescriptor.obtain();
            desc.setEntries(entries);
            textureBindGroupLayout = new WGPUBindGroupLayout();; // For texture/sampler
            device.createBindGroupLayout(desc, textureBindGroupLayout);
            textureBindGroupLayout.setLabel("Texture Bind Group Layout");
        }
    }

    private WGPUBlendState createBlendState() {
        WGPUBlendState blend = WGPUBlendState.obtain();
        WGPUBlendComponent alpha = blend.getAlpha();
        alpha.setOperation(WGPUBlendOperation.Add);
        alpha.setSrcFactor(WGPUBlendFactor.One);
        alpha.setDstFactor(WGPUBlendFactor.OneMinusSrcAlpha);
        WGPUBlendComponent color = blend.getColor();
        color.setOperation(WGPUBlendOperation.Add);
        color.setSrcFactor(WGPUBlendFactor.SrcAlpha);
        color.setDstFactor(WGPUBlendFactor.OneMinusSrcAlpha);
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
        texDesc.setFormat(WGPUTextureFormat.RGBA8Unorm);
        texDesc.setUsage(WGPUTextureUsage.TextureBinding.or(WGPUTextureUsage.CopyDst));
        texDesc.setDimension(WGPUTextureDimension._2D);
        texDesc.setMipLevelCount(1);
        texDesc.setSampleCount(1);
        fontTexture = new WGPUTexture();
        device.createTexture(texDesc, fontTexture);
        fontTexture.setLabel("Font Texture");

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
        viewDesc.setFormat(WGPUTextureFormat.RGBA8Unorm);
        viewDesc.setDimension(WGPUTextureViewDimension._2D);
        viewDesc.setBaseMipLevel(0);
        viewDesc.setMipLevelCount(1);
        viewDesc.setBaseArrayLayer(0);
        viewDesc.setArrayLayerCount(1);
        viewDesc.setAspect(WGPUTextureAspect.All);
        fontTextureView = new WGPUTextureView();
        fontTexture.createView(viewDesc, fontTextureView);
        fontTextureView.setLabel("Font Texture View");

        WGPUVectorBindGroupEntry entries = WGPUVectorBindGroupEntry.obtain();
        {
            WGPUBindGroupEntry sampEntry = WGPUBindGroupEntry.obtain();
            sampEntry.setBinding(0);
            sampEntry.setSampler(sampler);
            entries.push_back(sampEntry);
        }
        {
            WGPUBindGroupEntry texEntry = WGPUBindGroupEntry.obtain();
            texEntry.setBinding(1);
            texEntry.setTextureView(fontTextureView);
            entries.push_back(texEntry);
        }
        WGPUBindGroupDescriptor bgDesc = WGPUBindGroupDescriptor.obtain();
        bgDesc.setLayout(textureBindGroupLayout);
        bgDesc.setEntries(entries);
        fontBindGroup = new WGPUBindGroup();
        device.createBindGroup(bgDesc, fontBindGroup);
        fontBindGroup.setLabel("fontBindGroup");
        textureBindGroups.put(fontTextureView.native_address, fontBindGroup);

        io.SetFontTexID(fontTextureView.native_address);
    }

    private WGPUBindGroup getOrCreateBindGroup(long texViewPtr) {
        if (textureBindGroups.containsKey(texViewPtr)) {
            return textureBindGroups.get(texViewPtr);
        }
        WGPUTextureView view = WGPUTextureView.native_new();
        view.internal_reset(texViewPtr, false);
        WGPUVectorBindGroupEntry entries = WGPUVectorBindGroupEntry.obtain();

        {
            WGPUBindGroupEntry samplerEntry = WGPUBindGroupEntry.obtain();
            samplerEntry.setBinding(0);
            samplerEntry.setSampler(sampler);
            entries.push_back(samplerEntry);
        }
        {
            WGPUBindGroupEntry textureEntry = WGPUBindGroupEntry.obtain();
            textureEntry.setBinding(1);
            textureEntry.setTextureView(view);
            entries.push_back(textureEntry);
        }
        WGPUBindGroupDescriptor bgDesc = WGPUBindGroupDescriptor.obtain();
        bgDesc.setLayout(textureBindGroupLayout);
        bgDesc.setEntries(entries);
        WGPUBindGroup bg = new WGPUBindGroup();
        device.createBindGroup(bgDesc, bg);
        bg.setLabel("Texture Bind Group");
        textureBindGroups.put(texViewPtr, bg);
        return bg;
    }

    @Override
    public void dispose() {
        if (renderPass != null) {
            renderPass.dispose();
        }
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
        textureBindGroups.values().forEach(bg -> {
            bg.release();
            bg.dispose();
        });
        textureBindGroups.clear();
        if (vertexBuffer != null) {
            vertexBuffer.release();
            vertexBuffer.dispose();
        }
        if (indexBuffer != null) {
            indexBuffer.release();
            indexBuffer.dispose();
        }
    }

    public void render(ImDrawData drawData, WGPUCommandEncoder encoder, WGPUTextureView targetView) {
        int cmdListsCount = drawData.get_CmdListsCount();
        if (cmdListsCount == 0) {
            return;
        }

        ImVec2 displayPos = drawData.get_DisplayPos();
        ImVec2 displaySize = drawData.get_DisplaySize();
        ImVec2 framebufferScale = drawData.get_FramebufferScale();
        float displaySizeX = displaySize.get_x();
        float displaySizeY = displaySize.get_y();
        float displayX = displayPos.get_x();
        float displayY = displayPos.get_y();
        float frameScaleX = framebufferScale.get_x();
        float frameScaleY = framebufferScale.get_y();

        // Calculate total buffer sizes
        int totalVtxCount = drawData.get_TotalVtxCount();
        int totalIdxCount = drawData.get_TotalIdxCount();
        setupBuffers(totalVtxCount, totalIdxCount);

        WGPURenderPassColorAttachment colorAttach = WGPURenderPassColorAttachment.obtain();
        colorAttach.setDepthSlice(-1);
        colorAttach.setView(targetView);
        colorAttach.setLoadOp(WGPULoadOp.Load);
        colorAttach.setStoreOp(WGPUStoreOp.Store);

        WGPURenderPassDescriptor passDesc = WGPURenderPassDescriptor.obtain();
        WGPUVectorRenderPassColorAttachment attachments = WGPUVectorRenderPassColorAttachment.obtain();
        attachments.push_back(colorAttach);
        passDesc.setDepthStencilAttachment(WGPURenderPassDepthStencilAttachment.NULL);
        passDesc.setColorAttachments(attachments);

        encoder.beginRenderPass(passDesc, renderPass);

        // Upload all vertex and index data
        int vtxOffset = 0;
        int idxOffset = 0;
        for (int n = 0; n < cmdListsCount; n++) {
            ImDrawList cmdList = drawData.get_CmdLists(n);
            ByteBuffer vtxData = cmdList.getVtxBufferData();
            VecVtxBuffer vtxBuffer = cmdList.get_VtxBuffer();
            VecIdxBuffer idxBuffer = cmdList.get_IdxBuffer();
            int vtxSize = vtxBuffer.size();
            int idxSize = idxBuffer.size();

            int vertSize = 20;
            int totalVertSize = (vtxSize * vertSize);
            int indexSize = 2;
            int totalIdxSize = (idxSize * indexSize);

            empty_01.native_setVoid(vtxBuffer.get_Data().native_address);
            int vb_write_size = (int)memAlign(totalVertSize, 4);
            int ib_write_size = (int)memAlign(totalIdxSize, 4);

            device.getQueue().writeBuffer(vertexBuffer, vtxOffset, empty_01, vb_write_size);
            ByteBuffer idxData = cmdList.getIdxBufferData();

            empty_01.native_setVoid(idxBuffer.get_Data().native_address);
            device.getQueue().writeBuffer(indexBuffer, idxOffset, empty_01, ib_write_size);
            int nPlus = n+1;
            vtxOffset += totalVertSize * nPlus;
            idxOffset += totalIdxSize * nPlus;
        }

        setupRenderState(displayX, displayY, displaySizeX, displaySizeY, frameScaleX, frameScaleY);

        int currentVtxOffset = 0;
        int currentIdxOffset = 0;

        float clip_offX = displayX;
        float clip_offY = displayY;
        float clip_scaleX = frameScaleX;
        float clip_scaleY = frameScaleY;

        for (int n = 0; n < cmdListsCount; n++) {
            ImDrawList cmdList = drawData.get_CmdLists(n);
            ByteBuffer vtxBufferData = cmdList.getVtxBufferData();
            int listVtxBytes = vtxBufferData.limit();
            int listIdxBytes = cmdList.getIdxBufferData().limit();
            int listVtxOffsetElems = currentVtxOffset / 20; // in vertices
            int listIdxOffsetElems = currentIdxOffset / 2; // in indices

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

                // Clamp to framebuffer size
                if (clip_minX < 0) clip_minX = 0;
                if (clip_minY < 0) clip_minY = 0;
                float fbW = displayX * frameScaleX;
                float fbH = displayY * frameScaleY;
                if (clip_maxX > fbW) clip_maxX = fbW;
                if (clip_maxY > fbH) clip_maxY = fbH;

                if (clip_maxX <= clip_minX || clip_maxY <= clip_minY) {
                    continue;
                }

                long textureId = pcmd.getTextureId();
                WGPUBindGroup bg = getOrCreateBindGroup(textureId);
                renderPass.setBindGroup(1, bg, WGPUVectorInt.NULL);

                renderPass.setScissorRect((int) clip_minX, (int) clip_minY, (int) (clip_maxX - clip_minX), (int) (clip_maxY - clip_minY));

                renderPass.drawIndexed((int) pcmd.getElemCount(), 1, (int) pcmd.getIdxOffset() + listIdxOffsetElems, (int) pcmd.getVtxOffset() + listVtxOffsetElems, 0);
            }

            currentVtxOffset += listVtxBytes;
            currentIdxOffset += listIdxBytes;
        }
        renderPass.end();
        renderPass.release();
    }

    private void setupRenderState(float displayX, float displayY, float displaySizeX, float displaySizeY, float frameScaleX, float frameScaleY) {
        {
            float L = displayX;
            float R = displayX + displaySizeX;
            float T = displayY;
            float B = displayY + displaySizeY;

            float[] orthoProj = {
                    2.0f / (R - L), 0.0f, 0.0f, 0.0f,
                    0.0f, 2.0f / (T - B), 0.0f, 0.0f,
                    0.0f, 0.0f, 0.5f, 0.0f,
                    (R + L) / (L - R), (T + B) / (B - T), 0.5f, 1.0f
            };

            int prjSize = 64;
            float gamma = 2.2f;
            int gamaSize = 1 * Float.BYTES;

            ByteBuffer projBuffer = ByteBuffer.allocateDirect(prjSize + gamaSize).order(ByteOrder.LITTLE_ENDIAN);
            FloatBuffer floatView = projBuffer.asFloatBuffer();
            floatView.put(orthoProj);
            floatView.put(gamma);
            device.getQueue().writeBuffer(uniformBuffer, 0, projBuffer, prjSize);
            device.getQueue().writeBuffer(uniformBuffer, prjSize, projBuffer, gamaSize);
        }

        // Setup viewport
        float fbWidth = displaySizeX * frameScaleX;
        float fbHeight = displaySizeY * frameScaleY;
        renderPass.setViewport(0, 0, fbWidth, fbHeight, 0, 1);

        // Bind shader and vertex buffers
        renderPass.setVertexBuffer(0, vertexBuffer, 0, vertexBufferSize * 20);
        renderPass.setIndexBuffer(indexBuffer, WGPUIndexFormat.Uint16, 0, indexBufferSize * 2);
        renderPass.setPipeline(pipeline);
        renderPass.setBindGroup(0, uniformBindGroup);

        // Setup blend factor
        WGPUColor color = WGPUColor.obtain();
        color.setColor(0.f, 0.f, 0.f, 0.f);
        renderPass.setBlendConstant(color);
    }

    private void setupBuffers(int totalVtxCount, int totalIdxCount) {
        if (totalVtxCount > vertexBufferSize) {
            if (vertexBuffer != null) {
                vertexBuffer.release();
                vertexBuffer.dispose();
            }
            vertexBufferSize = totalVtxCount + 5000;

            int imDrawVertSize = 5 * Float.BYTES;
            int vertSize = vertexBufferSize * imDrawVertSize;
            int vertAligned = (int)memAlign(vertSize, 4);

            WGPUBufferDescriptor desc = WGPUBufferDescriptor.obtain();
            desc.setSize(vertAligned);
            desc.setUsage(WGPUBufferUsage.Vertex.or(WGPUBufferUsage.CopyDst));
            vertexBuffer = device.createBuffer(desc);
            vertexBuffer.setLabel("Vertex Buffer");
        }
        if (totalIdxCount > indexBufferSize) {
            if (indexBuffer != null) {
                indexBuffer.release();
                indexBuffer.dispose();
            }
            indexBufferSize = totalIdxCount + 10000;

            int imDrawIdxSize = 1 * Short.BYTES;
            int idxSize = indexBufferSize * imDrawIdxSize;
            int vertAligned = (int)memAlign(idxSize, 4);

            WGPUBufferDescriptor desc = WGPUBufferDescriptor.obtain();
            desc.setSize(vertAligned);
            desc.setUsage(WGPUBufferUsage.Index.or(WGPUBufferUsage.CopyDst));
            indexBuffer = device.createBuffer(desc);
            indexBuffer.setLabel("Index Buffer");
        }
    }

    private static long memAlign(long size, long align) {
        return ((size + (align - 1)) & ~(align - 1));
    }
}
