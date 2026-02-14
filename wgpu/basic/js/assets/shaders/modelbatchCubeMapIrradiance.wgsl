// Based on Learn OpenGL - IBL Diffuse Irradiance
//https://learnopengl.com/PBR/IBL/Diffuse-irradiance


struct FrameUniforms {
    combinedMatrix : mat4x4f,
};


// Group 0 - Frame


// Frame
@group(0) @binding(0) var<uniform> uFrame: FrameUniforms;

@group(0) @binding(3) var cubeMap:          texture_cube<f32>;
@group(0) @binding(4) var cubeMapSampler:   sampler;


struct VertexInput {
    @location(0)        position: vec3f,
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

const  PI:f32 = 3.14159265359;

const sampleDelta:f32 = 0.05f;

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {


    // the sample direction equals the hemisphere's orientation
    let normal:vec3f = normalize(in.localPos.xyz);

	var irradiance:vec3f = vec3f(0.0);

	var up:vec3f    = vec3f(0.0, 1.0, 0.0);
	let right:vec3f = cross(up, normal);
	up              = cross(normal, right);

	var nrSamples:f32 = 0.0;
	for(var phi:f32 = 0.0; phi < 2.0 * PI; phi += sampleDelta)
	{
	    for(var theta:f32 = 0.0; theta < 0.5 * PI; theta += sampleDelta)
	    {
	        // spherical to cartesian (in tangent space)
	        let tangentSample:vec3f = vec3f(sin(theta) * cos(phi),  sin(theta) * sin(phi), cos(theta));
	        // tangent space to world
            let sampleVec:vec3f = tangentSample.x * right + tangentSample.y * up + tangentSample.z * normal;
	        irradiance += textureSample(cubeMap, cubeMapSampler, sampleVec*vec3(1,1,-1)).rgb * cos(theta) * sin(theta);
	        nrSamples += 1.0;
	    }
	}
	irradiance = PI * irradiance * (1.0 / nrSamples);

    return vec4f(irradiance, 1.0);
}
