// basic ModelBatch shader
// Copyright 2025 Monstrous Software.
// Licensed under the Apache License, Version 2.0 (the "License");

// Note this is an uber shader with conditional compilation depending on #define values from the shader prefix

struct DirectionalLight {
    color: vec4f,
    direction: vec4f
}

struct PointLight {
    color: vec4f,
    position: vec4f,
    intensity: f32
}

struct FrameUniforms {
    projectionViewTransform: mat4x4f,
    shadowProjViewTransform: mat4x4f,
#ifdef MAX_DIR_LIGHTS
    directionalLights : array<DirectionalLight, MAX_DIR_LIGHTS>,
#endif
#ifdef MAX_POINT_LIGHTS
    pointLights : array<PointLight, MAX_POINT_LIGHTS>,
#endif
    ambientLight: vec4f,
    cameraPosition: vec4f,
    fogColor: vec4f,
    numDirectionalLights: f32,
    numPointLights: f32,
    shadowPcfOffset: f32,
    shadowBias: f32,
    normalMapStrength: f32,
    numRoughnessLevels: f32,
};

struct ModelUniforms {
    modelMatrix: mat4x4f,
    normalMatrix: mat4x4f,
};

struct MaterialUniforms {
    diffuseColor: vec4f,
    shininess: f32,
    roughnessFactor: f32,
    metallicFactor: f32,
};

// frame bindings
@group(0) @binding(0) var<uniform> uFrame: FrameUniforms;
#ifdef SHADOW_MAP
    @group(0) @binding(1) var shadowMap: texture_depth_2d;
    @group(0) @binding(2) var shadowSampler: sampler_comparison;
#endif
#ifdef ENVIRONMENT_MAP
    @group(0) @binding(3) var cubeMap:          texture_cube<f32>;
    @group(0) @binding(4) var cubeMapSampler:   sampler;
#endif
#ifdef USE_IBL
    @group(0) @binding(5) var irradianceMap:    texture_cube<f32>;
    @group(0) @binding(6) var irradianceSampler:       sampler;
    @group(0) @binding(7) var radianceMap:    texture_cube<f32>;
    @group(0) @binding(8) var radianceSampler:       sampler;
    @group(0) @binding(9) var brdfLUT:    texture_2d<f32>;
    @group(0) @binding(10) var lutSampler:       sampler;
#endif

// material bindings
@group(1) @binding(0) var<uniform> material: MaterialUniforms;
@group(1) @binding(1) var diffuseTexture: texture_2d<f32>;
@group(1) @binding(2) var diffuseSampler: sampler;
@group(1) @binding(3) var normalTexture: texture_2d<f32>;
@group(1) @binding(4) var normalSampler: sampler;
@group(1) @binding(5) var metallicRoughnessTexture: texture_2d<f32>;
@group(1) @binding(6) var metallicRoughnessSampler: sampler;
@group(1) @binding(7) var emissiveTexture: texture_2d<f32>;
@group(1) @binding(8) var emissiveSampler: sampler;

// renderables
@group(2) @binding(0) var<storage, read> instances: array<ModelUniforms>;

// Skinning
#ifdef SKIN
    @group(3) @binding(0) var<storage, read> jointMatrices: array<mat4x4f>;
#endif

struct VertexInput {
    @location(0) position: vec3f,
#ifdef TEXTURE_COORDINATE
    @location(1) uv: vec2f,
#endif
#ifdef NORMAL
    @location(2) normal: vec3f,
#endif
#ifdef NORMAL_MAP
    @location(3) tangent: vec3f,
    @location(4) bitangent: vec3f,
#endif
#ifdef COLOR
    @location(5) color: vec4f,
#endif
#ifdef SKIN
    @location(6) joints: vec4f,
    @location(7) weights: vec4f,
#endif

};

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(1) uv: vec2f,
    @location(2) color: vec4f,
    @location(3) normal: vec3f,
    @location(4) worldPos : vec3f,
#ifdef NORMAL_MAP
    @location(5) tangent: vec3f,
    @location(6) bitangent: vec3f,
#endif
#ifdef FOG
    @location(7) fogDepth: f32,
#endif
#ifdef SHADOW_MAP
    @location(8)  shadowPos: vec3f,
#endif
};

const pi : f32 = 3.14159265359;

