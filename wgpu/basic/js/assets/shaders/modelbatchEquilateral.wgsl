// Based on Learn OpenGL - IBL


struct FrameUniforms {
    projectionViewMatrix: mat4x4f
};


// Frame
@group(0) @binding(0) var<uniform> uFrame: FrameUniforms;


// Material
@group(1) @binding(1) var albedoTexture: texture_2d<f32>;
@group(1) @binding(2) var textureSampler: sampler;


struct VertexInput {
    @location(0) position: vec3f,
#ifdef TEXTURE_COORDINATE
    @location(1) uv: vec2f,
#endif
};

struct VertexOutput {
    @builtin(position)  position: vec4f,
    @location(1)        localPos: vec4f,
};

@vertex
fn vs_main(in: VertexInput, @builtin(instance_index) instance: u32) -> VertexOutput {
   var out: VertexOutput;

   out.localPos = vec4f(in.position, 1.0);
   out.position =  uFrame.projectionViewMatrix * vec4f(in.position, 1.0);
   return out;
}


const invAtan:vec2f = vec2f(0.1591, 0.3183);

fn sampleSphericalMap(v:vec3f) -> vec2f {
    var uv:vec2f = vec2f(atan2(v.z, v.x), asin(-v.y));
    uv *= invAtan;
    uv += 0.5;
    return uv;
}


@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {

    let uv:vec2f = sampleSphericalMap(normalize(in.localPos.xyz));
    let color = textureSample(albedoTexture, textureSampler, uv).rgb;

    return vec4f(color, 1);
}
