package imgui.gdx;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.VertexAttribute;
import com.badlogic.gdx.graphics.VertexAttributes;
import com.badlogic.gdx.graphics.VertexAttributes.Usage;
import com.badlogic.gdx.graphics.glutils.GLVersion;
import com.badlogic.gdx.graphics.glutils.ShaderProgram;
import com.badlogic.gdx.math.Matrix4;
import com.badlogic.gdx.utils.BufferUtils;
import com.github.xpenatan.jParser.idl.IDLBase;
import imgui.ClipboardTextFunction;
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
import imgui.idl.helper.IDLIntArray;
import imgui.idl.helper.IDLString;
import java.nio.ByteBuffer;
import java.nio.IntBuffer;

/**
 * @author xpenatan
 */
public class ImGuiGdxImpl implements ImGuiImpl {

    private final static int VTX_BUFFER_SIZE = 8 + 8 + 4;// = ImVec2 + ImVec2 + ImU32;
    private final static int IDX_BUFFER_SIZE = 2; // short

    private VertexAttributes vertexAttributes;

    private int VboHandle;
    private int ElementsHandle;
    private Matrix4 matrix = new Matrix4();

    private ShaderProgram shader;

    private int g_FontTexture = 0;

    final static IntBuffer tmpHandle = BufferUtils.newIntBuffer(1);
    int vaoHandle = -1;

    int glVersion;
    boolean isGL30 = false;
    boolean isGL32 = false;

    private FileHandle imgui;

    private ByteBuffer vertexByteBuffer;
    private ByteBuffer indexByteBuffer;

    public ImGuiGdxImpl() {
        this(Gdx.files.local("imgui.ini"));
    }

    public ImGuiGdxImpl(FileHandle imgui) {
        this.imgui = imgui;

        vertexAttributes = new VertexAttributes(
                new VertexAttribute(Usage.Position, 2, GL20.GL_FLOAT, false, "Position"),
                new VertexAttribute(Usage.TextureCoordinates, 2, GL20.GL_FLOAT, false, "UV"),
                new VertexAttribute(Usage.ColorPacked, 4, GL20.GL_UNSIGNED_BYTE, true, "Color")
        );

        GLVersion glVersionObj = Gdx.graphics.getGLVersion();
        glVersion = glVersionObj.getMajorVersion() * 100 + glVersionObj.getMinorVersion() * 10;
        isGL30 = Gdx.graphics.isGL30Available();
        isGL32 = Gdx.graphics.isGL32Available();

        String vertex = getVertexShaderGlsl130();
        String fragment = getFragmentShaderGlsl130();
        if(isGL30) {
            vertex = getVertexShaderGlsl300es();
            fragment = getFragmentShaderGlsl300es();
        }

        shader = new ShaderProgram(vertex, fragment);
        if(shader.isCompiled() == false) {
            Gdx.app.log("ShaderTest", shader.getLog());
            Gdx.app.exit();
        }

        createBufferObject();

        if(imgui != null) {
            boolean exists = imgui.exists();
            if(exists) {
                String iniData = imgui.readString();
                if(!iniData.isEmpty()) {
                    ImGui.LoadIniSettingsFromMemory(iniData);
                }
            }
        }

        ImGui.GetIO().SetClipboardTextFunction(new ClipboardTextFunction() {
            @Override
            public void onGetClipboardText(IDLString strOut) {
                String contents = Gdx.app.getClipboard().getContents();
                strOut.append(contents);
            }

            @Override
            public void onSetClipboardText(IDLString text) {
                String contents = text.c_str();
                Gdx.app.getClipboard().setContents(contents);
            }
        });
    }

