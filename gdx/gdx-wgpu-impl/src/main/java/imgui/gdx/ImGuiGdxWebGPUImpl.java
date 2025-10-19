package imgui.gdx;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.utils.BufferUtils;
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
import com.github.xpenatan.webgpu.WGPUDepthStencilState;
import com.github.xpenatan.webgpu.WGPUDevice;
import com.github.xpenatan.webgpu.WGPUExtent3D;
import com.github.xpenatan.webgpu.WGPUFilterMode;
import com.github.xpenatan.webgpu.WGPUFragmentState;
import com.github.xpenatan.webgpu.WGPUFrontFace;
import com.github.xpenatan.webgpu.WGPUIndexFormat;
import com.github.xpenatan.webgpu.WGPULoadOp;
import com.github.xpenatan.webgpu.WGPUMipmapFilterMode;
import com.github.xpenatan.webgpu.WGPUMultisampleState;
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
import imgui.IDLTemp;
import imgui.ImDrawCmd;
import imgui.ImDrawData;
import imgui.ImDrawList;
import imgui.ImFontAtlas;
import imgui.ImGui;
import imgui.ImGuiIO;
import imgui.ImGuiImpl;
import imgui.ImVec2;
import imgui.ImVec4;
import imgui.VecCmdBuffer;
import imgui.VecIdxBuffer;
import imgui.VecVtxBuffer;
import imgui.idl.helper.IDLByteArray;
import imgui.idl.helper.IDLInt;
import imgui.idl.helper.IDLIntArray;
import imgui.idl.helper.IDLString;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import static com.github.xpenatan.webgpu.WGPUTextureFormat.RGBA8Unorm;

public class ImGuiGdxWebGPUImpl implements ImGuiImpl {

    private static int VTX_BUFFER_SIZE = 8 + 8 + 4;// = ImVec2 + ImVec2 + ImU32;
    private final static int IDX_BUFFER_SIZE = 2; // short

    private WGPUDevice device;
    private WGPURenderPassEncoder renderPass;
    private WGPUTextureFormat renderFormat;
    private WGPURenderPipeline pipeline;
    private WGPUShaderModule shaderModule;
    private WGPUPipelineLayout pipelineLayout;
    private WGPUBindGroupLayout commonBindGroupLayout;
    private WGPUBindGroupLayout imageBindGroupLayout;
    private WGPUSampler sampler;
    private WGPUBuffer uniformBuffer;
    private WGPUBindGroup commonBindGroup;
    private WGPUTexture fontTexture;
    private WGPUTextureView fontTextureView;
    private WGPUBindGroup fontBindGroup;
    private WGPUBuffer vertexBuffer;
    private WGPUBuffer indexBuffer;
    private int vertexBufferSizeBytes = 0;
    private int indexBufferSizeBytes = 0;
    private float[] orthoProj = new float[16];

    private boolean init = true;

    private IDLBase empty_01 = IDLBase.native_new();

    private ByteBuffer vertexByteBuffer;
    private ByteBuffer indexByteBuffer;

    private FileHandle imgui;

    public ImGuiGdxWebGPUImpl() {
        WgGraphics gfx = (WgGraphics) Gdx.graphics;
        WebGPUContext webgpu = gfx.getContext();
        setup(Gdx.files.local("imgui.ini"), webgpu.device, webgpu.surfaceFormat);
    }

    public ImGuiGdxWebGPUImpl(WGPUDevice device, WGPUTextureFormat renderFormat) {
        setup(Gdx.files.local("imgui.ini"), device, renderFormat);
    }

    public ImGuiGdxWebGPUImpl(FileHandle imgui, WGPUDevice device, WGPUTextureFormat renderFormat) {
        setup(imgui, device, renderFormat);
    }

