// Skybox shader
//
// based on: https://webgpufundamentals.org/webgpu/lessons/webgpu-skybox.html

struct Uniforms {
    inverseProjectionViewMatrix: mat4x4f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var cubeMap: texture_cube<f32>;
@group(0) @binding(2) var cubeMapSampler: sampler;


struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) pos: vec4f,
};

@vertex
fn vs_main(@builtin(vertex_index) index: u32) -> VertexOutput {
     let pos = array (
       vec2f(-1, 3),
       vec2f(-1,-1),
       vec2f( 3,-1),
     );

    var out: VertexOutput;

    out.position = vec4f(pos[index], 1, 1);
    out.pos = out.position;
    return out;
}

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {

    let t = uniforms.inverseProjectionViewMatrix * in.pos;
    var color:vec3f = textureSample(cubeMap, cubeMapSampler, normalize(t.xyz / t.w) * vec3f(1, 1, -1)).rgb;

#ifdef GAMMA_CORRECTION
    let linearColor: vec3f = pow(color.rgb, vec3f(1/2.2));
    color = linearColor;
#endif

    return vec4f(color, 1f);
}