@vertex
fn vs_main(in: VertexInput, @builtin(instance_index) instance: u32) -> VertexOutput {
   var out: VertexOutput;


#ifdef SKIN
     // Get relevant 4 bone matrices
     // joint matrix is already multiplied by inv bind matrix in Node.calculateBoneTransform
     let joint0 = jointMatrices[u32(in.joints[0])];
     let joint1 = jointMatrices[u32(in.joints[1])];
     let joint2 = jointMatrices[u32(in.joints[2])];
     let joint3 = jointMatrices[u32(in.joints[3])];

     // Compute influence of joint based on weight
     let skinMatrix =
       joint0 * in.weights[0] +
       joint1 * in.weights[1] +
       joint2 * in.weights[2] +
       joint3 * in.weights[3];

     // Bone transformed mesh
   let worldPosition =   instances[instance].modelMatrix * skinMatrix * vec4f(in.position, 1.0);
#else
   let worldPosition =  instances[instance].modelMatrix * vec4f(in.position, 1.0);
#endif

   out.position =   uFrame.projectionViewTransform * worldPosition;
   out.worldPos = worldPosition.xyz;
#ifdef TEXTURE_COORDINATE
   out.uv = in.uv;
#else
   out.uv = vec2f(0);
#endif

#ifdef COLOR
   var diffuseColor = in.color;
#else
   var diffuseColor = vec4f(1); // default white
#endif
   diffuseColor *= material.diffuseColor;
   out.color = diffuseColor;

#ifdef NORMAL
   // transform model normal to a world normal
   let normal = normalize((instances[instance].normalMatrix * vec4f(in.normal, 0.0)).xyz);
#else
   let normal = vec3f(0,1,0);
#endif
    out.normal = normal;

#ifdef NORMAL_MAP
    out.tangent = in.tangent;
    out.bitangent = in.bitangent;
#endif

#ifdef FOG
    let flen:vec3f = uFrame.cameraPosition.xyz - worldPosition.xyz;
    let fog:f32 = dot(flen, flen) * uFrame.cameraPosition.w;
    out.fogDepth = min(fog, 1.0);
#endif

#ifdef SHADOW_MAP
  // XY is in (-1, 1) space, Z is in (0, 1) space
  let posFromLight = uFrame.shadowProjViewTransform * worldPosition;

  // Convert XY to (0, 1)
  // Y is flipped because texture coords are Y-down.
  out.shadowPos = vec3(
    posFromLight.xy * vec2(0.5, -0.5) + vec2(0.5),
    posFromLight.z
  );
#endif

   return out;
}