    private void prepareFont() {
        IDLIntArray width = new IDLIntArray(1);
        IDLIntArray height = new IDLIntArray(1);
        IDLByteArray bytesArray = new IDLByteArray(1);

        ImGuiIO io = ImGui.GetIO();
        ImFontAtlas fonts = io.get_Fonts();
        fonts.GetTexDataAsRGBA32(bytesArray, width, height);
        int widthValue = width.getValue(0);
        int heightValue = height.getValue(0);

        int size = bytesArray.getSize();
        ByteBuffer buffer = BufferUtils.newUnsafeByteBuffer(size);
        for(int i = 0; i < size; i++) {
            buffer.put(i, bytesArray.getValue(i));
        }
        buffer.position(0);
        buffer.limit(size);

        g_FontTexture = Gdx.gl.glGenTexture();

        Gdx.gl.glBindTexture(GL20.GL_TEXTURE_2D, g_FontTexture);
        Gdx.gl.glTexParameteri(GL20.GL_TEXTURE_2D, GL20.GL_TEXTURE_MIN_FILTER, GL20.GL_LINEAR);
        Gdx.gl.glTexParameteri(GL20.GL_TEXTURE_2D, GL20.GL_TEXTURE_MAG_FILTER, GL20.GL_LINEAR);

        Gdx.gl.glPixelStorei(GL20.GL_UNPACK_ALIGNMENT, 1);
        Gdx.gl.glTexImage2D(GL20.GL_TEXTURE_2D, 0, GL20.GL_RGBA, widthValue, heightValue, 0, GL20.GL_RGBA,
                GL20.GL_UNSIGNED_BYTE, buffer);

        BufferUtils.disposeUnsafeByteBuffer(buffer);
        IDLBase textureId = new IDLBase();
        textureId.native_setVoid(g_FontTexture);
        io.get_Fonts().set_TexID(textureId);
    }

    private void createBufferObject() {
        VboHandle = Gdx.gl20.glGenBuffer();
        ElementsHandle = Gdx.gl20.glGenBuffer();
    }

    public void newFrame() {
        float deltaTime = Gdx.graphics.getDeltaTime();
        int width = Gdx.graphics.getWidth();
        int height = Gdx.graphics.getHeight();
        int backBufferWidth = Gdx.graphics.getBackBufferWidth();
        int backBufferHeight = Gdx.graphics.getBackBufferHeight();

        if(g_FontTexture == 0) {
            prepareFont();
        }
        updateFrame(deltaTime, width, height, backBufferWidth, backBufferHeight);

        if(imgui != null) {
            ImGuiIO imGuiIO = ImGui.GetIO();
            if(imGuiIO.get_WantSaveIniSettings()) {
                imGuiIO.set_WantSaveIniSettings(false);
                saveImGuiData(imgui);
            }
        }
    }

    protected void updateFrame(float deltaTime, int width, int height, int backBufferWidth, int backBufferHeight) {
        ImGui.UpdateDisplayAndInputAndFrame(deltaTime, width, height, backBufferWidth, backBufferHeight);
    }

    public void render(ImDrawData drawData) {
        renderDrawData(drawData, 0);
    }

