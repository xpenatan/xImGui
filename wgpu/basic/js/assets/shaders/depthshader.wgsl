// depth shader
// Copyright 2025 Monstrous Software.
// Licensed under the Apache License, Version 2.0 (the "License");



struct FrameUniforms {
    projectionViewTransform: mat4x4f,   // from light source point of view
};

struct ModelUniforms {
    modelMatrix: mat4x4f,
};

// note: we assume materials are all opaque

// frame bindings
@group(0) @binding(0) var<uniform> uFrame: FrameUniforms;

// renderables
@group(1) @binding(0) var<storage, read> instances: array<ModelUniforms>;

// Skinning
#ifdef SKIN
    @group(2) @binding(0) var<storage, read> jointMatrices: array<mat4x4f>;
#endif

struct VertexInput {
    @location(0) position: vec3f,
#ifdef SKIN
    @location(6) joints: vec4f,
    @location(7) weights: vec4f,
#endif
};

struct VertexOutput {
    @builtin(position) position: vec4f,
};


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
  let worldPosition =  instances[instance].modelMatrix * skinMatrix * vec4f(in.position, 1.0);
#else
  let worldPosition =  instances[instance].modelMatrix * vec4f(in.position, 1.0);
#endif
   out.position =   uFrame.projectionViewTransform * worldPosition;
   return out;
}