@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {
#ifdef TEXTURE_COORDINATE
   var color = in.color * textureSample(diffuseTexture, diffuseSampler, in.uv);
#else
   var color = in.color;
#endif

#ifdef SHADOW_MAP
    let visibility = getShadowNess(in.shadowPos);
#else
    let visibility = 1.0;
#endif

#ifdef LIGHTING
    let baseColor = color;

#ifdef NORMAL_MAP
    let encodedN = textureSample(normalTexture, normalSampler, in.uv).rgb;
    let localN = encodedN * 2.0 - 1.0;
    // The TBN matrix converts directions from the local space to the world space
    let localToWorld = mat3x3f(
        normalize(in.tangent),
        normalize(in.bitangent),
        normalize(in.normal),
    );
    let worldN = localToWorld * localN;
    let normal = mix(in.normal.xyz, worldN, uFrame.normalMapStrength);
#else // NORMAL_MAP
    let normal = normalize(in.normal.xyz);
#endif

    // metallic is coded in the blue channel and roughness in the green channel of the MR texture
    let mrSample = textureSample(metallicRoughnessTexture, metallicRoughnessSampler, in.uv).rgb;

    let roughness : f32 = mrSample.g * material.roughnessFactor;
    let metallic : f32 = mrSample.b * material.metallicFactor;

    let shininess : f32 = material.shininess;   // used instead of roughness for non-PBR

    var radiance : vec3f = vec3f(0);    // outgoing radiance (Lo)
    var specular : vec3f = vec3f(0);
    let viewVec : vec3f = normalize(uFrame.cameraPosition.xyz - in.worldPos.xyz);

#ifdef USE_IBL
    let ambient : vec3f = ambientIBL( viewVec, normal, roughness, metallic, baseColor.rgb);
#else
    let ambient : vec3f = uFrame.ambientLight.rgb * baseColor.rgb;
#endif

#ifdef MAX_DIR_LIGHTS
    // for each directional light
    // could go to vertex shader but esp. specular lighting will be lower quality
    let numDirectionalLights = min(uFrame.numDirectionalLights, MAX_DIR_LIGHTS);     // fail-safe
    if(numDirectionalLights > 0) {
        for (var i: u32 = 0; i < u32(numDirectionalLights); i++) {
            let light = uFrame.directionalLights[i];

            let lightVec = -normalize(light.direction.xyz);       // L is unit vector towards light source
            let NdotL = max(dot(lightVec, normal), 0.0);
#ifdef PBR
            if(NdotL > 0.0) {
                radiance += BRDF(lightVec, viewVec, normal, roughness, metallic, baseColor.rgb) * NdotL *  light.color.rgb;
            }
#else
            radiance += NdotL *  light.color.rgb;
    #ifdef SPECULAR
            let halfDotView = max(0.0, dot(normal, normalize(lightVec + viewVec)));
            specular += NdotL *  light.color.rgb * pow(halfDotView, shininess);
    #endif
#endif // PBR
        }
    }
#endif //MAX_DIR_LIGHTS

#ifdef MAX_POINT_LIGHTS
    // for each point light
    // note: default libgdx seems to ignore intensity of point lights
    let numPointLights = min(uFrame.numPointLights, MAX_POINT_LIGHTS); // fail-safe
    if(numPointLights > 0) {
        for (var i: u32 = 0; i < u32(numPointLights); i++) {
            let light = uFrame.pointLights[i];

            var lightVec = light.position.xyz - in.worldPos.xyz;       // L is vector towards light
            let dist2 : f32 = dot(lightVec,lightVec);
            lightVec  = normalize(lightVec);
            let attenuation : f32 = light.intensity/(1.0 + dist2);// attenuation (note this makes an assumption on the world scale)
            let NdotL : f32 = max(dot(lightVec, normal), 0.0);
#ifdef PBR
            if(NdotL > 0.0) {
                radiance += BRDF(lightVec, viewVec, normal, roughness, metallic, baseColor.rgb) * NdotL *  attenuation * light.color.rgb;
            }
#else
            radiance += NdotL *  attenuation * light.color.rgb;
#ifdef SPECULAR
            let halfDotView = max(0.0, dot(normal, normalize(lightVec + viewVec)));
            specular += NdotL *  attenuation * light.color.rgb * pow(halfDotView, shininess);
#endif
#endif // PBR
        }
    }
#endif // MAX_POINT_LIGHTS

#ifdef PBR
    let litColor = vec4f(ambient + visibility*radiance, 1.0);
#else
    let litColor = vec4f( ambient + color.rgb * (visibility * radiance) + visibility*specular, 1.0);
#endif

    color = litColor;

#ifndef USE_IBL
    #ifdef ENVIRONMENT_MAP
        let rdir:vec3f = normalize(reflect(viewVec, normal)*vec3f(-1, -1, 1));
        var reflection = textureSample(cubeMap, cubeMapSampler, rdir);
        color = mix(color, reflection, 0.1f);       // todo scale is arbitrary
    #endif
#endif


#endif // LIGHTING

    let emissiveColor = textureSample(emissiveTexture, emissiveSampler, in.uv).rgb;
    color = color + vec4f(emissiveColor, 0);


#ifdef FOG
    color = vec4f(mix(color.rgb, uFrame.fogColor.rgb, in.fogDepth), color.a);
#endif


#ifdef GAMMA_CORRECTION
    let linearColor: vec3f = pow(color.rgb, vec3f(1/2.2));
    color = vec4f(linearColor, color.a);
#endif

    //return(vec4f(0.0, roughness, metallic, 1.0));

    //return vec4f(emissiveColor, 1.0);
    //return vec4f(normal, 1.0);
    //return vec4f(viewVec, 1.0);
    //return vec4f(rdir, 1.0);
    //return vec4f(uFrame.ambientLight.rgb, 1.0);
    //return material.diffuseColor;
    //return vec4f(in.fogDepth, 0, 0, 1);
    //return vec4f(ambient, 1.0);

    return color;
};

