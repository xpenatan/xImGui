// Synthesize an environment map


struct FrameUniforms {
    combinedMatrix : mat4x4f,
    sunColor: vec4f,
    sunDirection: vec4f,        // vector towards the sun

};



// Group 0 - Frame

// Frame
@group(0) @binding(0) var<uniform> uFrame: FrameUniforms;


struct VertexInput {
    @location(0) position: vec3f,
};

struct VertexOutput {
    @builtin(position)  position: vec4f,
    @location(1)        localPos: vec4f,
};

@vertex
fn vs_main(in: VertexInput, @builtin(instance_index) instance: u32) -> VertexOutput {
   var out: VertexOutput;

   out.localPos = vec4f(in.position, 1.0);
   out.position =  uFrame.combinedMatrix * vec4f(in.position, 1.0);
   return out;
}


const nearGroundColor : vec3f = vec3f(.2f, .15f, .1f);
const farGroundColor : vec3f = vec3f(.1f, .05f, .0f);
const nearSkyColor : vec3f = vec3f(.4, .5, 1);
const farSkyColor : vec3f = vec3f(.8f, .85f, 1);
const sunExponent = 60;
const UP : vec3f = vec3f(0,1,0);

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {

    let N:vec3f = normalize(in.localPos.xyz);

    let ht: f32 = dot(N, UP);

    var col: vec3f;
    if(ht > 0){
       col = mix( farSkyColor, nearSkyColor,  pow(ht, 0.25));

       // add sunlight
       let sunDirection : vec3f = normalize(uFrame.sunDirection.xyz );
       var rate: f32 = max(dot(N,sunDirection), 0);
       rate = pow(rate, sunExponent);
       col += rate * uFrame.sunColor.rgb;

    } else {
       col = mix(nearGroundColor, farGroundColor,  -ht);
    }
//    return vec4f(pow(col.rgb, vec3(1/2.2)),  1.0);
    return vec4f(col,  1.0);
}
