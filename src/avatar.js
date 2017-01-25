function getAvatarProgramLocations(gl, avatarProgram) {
    avatarProgram.a_Position = gl.getAttribLocation(avatarProgram, 'a_Position');
    avatarProgram.u_MvpMatrix = gl.getUniformLocation(avatarProgram, 'u_MvpMatrix');
    avatarProgram.u_NormalMatrix = gl.getUniformLocation(avatarProgram, 'u_NormalMatrix'); 

    if (!avatarProgram.a_Position < 0 || !avatarProgram.u_MvpMatrix || !avatarProgram.u_NormalMatrix) {
      console.log('Failed to get the storage location of attribute or uniform variable');
      return;
    }

    return avatarProgram;

}


function initAvatarVertexBuffers(gl){
  // Vertex coordinate (prepare coordinates of cuboids for all segments)
  var vertices_foot = new Float32Array([ // Foot(2x1x3)
     1.0, 1.0, 5.5, -1.0, 1.0, 5.5, -1.0, 0.0, 5.5,  1.0, 0.0, 5.5, // v0-v1-v2-v3 front
     1.0, 1.0, 5.5,  1.0, 0.0, 5.5,  1.0, 0.0,-1.5,  1.0, 1.0,-1.5, // v0-v3-v4-v5 right
     1.0, 1.0, 5.5,  1.0, 1.0,-1.5, -1.0, 1.0,-1.5, -1.0, 1.0, 5.5, // v0-v5-v6-v1 up
    -1.0, 1.0, 5.5, -1.0, 1.0,-1.5, -1.0, 0.0,-1.5, -1.0, 0.0, 5.5, // v1-v6-v7-v2 left
    -1.0, 0.0,-1.5,  1.0, 0.0,-1.5,  1.0, 0.0, 5.5, -1.0, 0.0, 5.5, // v7-v4-v3-v2 down
     1.0, 0.0,-1.5, -1.0, 0.0,-1.5, -1.0, 1.0,-1.5,  1.0, 1.0,-1.5  // v4-v7-v6-v5 back
  ]);

  var vertices_body = new Float32Array([  // Body(10x12x5)
     5.0, 12.0, 2.5, -5.0, 12.0, 2.5, -5.0, 0.0, 2.5,  5.0, 0.0, 2.5, // v0-v1-v2-v3 front
     5.0, 12.0, 2.5,  5.0, 0.0, 2.5,  5.0, 0.0,-2.5,  5.0, 12.0,-2.5, // v0-v3-v4-v5 right
     5.0, 12.0, 2.5,  5.0, 12.0,-2.5, -5.0, 12.0,-2.5, -5.0, 12.0, 2.5, // v0-v5-v6-v1 up
    -5.0, 12.0, 2.5, -5.0, 12.0,-2.5, -5.0, 0.0,-2.5, -5.0, 0.0, 2.5, // v1-v6-v7-v2 left
    -5.0, 0.0,-2.5,  5.0, 0.0,-2.5,  5.0, 0.0, 2.5, -5.0, 0.0, 2.5, // v7-v4-v3-v2 down
     5.0, 0.0,-2.5, -5.0, 0.0,-2.5, -5.0, 12.0,-2.5,  5.0, 12.0,-2.5  // v4-v7-v6-v5 back
  ]);

  var vertices_UPhalfLeg = new Float32Array([  // halfLeg(2x4x2)
     1.0, -6.0, 1.0, -1.0, -6.0, 1.0, -1.0,  0.0, 1.0,  1.0,  0.0, 1.0, // v0-v1-v2-v3 front
     1.0, -6.0, 1.0,  1.0,  0.0, 1.0,  1.0,  0.0,-1.0,  1.0, -6.0,-1.0, // v0-v3-v4-v5 right
     1.0, -6.0, 1.0,  1.0, -6.0,-1.0, -1.0, -6.0,-1.0, -1.0, -6.0, 1.0, // v0-v5-v6-v1 up
    -1.0, -6.0, 1.0, -1.0, -6.0,-1.0, -1.0,  0.0,-1.0, -1.0,  0.0, 1.0, // v1-v6-v7-v2 left
    -1.0,  0.0,-1.0,  1.0,  0.0,-1.0,  1.0,  0.0, 1.0, -1.0,  0.0, 1.0, // v7-v4-v3-v2 down
     1.0,  0.0,-1.0, -1.0,  0.0,-1.0, -1.0, -6.0,-1.0,  1.0, -6.0,-1.0  // v4-v7-v6-v5 back
  ]);

    var vertices_DOWNhalfLeg = new Float32Array([  // halfLeg(2x4x2)
     1.0, 6.0, 1.0, -1.0, 6.0, 1.0, -1.0, 0.0, 1.0,  1.0, 0.0, 1.0, // v0-v1-v2-v3 front
     1.0, 6.0, 1.0,  1.0, 0.0, 1.0,  1.0, 0.0,-1.0,  1.0, 6.0,-1.0, // v0-v3-v4-v5 right
     1.0, 6.0, 1.0,  1.0, 6.0,-1.0, -1.0, 6.0,-1.0, -1.0, 6.0, 1.0, // v0-v5-v6-v1 up
    -1.0, 6.0, 1.0, -1.0, 6.0,-1.0, -1.0, 0.0,-1.0, -1.0, 0.0, 1.0, // v1-v6-v7-v2 left
    -1.0, 0.0,-1.0,  1.0, 0.0,-1.0,  1.0, 0.0, 1.0, -1.0, 0.0, 1.0, // v7-v4-v3-v2 down
     1.0, 0.0,-1.0, -1.0, 0.0,-1.0, -1.0, 6.0,-1.0,  1.0, 6.0,-1.0  // v4-v7-v6-v5 back
  ]);

  var vertices_arm = new Float32Array([  // arm(2x8x2)
     1.0, 8.0, 1.0, -1.0, 8.0, 1.0, -1.0, 0.0, 1.0,  1.0, 0.0, 1.0, // v0-v1-v2-v3 front
     1.0, 8.0, 1.0,  1.0, 0.0, 1.0,  1.0, 0.0,-1.0,  1.0, 8.0,-1.0, // v0-v3-v4-v5 right
     1.0, 8.0, 1.0,  1.0, 8.0,-1.0, -1.0, 8.0,-1.0, -1.0, 8.0, 1.0, // v0-v5-v6-v1 up
    -1.0, 8.0, 1.0, -1.0, 8.0,-1.0, -1.0, 0.0,-1.0, -1.0, 0.0, 1.0, // v1-v6-v7-v2 left
    -1.0, 0.0,-1.0,  1.0, 0.0,-1.0,  1.0, 0.0, 1.0, -1.0, 0.0, 1.0, // v7-v4-v3-v2 down
     1.0, 0.0,-1.0, -1.0, 0.0,-1.0, -1.0, 8.0,-1.0,  1.0, 8.0,-1.0  // v4-v7-v6-v5 back
  ]);

  var vertices_head = new Float32Array([  // head(3x3x3)
     2.5, 4.0, 1.5, -2.5, 4.0, 1.5, -2.5, 0.0, 1.5,  2.5, 0.0, 1.5, // v0-v1-v2-v3 front
     2.5, 4.0, 1.5,  2.5, 0.0, 1.5,  2.5, 0.0,-1.5,  2.5, 4.0,-1.5, // v0-v3-v4-v5 right
     2.5, 4.0, 1.5,  2.5, 4.0,-1.5, -2.5, 4.0,-1.5, -2.5, 4.0, 1.5, // v0-v5-v6-v1 up
    -2.5, 4.0, 1.5, -2.5, 4.0,-1.5, -2.5, 0.0,-1.5, -2.5, 0.0, 1.5, // v1-v6-v7-v2 left
    -2.5, 0.0,-1.5,  2.5, 0.0,-1.5,  2.5, 0.0, 1.5, -2.5, 0.0, 1.5, // v7-v4-v3-v2 down
     2.5, 0.0,-1.5, -2.5, 0.0,-1.5, -2.5, 4.0,-1.5,  2.5, 4.0,-1.5  // v4-v7-v6-v5 back
  ]);
  
  var vertices_neck = new Float32Array([  // neck(2x2x2)
     1.0, 2.0, 1.0, -1.0, 2.0, 1.0, -1.0, 0.0, 1.0,  1.0, 0.0, 1.0, // v0-v1-v2-v3 front
     1.0, 2.0, 1.0,  1.0, 0.0, 1.0,  1.0, 0.0,-1.0,  1.0, 2.0,-1.0, // v0-v3-v4-v5 right
     1.0, 2.0, 1.0,  1.0, 2.0,-1.0, -1.0, 2.0,-1.0, -1.0, 2.0, 1.0, // v0-v5-v6-v1 up
    -1.0, 2.0, 1.0, -1.0, 2.0,-1.0, -1.0, 0.0,-1.0, -1.0, 0.0, 1.0, // v1-v6-v7-v2 left
    -1.0, 0.0,-1.0,  1.0, 0.0,-1.0,  1.0, 0.0, 1.0, -1.0, 0.0, 1.0, // v7-v4-v3-v2 down
     1.0, 0.0,-1.0, -1.0, 0.0,-1.0, -1.0, 2.0,-1.0,  1.0, 2.0,-1.0  // v4-v7-v6-v5 back
  ]);
  // Normal
  var normals = new Float32Array([
     0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
     1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
     0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
     0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
     0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
  ]);

  // Normal
  var normals = new Float32Array([
     0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
     1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
     0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
     0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
     0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
  ]);
  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  var o = new Object();


  // Write coords to buffers, but don't assign to attribute variables
  o.g_footBuffer = initArrayBufferForLaterUse(gl, vertices_foot, 3, gl.FLOAT);
  o.g_bodyBuffer = initArrayBufferForLaterUse(gl, vertices_body, 3, gl.FLOAT);
  o.g_UPhalfLegBuffer = initArrayBufferForLaterUse(gl, vertices_UPhalfLeg, 3, gl.FLOAT);
  o.g_DOWNhalfLegBuffer = initArrayBufferForLaterUse(gl, vertices_DOWNhalfLeg, 3, gl.FLOAT);
  o.g_armBuffer = initArrayBufferForLaterUse(gl, vertices_arm, 3, gl.FLOAT);
  o.g_headBuffer = initArrayBufferForLaterUse(gl, vertices_head, 3, gl.FLOAT);
  o.g_neckBuffer = initArrayBufferForLaterUse(gl, vertices_neck, 3, gl.FLOAT);
  o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3,gl.FLOAT);
 
  o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
  o.numIndices = indices.length;


  if (!o.g_footBuffer || !o.g_bodyBuffer || !o.g_UPhalfLegBuffer || !o.g_DOWNhalfLegBuffer || 
    !o.g_armBuffer || !o.g_headBuffer || !o.g_neckBuffer || !o.indexBuffer) return -1;
  

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return o;
}