    private void setup(FileHandle imgui, WGPUDevice device, WGPUTextureFormat renderFormat) {
        this.imgui = imgui;
        this.device = device;
        this.renderFormat = renderFormat;

        if(imgui != null) {
            boolean exists = imgui.exists();
            if(exists) {
                String iniData = imgui.readString();
                if(!iniData.isEmpty()) {
                    ImGui.LoadIniSettingsFromMemory(iniData);
                }
            }
        }
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

        if(imgui != null) {
            ImGuiIO imGuiIO = ImGui.GetIO();
            if(imGuiIO.get_WantSaveIniSettings()) {
                imGuiIO.set_WantSaveIniSettings(false);
                saveImGuiData(imgui);
            }
        }
    }

    @Override
    public void render(ImDrawData drawData) {
        WgGraphics gfx = (WgGraphics) Gdx.graphics;
        WebGPUContext webgpu = gfx.getContext();
        render(drawData, webgpu.encoder, webgpu.getTargetView());
    }

    private void createDeviceObjects() {


        WGPUShaderModuleDescriptor shaderDesc = WGPUShaderModuleDescriptor.obtain();
        WGPUShaderSourceWGSL wgslDesc = WGPUShaderSourceWGSL.obtain();
        wgslDesc.getChain().setNext(WGPUChainedStruct.NULL);
        wgslDesc.getChain().setSType(WGPUSType.ShaderSourceWGSL);

        boolean gamma = getGamma(renderFormat);
        String shader = getShader(gamma);
        wgslDesc.setCode(shader);
        shaderDesc.setNextInChain(wgslDesc.getChain());

        shaderModule = new WGPUShaderModule();
        device.createShaderModule(shaderDesc, shaderModule);
//        shaderModule.setLabel("Shader Module");

        // Bind group layouts
        createBindGroupLayout();

        // Pipeline layout
        WGPUPipelineLayoutDescriptor layoutDesc = WGPUPipelineLayoutDescriptor.obtain();

        WGPUVectorBindGroupLayout array = WGPUVectorBindGroupLayout.obtain();
        array.push_back(commonBindGroupLayout);
        array.push_back(imageBindGroupLayout);
        layoutDesc.setBindGroupLayouts(array);
        pipelineLayout = new WGPUPipelineLayout();
        device.createPipelineLayout(layoutDesc, pipelineLayout);

        // Vertex layout
        WGPUVectorVertexAttribute attribute_desc = WGPUVectorVertexAttribute.obtain();
        WGPUVertexAttribute attr01 = WGPUVertexAttribute.obtain();
        attr01.setFormat(WGPUVertexFormat.Float32x2);
        attr01.setOffset(0);
        attr01.setShaderLocation(0);
        attribute_desc.push_back(attr01);

        WGPUVertexAttribute attr02 = WGPUVertexAttribute.obtain();
        attr02.setFormat(WGPUVertexFormat.Float32x2);
        attr02.setOffset(8);
        attr02.setShaderLocation(1);
        attribute_desc.push_back(attr02);

        WGPUVertexAttribute attr03 = WGPUVertexAttribute.obtain();
        attr03.setFormat(WGPUVertexFormat.Unorm8x4);
        attr03.setOffset(16);
        attr03.setShaderLocation(2);
        attribute_desc.push_back(attr03);

        WGPUVertexBufferLayout vertexLayout = WGPUVertexBufferLayout.obtain();
        vertexLayout.setArrayStride(VTX_BUFFER_SIZE);
        vertexLayout.setAttributes(attribute_desc);
        vertexLayout.setStepMode(WGPUVertexStepMode.Vertex);

        WGPURenderPipelineDescriptor graphics_pipeline_desc = WGPURenderPipelineDescriptor.obtain();

        WGPUPrimitiveState primitive = graphics_pipeline_desc.getPrimitive();
        primitive.setTopology(WGPUPrimitiveTopology.TriangleList);
        primitive.setStripIndexFormat(WGPUIndexFormat.Undefined);
        primitive.setFrontFace(WGPUFrontFace.CW);
        primitive.setCullMode(WGPUCullMode.None);
        WGPUMultisampleState multisample = graphics_pipeline_desc.getMultisample();
        multisample.setCount(1);
        multisample.setMask(-1);
        multisample.setAlphaToCoverageEnabled(false);

        // Vertex state
        WGPUVertexState vertexState = graphics_pipeline_desc.getVertex();
        vertexState.setModule(shaderModule);
        vertexState.setEntryPoint("vs_main");

        WGPUVectorVertexBufferLayout buffer_layouts = WGPUVectorVertexBufferLayout.obtain();
        buffer_layouts.push_back(vertexLayout);
        vertexState.setBuffers(buffer_layouts);


        WGPUColorTargetState color_state = WGPUColorTargetState.obtain();
        color_state.setFormat(renderFormat);
        color_state.setBlend(createBlendState());
        color_state.setWriteMask(WGPUColorWriteMask.All);
        WGPUVectorColorTargetState targets = WGPUVectorColorTargetState.obtain();
        targets.push_back(color_state);

        // Fragment state
        WGPUFragmentState fragmentState = WGPUFragmentState.obtain();
        fragmentState.setModule(shaderModule);
        fragmentState.setEntryPoint("fs_main");
        fragmentState.setTargets(targets);

        // Render pipeline descriptor
        graphics_pipeline_desc.setLayout(pipelineLayout);
        graphics_pipeline_desc.setFragment(fragmentState);
        graphics_pipeline_desc.setDepthStencil(WGPUDepthStencilState.NULL);
        pipeline = new WGPURenderPipeline();
        device.createRenderPipeline(graphics_pipeline_desc, pipeline);
//        pipeline.setLabel("Pipeline");

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
//        sampler.setLabel("Sampler");

        int gammaSize = 1;
        int orthoProjSize = 16;
        int uniformSize = orthoProjSize * Float.BYTES + gammaSize * Float.BYTES;
        int uniformAlign = (int)memAlign(uniformSize, 16);

        // Uniform buffer
        WGPUBufferDescriptor uniformDesc = WGPUBufferDescriptor.obtain();
        uniformDesc.setSize(uniformAlign);
        uniformDesc.setUsage(WGPUBufferUsage.Uniform.or(WGPUBufferUsage.CopyDst));
        uniformBuffer = device.createBuffer(uniformDesc);
//        uniformBuffer.setLabel("Uniform Buffer");

        // Uniform bind group
        WGPUVectorBindGroupEntry common_bg_entries = WGPUVectorBindGroupEntry.obtain();

        WGPUBindGroupEntry uniformEntry = WGPUBindGroupEntry.obtain();
        uniformEntry.setBinding(0);
        uniformEntry.setBuffer(uniformBuffer);
        uniformEntry.setSize(uniformAlign);
        uniformEntry.setSampler(WGPUSampler.NULL);
        uniformEntry.setTextureView(WGPUTextureView.NULL);
        common_bg_entries.push_back(uniformEntry);

        WGPUBindGroupEntry sampleEntry = WGPUBindGroupEntry.obtain();
        sampleEntry.setBinding(1);
        uniformEntry.setSize(0);
        sampleEntry.setSampler(sampler);
        sampleEntry.setBuffer(WGPUBuffer.NULL);
        sampleEntry.setTextureView(WGPUTextureView.NULL);
        common_bg_entries.push_back(sampleEntry);

        WGPUBindGroupDescriptor common_bg_descriptor = WGPUBindGroupDescriptor.obtain();
        common_bg_descriptor.setLabel("common_bg_descriptor");
        common_bg_descriptor.setLayout(commonBindGroupLayout);
        common_bg_descriptor.setEntries(common_bg_entries);
        commonBindGroup = new WGPUBindGroup();
        device.createBindGroup(common_bg_descriptor, commonBindGroup);
//        commonBindGroup.setLabel("Uniform Bind Group");

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

            WGPUBindGroupLayoutEntry samplerEntry = WGPUBindGroupLayoutEntry.obtain();
            samplerEntry.setBinding(1);
            samplerEntry.setVisibility(WGPUShaderStage.Fragment);
            samplerEntry.getSampler().setType(WGPUSamplerBindingType.Filtering);
            entries.push_back(samplerEntry);

            WGPUBindGroupLayoutDescriptor common_bg_layout_desc = WGPUBindGroupLayoutDescriptor.obtain();
            common_bg_layout_desc.setEntries(entries);
            commonBindGroupLayout = new WGPUBindGroupLayout();
            device.createBindGroupLayout(common_bg_layout_desc, commonBindGroupLayout);
//            commonBindGroupLayout.setLabel("Uniform Bind Group Layout");
        }

