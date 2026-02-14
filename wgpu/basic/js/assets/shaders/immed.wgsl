// immediate mode renderer

struct Uniforms {
    projectionMatrix: mat4x4f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var texture: texture_2d<f32>;
@group(0) @binding(2) var textureSampler: sampler;

struct VertexInput {
    @location(0) position: vec4f,
    @location(1) normal: vec3f,
    @location(2) color: vec4f,
    @location(3) uv: vec2f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv : vec2f,
    @location(1) color: vec4f,
};


@vertex
fn vs_main(in: VertexInput) -> VertexOutput {
   var out: VertexOutput;

   var pos =  uniforms.projectionMatrix * vec4f(in.position, 0.0, 1.0);
   out.position = pos;
   out.uv = in.uv;
   out.color = in.color;

   return out;
}

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {

    let color = in.color * textureSample(texture, textureSampler, in.uv);
#ifdef GAMMA_CORRECTION
    let linearColor: vec3f = pow(color.rgb, vec3f(1/2.2));
    color = vec4f(linearColor, color.a);
#endif
    return color;
}
