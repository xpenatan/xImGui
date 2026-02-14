// particles.wgsl
// to implement PointSprite particles
//

struct Uniforms {
    projectionViewTransform: mat4x4f,
    projectionTransform: mat4x4f
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var texture: texture_2d<f32>;
@group(0) @binding(2) var textureSampler: sampler;

struct VertexInput {
    @location(0) position: vec3f,
    @location(1) sizeAndRotation: vec3f,	    // scale, sin, cos
    @location(2) color: vec4f,
    @location(3) region: vec4f,			        // u1, v1, u2, v2

};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(2) color: vec4f,
    @location(3) corner: vec2f,
    @location(4) rotation: vec4f,
    @location(5) regionCenter: vec2f,
    @location(6) regionPos: vec2f,
    @location(7) regionSize: vec2f,
};

// to be called as draw(6, numVertices)

@vertex
fn vs_main(in: VertexInput, @builtin(vertex_index) ix: u32) -> VertexOutput {
   var out: VertexOutput;

   let quadpoints = array(
    vec2f(-1, -1),
    vec2f( 1, -1),
    vec2f(-1,  1),
    vec2f(-1,  1),
    vec2f( 1, -1),
    vec2f( 1,  1),
  );

   let pos:vec2f = quadpoints[ix];
   // adapt scale to aspect ratio
   let scale:vec4f = uniforms.projectionTransform * vec4f(0.5 * in.sizeAndRotation.x, 0.5*in.sizeAndRotation.x, 0, 1);
   let clipPos:vec4f =  uniforms.projectionViewTransform * vec4f(in.position, 1.0);
   let cornerPos:vec4f = vec4f(pos * scale.xy, 0, 0);	// screen space offset per quad corner
   out.position = clipPos + cornerPos;

   out.rotation = vec4f(in.sizeAndRotation.y, in.sizeAndRotation.z, -in.sizeAndRotation.z, in.sizeAndRotation.y);
   out.regionPos = in.region.xy;
   out.regionSize = in.region.zw - in.region.xy;
   out.regionCenter = 0.5 * (in.region.xy + in.region.zw);


#ifdef GAMMA_CORRECTION
   out.color = in.color;
#else
    // vertex tint needs to be linearized if output is Srgb
    // gamma tweaked to give reasonable output
   out.color = vec4f(pow(in.color.rgb, vec3f(1.6)),in.color.a);
#endif
   out.corner = pos * 0.5 + 0.5;
   return out;
}

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {

    let rotMat: mat2x2f = mat2x2f(in.rotation.x, in.rotation.y, in.rotation.z, in.rotation.w);
    let uv: vec2f =  in.regionPos + in.corner * in.regionSize -in.regionCenter;
    let texCoord: vec2f = rotMat * uv + in.regionCenter;

    // the texture should be a texture with premultiplied alpha and is taken as linear
    // in.color is in the color space of the render output (Rgb or Srgb)
    let texel = textureSample(texture, textureSampler, texCoord);
    var color =  in.color * texel;

    return color;
};