    public void renderDrawData(ImDrawData drawData, int id) {
        int cmdListsCount = drawData.get_CmdListsCount();
        if(cmdListsCount > 0) {

            int totalVtxCount = drawData.get_TotalVtxCount();
            int totalIdxCount = drawData.get_TotalIdxCount();

            boolean last_enable_blend = Gdx.gl.glIsEnabled(GL20.GL_BLEND);
            boolean last_enable_cull_face = Gdx.gl.glIsEnabled(GL20.GL_CULL_FACE);
            boolean last_enable_depth_test = Gdx.gl.glIsEnabled(GL20.GL_DEPTH_TEST);
            boolean last_enable_stencil_test = Gdx.gl.glIsEnabled(GL20.GL_STENCIL_TEST);
            boolean last_enable_scissor_test = Gdx.gl.glIsEnabled(GL20.GL_SCISSOR_TEST);

            ImVec2 displaySize = drawData.get_DisplaySize();
            ImVec2 framebufferScale = drawData.get_FramebufferScale();
            float frameBufferScaleX = framebufferScale.get_x();
            float frameBufferScaleY = framebufferScale.get_y();
            ImVec2 displayPos = drawData.get_DisplayPos();

            int fb_width = (int)(displaySize.get_x() * frameBufferScaleX);
            int fb_height = (int)(displaySize.get_y() * frameBufferScaleY);

            bind(drawData, fb_width, fb_height);

            float clip_offX = displayPos.get_x(); // (0,0) unless using multi-viewports
            float clip_offY = displayPos.get_y();
            float clip_scaleX = frameBufferScaleX; // (1,1) unless using retina display which are often (2,2)
            float clip_scaleY = frameBufferScaleY;

            for(int i = 0; i < cmdListsCount; i++) {
                ImDrawList imDrawList = drawData.get_CmdLists(i);
                VecCmdBuffer cmdBuffer = imDrawList.get_CmdBuffer();

                VecVtxBuffer vtxBuffer = imDrawList.get_VtxBuffer();
                VecIdxBuffer idxBuffer = imDrawList.get_IdxBuffer();

                int vtxByteSize = vtxBuffer.size() * VTX_BUFFER_SIZE;
                int idxByteSize = idxBuffer.size() * IDX_BUFFER_SIZE;

                int vtxBufferSize = 0;
                if(vertexByteBuffer != null) {
                    vtxBufferSize = vertexByteBuffer.capacity();
                }
                if(vtxByteSize > vtxBufferSize) {
                    if(vertexByteBuffer != null) {
                        BufferUtils.disposeUnsafeByteBuffer(vertexByteBuffer);
                    }
                    vertexByteBuffer = BufferUtils.newUnsafeByteBuffer(vtxByteSize + 5000);
                }
                int idxBufferSize = 0;
                if(indexByteBuffer != null) {
                    idxBufferSize = indexByteBuffer.capacity();
                }
                if(idxByteSize > idxBufferSize) {
                    if(indexByteBuffer != null) {
                        BufferUtils.disposeUnsafeByteBuffer(indexByteBuffer);
                    }
                    indexByteBuffer = BufferUtils.newUnsafeByteBuffer(idxByteSize + 5000);
                }

                vtxBuffer.getByteBuffer(vtxByteSize, 0, vertexByteBuffer);
                idxBuffer.getByteBuffer(idxByteSize, 0, indexByteBuffer);

                Gdx.gl.glBufferData(GL20.GL_ARRAY_BUFFER, vtxByteSize, vertexByteBuffer, GL20.GL_STREAM_DRAW);
                Gdx.gl.glBufferData(GL20.GL_ELEMENT_ARRAY_BUFFER, idxByteSize, indexByteBuffer, GL20.GL_STREAM_DRAW);

                int cmdBufferSize = cmdBuffer.size();
                for(int j = 0; j < cmdBufferSize; j++) {
                    ImDrawCmd drawCmd = cmdBuffer.getData(j);
                    ImVec4 clipRect = drawCmd.get_ClipRect();
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

                    Gdx.gl.glScissor((int)clip_minX, (int)(fb_height - clip_maxY), (int)(clip_maxX - clip_minX), (int)(clip_maxY - clip_minY));

                    int idxOffset = drawCmd.get_IdxOffset();
                    int vtxOffset = drawCmd.get_VtxOffset();
                    int elemCount = drawCmd.get_ElemCount();
                    int indices = idxOffset * 2;
                    Gdx.gl.glBindTexture(GL20.GL_TEXTURE_2D, g_FontTexture);
                    Gdx.gl.glDrawElements(GL20.GL_TRIANGLES, elemCount, GL20.GL_UNSIGNED_SHORT, indices);
                }
            }

            unbind();

            if(last_enable_blend) {
                Gdx.gl.glEnable(GL20.GL_BLEND);
            }
            else {
                Gdx.gl.glDisable(GL20.GL_BLEND);
            }
            if(last_enable_cull_face) {
                Gdx.gl.glEnable(GL20.GL_CULL_FACE);
            }
            else {
                Gdx.gl.glDisable(GL20.GL_CULL_FACE);
            }
            if(last_enable_depth_test) {
                Gdx.gl.glEnable(GL20.GL_DEPTH_TEST);
            }
            else {
                Gdx.gl.glDisable(GL20.GL_DEPTH_TEST);
            }
            if(last_enable_stencil_test) {
                Gdx.gl.glEnable(GL20.GL_STENCIL_TEST);
            }
            else {
                Gdx.gl.glDisable(GL20.GL_STENCIL_TEST);
            }
            if(last_enable_scissor_test) {
                Gdx.gl.glEnable(GL20.GL_SCISSOR_TEST);
            }
            else {
                Gdx.gl.glDisable(GL20.GL_SCISSOR_TEST);
            }
        }
    }

