// spritebatch-sdf.wgsl
// assumes texture and no vertex color

struct Uniforms {
    projectionViewTransform: mat4x4f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var texture: texture_2d<f32>;
@group(0) @binding(2) var textureSampler: sampler;


struct VertexInput {
    @location(0) position: vec2f,
    @location(1) uv: vec2f,
};

struct VertexOutput {
    @builtin(position) position: vec4f,

    @location(0) uv : vec2f,

    @location(1) color: vec4f,
};

// this should maybe be a uniform, but we want to stay compatible with sprite.wgsl
const smoothing : f32 = 1/16.0;

@vertex
fn vs_main(in: VertexInput) -> VertexOutput {
   var out: VertexOutput;

   var pos =  uniforms.projectionViewTransform * vec4f(in.position, 0.0, 1.0);
   out.position = pos;

   out.uv = in.uv;



   let color:vec4f = vec4f(1,1,1,1);   // white

   out.color = color;

   return out;
}

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {


    let distance : f32 = textureSample(texture, textureSampler, in.uv).a;
    let alpha : f32 = smoothstep( 0.5 - smoothing, 0.5 + smoothing, distance);

    var color = vec4f(in.color.rgb, alpha * in.color.a);

#ifdef GAMMA_CORRECTION
    let linearColor: vec3f = pow(color.rgb, vec3f(1/2.2));
    color = vec4f(linearColor, color.a);
#endif

    return color;
};