#ifdef SHADOW_MAP
// returns value 0..1 for the amount of "sunlight"
fn getShadowNess( shadowPos:vec3f ) -> f32 {

    // PCF filtering: take 9 samples and use the average value
    var visibility = 0.0;
    for( var y = -1; y <= 1; y++){
        for( var x = -1; x <= 1; x++){
        let offset = vec2f(vec2(x,y)) * uFrame.shadowPcfOffset;  //oneOverDepthTextureSize
            // returns 0 or 1
            visibility += textureSampleCompare(shadowMap, shadowSampler, shadowPos.xy+offset, shadowPos.z - uFrame.shadowBias);
        }
    }
    visibility /= 9.0;  // divide by nr of samples
    return visibility;
}

fn getShadowSingleSample( shadowPos:vec3f ) -> f32 {
    return textureSampleCompare(shadowMap, shadowSampler, shadowPos.xy, shadowPos.z -  uFrame.shadowBias);
}
#endif


#ifdef PBR

// Normal distribution function
fn D_GGX(NdotH: f32, roughness: f32) -> f32 {
    let alpha : f32 = roughness * roughness;
    let alpha2 : f32 = alpha * alpha;
    let denom : f32 = (NdotH * NdotH) * (alpha2 - 1.0) + 1.0;
    return alpha2/(pi * denom * denom);
}

fn G_SchlickSmith_GGX(NdotL : f32, NdotV : f32, roughness : f32) -> f32 {
    let r : f32 = (roughness + 1.0);
    let k : f32 = (r*r)/8.0;

//    let alpha: f32 = roughness * roughness;
//    let k: f32 = alpha / 2.0;

    let GL : f32 = NdotL / (NdotL * (1.0 - k) + k);
    let GV : f32 = NdotV / (NdotV * (1.0 - k) + k);
    return GL * GV;
}


fn F_Schlick(cosTheta : f32, metallic : f32, baseColor : vec3f ) -> vec3f {
    let F0 : vec3f = mix(vec3(0.04), baseColor, metallic);
    let F : vec3f = F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
    return F;
}

fn BRDF( L : vec3f, V:vec3f, N: vec3f, roughness:f32, metallic:f32, baseColor: vec3f) -> vec3f {
    let H = normalize(V+L);
    let NdotV : f32 = clamp(dot(N, V), 0.0, 1.0);
    let NdotL : f32 = clamp(dot(N, L), 0.001, 1.0);
    let LdotH : f32 = clamp(dot(L, H), 0.0, 1.0);
    let NdotH : f32 = clamp(dot(N, H), 0.0, 1.0);
    let HdotV : f32 = clamp(dot(H, V), 0.0, 1.0);

    // calculate terms for microfacet shading model
    let D :f32      = D_GGX(NdotH, roughness);
    let G :f32      = G_SchlickSmith_GGX(NdotL, NdotV, roughness);
    let F :vec3f    = F_Schlick(HdotV, metallic, baseColor);

    let kS = F;
    let kD = (vec3f(1.0) - kS) * (1.0 - metallic);

    let specular : vec3f = D * F * G / (4.0 * max(NdotL, 0.0001) * max(NdotV, 0.0001));

    let diffuse : vec3f = kD * baseColor / pi;

    let Lo : vec3f = diffuse + specular;
    return Lo;
}

#ifdef USE_IBL
fn ambientIBL( V:vec3f, N: vec3f, roughness:f32, metallic:f32, baseColor: vec3f) -> vec3f {

    let NdotV : f32 = clamp(dot(N, V), 0.0, 1.0);
    let F :vec3f    =  F_Schlick(NdotV, metallic, baseColor);

    // kS = F, kD = 1 - kS;
    let kD = (vec3f(1.0) - F)*(1.0 - metallic);
    let lightSample:vec3f = normalize(N * vec3f(1, 1, -1));   // flip Z
    let irradiance:vec3f = textureSample(irradianceMap, irradianceSampler, lightSample).rgb;
    let diffuse:vec3f    = irradiance * baseColor.rgb;

    let maxReflectionLOD:f32 = f32(uFrame.numRoughnessLevels);
    let R:vec3f = reflect(-V, N)* vec3f(-1, 1, 1); // flip X
    let prefilteredColor:vec3f = textureSampleLevel(radianceMap, radianceSampler, R, roughness * maxReflectionLOD).rgb;
    let envBRDF = textureSample(brdfLUT, lutSampler, vec2(NdotV, roughness)).rg;
    let specular: vec3f = prefilteredColor * (F * envBRDF.x + envBRDF.y);
    let ambient:vec3f    = (kD * diffuse) + specular;

    return vec3f(ambient);
}
#endif // USE_IBL
#endif // PBR