function initArrayBufferForLaterUse(gl, data, num, type){
  var buffer = gl.createBuffer();   // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Store the necessary information to assign the object to the attribute variable later
  buffer.num = num;
  buffer.type = type;

  return buffer;
}

function initArrayBuffer(gl, attribute, data, num, type){
  var buffer = gl.createBuffer();   // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

var g_matrixStack = []; // Array for storing a matrix
function pushMatrix(m) { // Store the specified matrix to the array
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}

function popMatrix() { // Retrieve the matrix from the array
  return g_matrixStack.pop();
}

function drawAvatar(gl, program, o) {
  // Clear color and depth buffer
  gl.useProgram(program);

  var xCOM = 0.0;
  var yCOM = 0.0; 
  var zCOM = 0.0;

  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var footHeight = 1.0;
  var halfLegHeight = 11.0;
  var neckHeight = 2.0;
  var bodyHeight = 12.0;
  var bodyWidht = 10.0;
  var armHeight = 8.0;

  var n = o.numIndices;

  // qui è importante capire dove mettere il robot, probabilmente all'inizio non si vedrà
  
  g_modelMatrix.setTranslate(xPos, yPos-0.5, zPos);
  g_modelMatrix.translate(-3.0*Math.sin(degToRad(yaw)), 0.0, -3.0*Math.cos(degToRad(yaw)));
  g_modelMatrix.rotate(yaw, 0.0, 1.0, 0.0);
  g_modelMatrix.scale(0.04,0.04,-0.04);
  drawSegment(gl, n, o.g_bodyBuffer, o.indexBuffer, program); // Draw

  // Draw left total lenght
  pushMatrix(g_modelMatrix);

  g_modelMatrix.translate(bodyWidht/3, 0.0, 0.0);
  g_modelMatrix.rotate(g_jointHip1, 1.0, 0.0, 0.0);
  drawSegment(gl, n, o.g_UPhalfLegBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix.translate(0.0, -halfLegHeight/2, 0.0);
  g_modelMatrix.rotate(g_jointKnee1, 1.0, 0.0, 0.0);
  drawSegment(gl, n, o.g_UPhalfLegBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix.translate(0.0, -halfLegHeight/2 -1.0, 0.0);
  g_modelMatrix.rotate(g_jointAnkle1, 1.0,0.0,0.0);
  drawSegment(gl, n, o.g_footBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix = popMatrix();
  pushMatrix(g_modelMatrix);

  g_modelMatrix.translate(-bodyWidht/3, 0.0, 0.0);
  g_modelMatrix.rotate(g_jointHip2, 1.0, 0.0, 0.0);
  drawSegment(gl, n, o.g_UPhalfLegBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix.translate(0.0, -halfLegHeight/2, 0.0);
  g_modelMatrix.rotate(g_jointKnee2, 1.0, 0.0, 0.0);
  drawSegment(gl, n, o.g_UPhalfLegBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix.translate(0.0, -halfLegHeight/2 -1.0, 0.0);
  g_modelMatrix.rotate(g_jointAnkle2, 1.0,0.0,0.0);
  drawSegment(gl, n, o.g_footBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix = popMatrix();
  pushMatrix(g_modelMatrix);

  g_modelMatrix.translate(0.0, bodyHeight, 0.0);
  drawSegment(gl, n, o.g_neckBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix.translate(0.0, neckHeight, 0.0);
  drawSegment(gl, n, o.g_headBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix = popMatrix();
  pushMatrix(g_modelMatrix);

  g_modelMatrix.translate(bodyWidht/2 +1.0, bodyHeight*3/4, 0.0);
  g_modelMatrix.rotate(g_jointArm2 + 180, 1.0,0.0,0.0);
  drawSegment(gl, n, o.g_armBuffer, o.indexBuffer, program); // Draw

  g_modelMatrix = popMatrix();

  g_modelMatrix.translate(-bodyWidht/2 -1.0, bodyHeight*3/4, 0.0);
  g_modelMatrix.rotate(g_jointArm1 + 180, 1.0,0.0,0.0);
  drawSegment(gl, n, o.g_armBuffer, o.indexBuffer, program); // Draw

}

// Draw segments
function drawSegment(gl, n, buffer, indexBuffer, program) {

  initAttributeVariable(gl, program.a_Position, buffer);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // Calculate the model view project matrix and pass it to u_MvpMatrix
  g_cameraMatrix.setTranslate(xPos,yPos,zPos);
  g_cameraMatrix.rotate(yaw, 0, 1, 0);
  g_cameraMatrix.rotate(pitch, 1, 0, 0);
  g_viewMatrix.setInverseOf(g_cameraMatrix);

  //generating modelViewProjectionMatrix and passing it to the uniform variable
  g_mvpMatrix.set(g_projMatrix).multiply(g_viewMatrix).multiply(g_modelMatrix);

  gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);
  // Calculate matrix for normal and pass it to u_NormalMatrix
  g_normalMatrix.setInverseOf(g_modelMatrix);
  g_normalMatrix.transpose();
  gl.uniformMatrix4fv(program.u_NormalMatrix, false, g_normalMatrix.elements);
  // Draw
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}