    private void bind(ImDrawData drawData, int fb_width, int fb_height) {
        Gdx.gl.glEnable(GL20.GL_BLEND);
        Gdx.gl.glBlendEquation(GL20.GL_FUNC_ADD);
        Gdx.gl.glBlendFuncSeparate(GL20.GL_SRC_ALPHA, GL20.GL_ONE_MINUS_SRC_ALPHA, GL20.GL_ONE, GL20.GL_ONE_MINUS_SRC_ALPHA);
        Gdx.gl.glDisable(GL20.GL_CULL_FACE);
        Gdx.gl.glDisable(GL20.GL_DEPTH_TEST);
        Gdx.gl.glDisable(GL20.GL_STENCIL_TEST);
        Gdx.gl.glEnable(GL20.GL_SCISSOR_TEST);

        ImVec2 displayPos = drawData.get_DisplayPos();
        ImVec2 displaySize = drawData.get_DisplaySize();

        float displayX = displayPos.get_x();
        float displayY = displayPos.get_y();

        float L = displayX;
        float R = displayX + displaySize.get_x();
        float T = displayY;
        float B = displayY + displaySize.get_y();

        matrix.val[0] = 2.0f / (R - L);
        matrix.val[1] = 0.0f;
        matrix.val[2] = 0.0f;
        matrix.val[3] = 0.0f;
        matrix.val[4] = 0.0f;
        matrix.val[5] = 2.0f / (T - B);
        matrix.val[6] = 0;
        matrix.val[7] = 0;
        matrix.val[8] = 0;
        matrix.val[9] = 0;
        matrix.val[10] = -1.0f;
        matrix.val[11] = 0f;
        matrix.val[12] = (R + L) / (L - R);
        matrix.val[13] = (T + B) / (B - T);
        matrix.val[14] = 0;
        matrix.val[15] = 1.0f;

        shader.bind();
        shader.setUniformi("Texture", 0);
        shader.setUniformMatrix("ProjMtx", matrix);

        if(isGL30) {
            Gdx.gl30.glGenVertexArrays(1, tmpHandle);
            vaoHandle = tmpHandle.get();
            Gdx.gl30.glBindVertexArray(vaoHandle);
        }

        Gdx.gl.glBindBuffer(GL20.GL_ARRAY_BUFFER, VboHandle);
        Gdx.gl.glBindBuffer(GL20.GL_ELEMENT_ARRAY_BUFFER, ElementsHandle);
        // bind vertices/indices
        final int numAttributes = vertexAttributes.size();
        for(int i = 0; i < numAttributes; i++) {
            final VertexAttribute attribute = vertexAttributes.get(i);
            final int location = shader.getAttributeLocation(attribute.alias);
            if(location < 0) continue;
            shader.enableVertexAttribute(location);
            shader.setVertexAttribute(location, attribute.numComponents, attribute.type, attribute.normalized,
                    vertexAttributes.vertexSize, attribute.offset);
        }
    }

    public void unbind() {
        // unbind vertice
        Gdx.gl.glBindBuffer(GL20.GL_ARRAY_BUFFER, 0);
        final int numAttributes = vertexAttributes.size();
        for(int i = 0; i < numAttributes; i++) {
            shader.disableVertexAttribute(vertexAttributes.get(i).alias);
        }

        // unbind index
        Gdx.gl.glBindBuffer(GL20.GL_ELEMENT_ARRAY_BUFFER, 0);
        Gdx.gl.glFlush();

        if(isGL30) {
            tmpHandle.clear();
            tmpHandle.put(vaoHandle);
            tmpHandle.flip();
            Gdx.gl30.glDeleteVertexArrays(1, tmpHandle);
        }
    }

    private void deleteTexture() {
        if(g_FontTexture != 0) {
            Gdx.gl.glDeleteTexture(g_FontTexture);
            g_FontTexture = 0;
        }
    }