        {
            // texture/sampler
            WGPUVectorBindGroupLayoutEntry entries = WGPUVectorBindGroupLayoutEntry.obtain();

            WGPUBindGroupLayoutEntry textureEntry = WGPUBindGroupLayoutEntry.obtain();
            textureEntry.setBinding(0);
            textureEntry.setVisibility(WGPUShaderStage.Fragment);
            textureEntry.getTexture().setSampleType(WGPUTextureSampleType.Float);
            textureEntry.getTexture().setViewDimension(WGPUTextureViewDimension._2D);
            entries.push_back(textureEntry);

            WGPUBindGroupLayoutDescriptor image_bg_layout_desc = WGPUBindGroupLayoutDescriptor.obtain();
            image_bg_layout_desc.setEntries(entries);
            imageBindGroupLayout = new WGPUBindGroupLayout();
            device.createBindGroupLayout(image_bg_layout_desc, imageBindGroupLayout);
//            imageBindGroupLayout.setLabel("Texture Bind Group Layout");
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
        IDLInt width = IDLTemp.Int_1(1);
        IDLInt height = IDLTemp.Int_2(1);
        IDLByteArray bytesArray = new IDLByteArray(1);

        ImGuiIO io = ImGui.GetIO();
        ImFontAtlas fonts = io.get_Fonts();
        fonts.GetTexDataAsRGBA32(bytesArray, width, height);
        int widthValue = width.getValue(0);
        int heightValue = height.getValue(0);

        int size = bytesArray.getSize();
        ByteBuffer buffer = BufferUtils.newUnsafeByteBuffer(size)
                .order(ByteOrder.LITTLE_ENDIAN);
        for (int i = 0; i < size; i++) {
            buffer.put(i, bytesArray.getValue(i));
        }
        buffer.position(0);
        bytesArray.dispose();

        WGPUTextureDescriptor texDesc = WGPUTextureDescriptor.obtain();
        texDesc.getSize().setWidth(widthValue);
        texDesc.getSize().setHeight(heightValue);
        texDesc.getSize().setDepthOrArrayLayers(1);
        texDesc.setFormat(RGBA8Unorm);
        texDesc.setUsage(WGPUTextureUsage.TextureBinding.or(WGPUTextureUsage.CopyDst));
        texDesc.setDimension(WGPUTextureDimension._2D);
        texDesc.setMipLevelCount(1);
        texDesc.setSampleCount(1);
        fontTexture = new WGPUTexture();
        device.createTexture(texDesc, fontTexture);
//        fontTexture.setLabel("Font Texture");

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
        viewDesc.setFormat(RGBA8Unorm);
        viewDesc.setDimension(WGPUTextureViewDimension._2D);
        viewDesc.setBaseMipLevel(0);
        viewDesc.setMipLevelCount(1);
        viewDesc.setBaseArrayLayer(0);
        viewDesc.setArrayLayerCount(1);
        viewDesc.setAspect(WGPUTextureAspect.All);
        fontTextureView = new WGPUTextureView();
        fontTexture.createView(viewDesc, fontTextureView);
//        fontTextureView.setLabel("Font Texture View");

        fontBindGroup = createImageBindGroup(imageBindGroupLayout, fontTextureView);

        IDLBase textureId = new IDLBase();
        textureId.native_copy(fontTextureView);
        io.get_Fonts().set_TexID(textureId);

        BufferUtils.disposeUnsafeByteBuffer(buffer);
    }

