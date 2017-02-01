function getSkyProgramLocations(gl, skyProgram){
 // Get storage locations of attribute and uniform variables in program object for single color drawing
  gl.useProgram(skyProgram);

  skyProgram.a_Position = gl.getAttribLocation(skyProgram, 'a_Position');
  skyProgram.u_MvpMatrix = gl.getUniformLocation(skyProgram, 'u_MvpMatrix');
  skyProgram.u_CubeMap = gl.getUniformLocation(skyProgram, 'u_CubeMap');
  if (skyProgram.a_Position < 0 || !skyProgram.u_MvpMatrix || !skyProgram.u_CubeMap) { 
  console.log('Failed to get the storage location of attribute or uniform variable of skyProgram'); 
  return;
  }

  return skyProgram;
}


function initSkyCubeVertexBuffers(gl){
  var vertices = new Float32Array([   // Vertex coordinates
     50.0, 50.0, 50.0,  -50.0, 50.0, 50.0,  -50.0,-50.0, 50.0,   50.0,-50.0, 50.0,    // v0-v1-v2-v3 front
     50.0, 50.0, 50.0,   50.0,-50.0, 50.0,   50.0,-50.0,-50.0,   50.0, 50.0,-50.0,    // v0-v3-v4-v5 right
     50.0, 50.0, 50.0,   50.0, 50.0,-50.0,  -50.0, 50.0,-50.0,  -50.0, 50.0, 50.0,    // v0-v5-v6-v1 up
    -50.0, 50.0, 50.0,  -50.0, 50.0,-50.0,  -50.0,-50.0,-50.0,  -50.0,-50.0, 50.0,    // v1-v6-v7-v2 left
    -50.0,-50.0,-50.0,   50.0,-50.0,-50.0,   50.0,-50.0, 50.0,  -50.0,-50.0, 50.0,    // v7-v4-v3-v2 down
     50.0,-50.0,-50.0,  -50.0,-50.0,-50.0,  -50.0, 50.0,-50.0,   50.0, 50.0,-50.0     // v4-v7-v6-v5 back
  ]);
  var indices = new Uint8Array([        // Indices of the vertices
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  var o = new Object(); // Utilize Object to to return multiple buffer objects together


  o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
  o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
  
  o.numIndices = indices.length;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return o;
}