    public void dispose() {
        deleteTexture();

        if(vertexByteBuffer != null) {
            BufferUtils.disposeUnsafeByteBuffer(vertexByteBuffer);
        }
        if(indexByteBuffer != null) {
            BufferUtils.disposeUnsafeByteBuffer(indexByteBuffer);
        }

        // TODO fix exception
//		ImGui.DestroyPlatformWindows();
        Gdx.gl.glBindBuffer(GL20.GL_ELEMENT_ARRAY_BUFFER, 0);
        Gdx.gl.glDeleteBuffer(ElementsHandle);
        ElementsHandle = 0;
    }

    public void saveImGuiData(FileHandle path) {
        if(path != null) {
            IDLString idlString = ImGui.SaveIniSettingsToMemory();
            String s = idlString.c_str();
            path.writeString(s, false);
        }
    }

    private String vertex_shader_glsl_130 = "uniform mat4 ProjMtx;\n" +
            "attribute vec2 Position;\n"
            + "attribute vec2 UV;\n"
            + "attribute vec4 Color;\n"
            + "varying vec2 Frag_UV;\n"
            + "varying vec4 Frag_Color;\n"
            + "void main()\n"
            + "{\n"
            + "    Frag_UV = UV;\n"
            + "    Frag_Color = Color;\n"
            + "    gl_Position = ProjMtx * vec4(Position.xy,0,1);\n"
            + "}\n";

    private String fragment_shader_glsl_130 = "#ifdef GL_ES\n"
            + "    precision mediump float;\n"
            + "#endif\n"
            + "uniform sampler2D Texture;\n"
            + "varying vec2 Frag_UV;\n"
            + "varying vec4 Frag_Color;\n"
            + "void main()\n"
            + "{\n"
            + "    gl_FragColor = Frag_Color * texture2D(Texture, Frag_UV.st);\n"
            + "}\n";

    private String getVertexShaderGlsl130() {
        return ""
//                + "#version 130\n"
                + "uniform mat4 ProjMtx;\n"
                + "attribute vec2 Position;\n"
                + "attribute vec2 UV;\n"
                + "attribute vec4 Color;\n"
                + "varying vec2 Frag_UV;\n"
                + "varying vec4 Frag_Color;\n"
                + "void main()\n"
                + "{\n"
                + "    Frag_UV = UV;\n"
                + "    Frag_Color = Color;\n"
                + "    gl_Position = ProjMtx * vec4(Position.xy,0,1);\n"
                + "}\n";
    }

    private String getFragmentShaderGlsl130() {
        return ""
//                + "#version 130\n"
                + "#ifdef GL_ES\n"
                + "    precision mediump float;\n"
                + "#endif\n"
                + "uniform sampler2D Texture;\n"
                + "varying vec2 Frag_UV;\n"
                + "varying vec4 Frag_Color;\n"
                + "void main()\n"
                + "{\n"
                + "    gl_FragColor = Frag_Color * texture2D(Texture, Frag_UV.st);\n"
                + "}\n";
    }
    private String getVertexShaderGlsl300es() {
        return "#version 300 es\n"
                + "precision highp float;\n"
                + "layout (location = 0) in vec2 Position;\n"
                + "layout (location = 1) in vec2 UV;\n"
                + "layout (location = 2) in vec4 Color;\n"
                + "uniform mat4 ProjMtx;\n"
                + "out vec2 Frag_UV;\n"
                + "out vec4 Frag_Color;\n"
                + "void main()\n"
                + "{\n"
                + "    Frag_UV = UV;\n"
                + "    Frag_Color = Color;\n"
                + "    gl_Position = ProjMtx * vec4(Position.xy,0,1);\n"
                + "}\n";
    }

    private String getFragmentShaderGlsl300es() {
        return "#version 300 es\n"
                + "precision mediump float;\n"
                + "uniform sampler2D Texture;\n"
                + "in vec2 Frag_UV;\n"
                + "in vec4 Frag_Color;\n"
                + "layout (location = 0) out vec4 Out_Color;\n"
                + "void main()\n"
                + "{\n"
                + "    Out_Color = Frag_Color * texture(Texture, Frag_UV.st);\n"
                + "}\n";
    }
}