    private WGPUBindGroup createImageBindGroup(WGPUBindGroupLayout layout, WGPUTextureView texture) {
        WGPUVectorBindGroupEntry entries = WGPUVectorBindGroupEntry.obtain();
        {
            WGPUBindGroupEntry texEntry = WGPUBindGroupEntry.obtain();
            texEntry.setBinding(0);
            texEntry.setTextureView(texture);
            entries.push_back(texEntry);
        }
        WGPUBindGroupDescriptor bgDesc = WGPUBindGroupDescriptor.obtain();
        bgDesc.setLabel("font WGPUBindGroupDescriptor");
        bgDesc.setLayout(layout);
        bgDesc.setEntries(entries);

        WGPUBindGroup bindGroup = new WGPUBindGroup();
        device.createBindGroup(bgDesc, bindGroup);
//        bindGroup.setLabel("fontBindGroup");
        return bindGroup;
    }

    @Override
    public void dispose() {
        if(vertexByteBuffer != null) {
            BufferUtils.disposeUnsafeByteBuffer(vertexByteBuffer);
        }
        if(indexByteBuffer != null) {
            BufferUtils.disposeUnsafeByteBuffer(indexByteBuffer);
        }
        if (renderPass != null) {
            renderPass.dispose();
        }
        pipeline.release();
        pipeline.dispose();
        shaderModule.release();
        shaderModule.dispose();
        pipelineLayout.release();
        pipelineLayout.dispose();
        commonBindGroupLayout.release();
        commonBindGroupLayout.dispose();
        imageBindGroupLayout.release();
        imageBindGroupLayout.dispose();
        sampler.release();
        sampler.dispose();
        uniformBuffer.release();
        uniformBuffer.dispose();
        commonBindGroup.release();
        commonBindGroup.dispose();
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

    public void saveImGuiData(FileHandle path) {
        if(path != null) {
            IDLString idlString = ImGui.SaveIniSettingsToMemory();
            String s = idlString.c_str();
            path.writeString(s, false);
        }
    }

    public void render(ImDrawData drawData, WGPUCommandEncoder encoder, WGPUTextureView targetView) {
        int cmdListsCount = drawData.get_CmdListsCount();
        ImVec2 displaySize = drawData.get_DisplaySize();
        ImVec2 framebufferScale = drawData.get_FramebufferScale();
        float displaySizeX = displaySize.get_x();
        float displaySizeY = displaySize.get_y();
        float frameScaleX = framebufferScale.get_x();
        float frameScaleY = framebufferScale.get_y();
        float fb_width = displaySizeX * frameScaleX;
        float fb_height = displaySizeY * frameScaleY;
        ImVec2 displayPos = drawData.get_DisplayPos();
        if (fb_width <= 0 || fb_height <= 0 || cmdListsCount == 0) {
            return;
        }

        float displayX = displayPos.get_x();
        float displayY = displayPos.get_y();

        // Calculate total buffer sizes
        int totalVtxCountBytes = drawData.get_TotalVtxCount() * VTX_BUFFER_SIZE;
        int totalIdxCountBytes = drawData.get_TotalIdxCount() * IDX_BUFFER_SIZE;
        setupBuffers(totalVtxCountBytes, totalIdxCountBytes);

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

        boolean fullBuffer = true;

        if(fullBuffer) {
            int vb_write_align_size = (int)memAlign(totalVtxCountBytes, 4);
            int ib_write_align_size = (int)memAlign(totalIdxCountBytes, 4);

            int vtxBufferSize = 0;
            if(vertexByteBuffer != null) {
                vtxBufferSize = vertexByteBuffer.capacity();
            }
            if(vb_write_align_size > vtxBufferSize) {
                if(vertexByteBuffer != null) {
                    BufferUtils.disposeUnsafeByteBuffer(vertexByteBuffer);
                }
                vertexByteBuffer = BufferUtils.newUnsafeByteBuffer(vb_write_align_size);
            }

            int idxBufferSize = 0;
            if(indexByteBuffer != null) {
                idxBufferSize = indexByteBuffer.capacity();
            }
            if(ib_write_align_size > idxBufferSize) {
                if(indexByteBuffer != null) {
                    BufferUtils.disposeUnsafeByteBuffer(indexByteBuffer);
                }
                indexByteBuffer = BufferUtils.newUnsafeByteBuffer(ib_write_align_size);
            }

            for (int n = 0; n < cmdListsCount; n++) {
                ImDrawList drawList = drawData.get_CmdLists(n);
                VecVtxBuffer vtxBuffer = drawList.get_VtxBuffer();
                VecIdxBuffer idxBuffer = drawList.get_IdxBuffer();

                int vtxByteSize = vtxBuffer.size() * VTX_BUFFER_SIZE;
                int idxByteSize = idxBuffer.size() * IDX_BUFFER_SIZE;

                vtxBuffer.getByteBuffer(vtxByteSize, vtxOffset, vertexByteBuffer);
                idxBuffer.getByteBuffer(idxByteSize, idxOffset, indexByteBuffer);

                vtxOffset += vtxByteSize;
                idxOffset += idxByteSize;
            }

            device.getQueue().writeBuffer(vertexBuffer, 0, vertexByteBuffer, vb_write_align_size);
            device.getQueue().writeBuffer(indexBuffer, 0, indexByteBuffer, ib_write_align_size);
        }
        else {
            for (int n = 0; n < cmdListsCount; n++) {
                ImDrawList cmdList = drawData.get_CmdLists(n);
                VecVtxBuffer vtxBuffer = cmdList.get_VtxBuffer();
                VecIdxBuffer idxBuffer = cmdList.get_IdxBuffer();

                vtxOffset = (int)memAlign(vtxOffset, 4);
                idxOffset = (int)memAlign(idxOffset, 4);

                int vtxByteSize = vtxBuffer.size() * VTX_BUFFER_SIZE;
                int idxByteSize = idxBuffer.size() * IDX_BUFFER_SIZE;
                int vb_write_align_size = (int)memAlign(vtxByteSize, 4);
                int ib_write_align_size = (int)memAlign(idxByteSize, 4);

                boolean useByteBuffer = true;

                if(useByteBuffer) {
                    int vtxBufferSize = 0;
                    if(vertexByteBuffer != null) {
                        vtxBufferSize = vertexByteBuffer.capacity();
                    }
                    if(vb_write_align_size > vtxBufferSize) {
                        if(vertexByteBuffer != null) {
                            BufferUtils.disposeUnsafeByteBuffer(vertexByteBuffer);
                        }
                        vertexByteBuffer = BufferUtils.newUnsafeByteBuffer(vb_write_align_size);
                    }

                    int idxBufferSize = 0;
                    if(indexByteBuffer != null) {
                        idxBufferSize = indexByteBuffer.capacity();
                    }
                    if(ib_write_align_size > idxBufferSize) {
                        if(indexByteBuffer != null) {
                            BufferUtils.disposeUnsafeByteBuffer(indexByteBuffer);
                        }
                        indexByteBuffer = BufferUtils.newUnsafeByteBuffer(ib_write_align_size);
                    }

                    vtxBuffer.getByteBuffer(vtxByteSize, 0, vertexByteBuffer);
                    idxBuffer.getByteBuffer(idxByteSize, 0, indexByteBuffer);

                    device.getQueue().writeBuffer(vertexBuffer, vtxOffset, vertexByteBuffer, vb_write_align_size);
                    device.getQueue().writeBuffer(indexBuffer, idxOffset, indexByteBuffer, ib_write_align_size);
                }
                else {
                    empty_01.native_copy(vtxBuffer.get_Data());
                    device.getQueue().writeBuffer(vertexBuffer, vtxOffset, empty_01, vb_write_align_size);
                    empty_01.native_copy(idxBuffer.get_Data());
                    device.getQueue().writeBuffer(indexBuffer, idxOffset, empty_01, ib_write_align_size);
                }

                vtxOffset += vb_write_align_size;
                idxOffset += ib_write_align_size;
            }
        }

        setupRenderState(displayX, displayY, displaySizeX, displaySizeY, frameScaleX, frameScaleY);

        int global_vtx_offset = 0;
        int global_idx_offset = 0;

        float clip_offX = displayX;
        float clip_offY = displayY;
        float clip_scaleX = frameScaleX;
        float clip_scaleY = frameScaleY;

        for (int n = 0; n < cmdListsCount; n++) {
            ImDrawList draw_list = drawData.get_CmdLists(n);
            VecCmdBuffer cmdBuffer = draw_list.get_CmdBuffer();

            VecVtxBuffer vtxBuffer = draw_list.get_VtxBuffer();
            VecIdxBuffer idxBuffer = draw_list.get_IdxBuffer();

            int vtxSize = vtxBuffer.size();
            int idxSize = idxBuffer.size();

            int cmdBufferSize = cmdBuffer.size();
            for (int cmd_i = 0; cmd_i < cmdBufferSize; cmd_i++) {
                ImDrawCmd pcmd = cmdBuffer.getData(cmd_i);
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
                if(clip_minX < 0) clip_minX = 0;
                if(clip_minY < 0) clip_minY = 0;
                if(clip_maxX > fb_width) { clip_maxX = fb_width; }
                if(clip_maxY > fb_height) { clip_maxY = fb_height; }
                if(clip_maxX <= clip_minX || clip_maxY <= clip_minY) {
                    continue;
                }
                WGPUBindGroup bg = fontBindGroup;
                renderPass.setBindGroup(1, bg);
                renderPass.setScissorRect((int) clip_minX, (int) clip_minY, (int) (clip_maxX - clip_minX), (int) (clip_maxY - clip_minY));
                renderPass.drawIndexed(pcmd.get_ElemCount(), 1, pcmd.get_IdxOffset() + global_idx_offset, pcmd.get_VtxOffset() + global_vtx_offset, 0);
            }

            global_idx_offset += idxSize;
            global_vtx_offset += vtxSize;
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

            orthoProj[0] = 2.0f / (R - L);
            orthoProj[1] = 0.0f;
            orthoProj[2] = 0.0f;
            orthoProj[3] = 0.0f;
            orthoProj[4] = 0.0f;
            orthoProj[5] = 2.0f / (T - B);
            orthoProj[6] = 0;
            orthoProj[7] = 0;
            orthoProj[8] = 0;
            orthoProj[9] = 0;
            orthoProj[10] = 0.5f;
            orthoProj[11] = 0f;
            orthoProj[12] = (R + L) / (L - R);
            orthoProj[13] = (T + B) / (B - T);
            orthoProj[14] = 0.5f;
            orthoProj[15] = 1.0f;

            int prjSizeBytes = 64;
            int gamaSizeBytes = 4;

            ByteBuffer projBuffer = ByteBuffer.allocateDirect(prjSizeBytes + gamaSizeBytes)
                    .order(ByteOrder.LITTLE_ENDIAN);
            FloatBuffer floatView = projBuffer.asFloatBuffer();
            floatView.put(orthoProj);
            floatView.put(1);
            device.getQueue().writeBuffer(uniformBuffer, 0, projBuffer, prjSizeBytes);
            device.getQueue().writeBuffer(uniformBuffer, prjSizeBytes, projBuffer, gamaSizeBytes);
        }

        // Setup viewport
        float fbWidth = displaySizeX * frameScaleX;
        float fbHeight = displaySizeY * frameScaleY;
        renderPass.setViewport(0, 0, fbWidth, fbHeight, 0, 1);

        // Bind shader and vertex buffers
        renderPass.setVertexBuffer(0, vertexBuffer, 0, vertexBufferSizeBytes);
        renderPass.setIndexBuffer(indexBuffer, WGPUIndexFormat.Uint16, 0, indexBufferSizeBytes);
        renderPass.setPipeline(pipeline);
        renderPass.setBindGroup(0, commonBindGroup);

        // Setup blend factor
        WGPUColor color = WGPUColor.obtain();
        color.setColor(0.f, 0.f, 0.f, 0.f);
        renderPass.setBlendConstant(color);
    }

    private void setupBuffers(int totalVtxCountBytes, int totalIdxCountBytes) {
        if (totalVtxCountBytes > vertexBufferSizeBytes) {
            if (vertexBuffer != null) {
                vertexBuffer.destroy();
                vertexBuffer.release();
                vertexBuffer.dispose();
            }
            vertexBufferSizeBytes = totalVtxCountBytes;
            int vertAligned = (int)memAlign(vertexBufferSizeBytes, 4);

            WGPUBufferDescriptor desc = WGPUBufferDescriptor.obtain();
            desc.setSize(vertAligned);
            desc.setUsage(WGPUBufferUsage.Vertex.or(WGPUBufferUsage.CopyDst));
            vertexBuffer = device.createBuffer(desc);
//            vertexBuffer.setLabel("Vertex Buffer");
        }
        if (totalIdxCountBytes > indexBufferSizeBytes) {
            if (indexBuffer != null) {
                indexBuffer.destroy();
                indexBuffer.release();
                indexBuffer.dispose();
            }
            indexBufferSizeBytes = totalIdxCountBytes;
            int vertAligned = (int)memAlign(indexBufferSizeBytes, 4);

            WGPUBufferDescriptor desc = WGPUBufferDescriptor.obtain();
            desc.setSize(vertAligned);
            desc.setUsage(WGPUBufferUsage.Index.or(WGPUBufferUsage.CopyDst));
            indexBuffer = device.createBuffer(desc);
//            indexBuffer.setLabel("Index Buffer");
        }
    }

    private static long memAlign(long size, long align) {
        return ((size + (align - 1)) & ~(align - 1));
    }

    public boolean getGamma(WGPUTextureFormat surfaceFormat) {
        switch(surfaceFormat) {
            case RGBA8UnormSrgb:
            case BGRA8UnormSrgb:
            case BC2RGBAUnormSrgb:
            case BC3RGBAUnormSrgb:
            case BC7RGBAUnormSrgb:
            case ETC2RGBA8UnormSrgb:
                return true;
            case RGBA8Unorm:
            case BGRA8Unorm:
            case BC2RGBAUnorm:
            case BC3RGBAUnorm:
            case BC7RGBAUnorm:
            case ETC2RGBA8Unorm:
                return false;
        }
        return false;
    }

    private String getShader(boolean useGamma) {
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
                "@group(0) @binding(1) var s: sampler;\n" +
                "@group(1) @binding(0) var t: texture_2d<f32>;\n" +
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
                "@fragment\n" +
                "fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {\n" +
                "    let color = in.color * textureSample(t, s, in.uv);\n";
        if(useGamma) {
            wgslCode += "    let corrected_color = pow(color.rgb, vec3<f32>(2.2));\n" +
                        "    return vec4<f32>(corrected_color, color.a);\n";
        }
        else {
            wgslCode += "    return color;\n";
        }
        wgslCode += "}\n";
        return wgslCode;
    }
}
