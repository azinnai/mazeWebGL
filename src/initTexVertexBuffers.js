function initMazeVertexBuffers(gl) {
  //the total length of the wall will be double the number of units
  var mazeWalls = [];
  var xUnits0;
  var yUnits0;
  var xUnits1;

  
  // TREASURE BOX
  xUnits0 = 1.0;
  yUnits0 = 1.0;
  xUnits1 = 2.0;

  mazeWalls[0] = initCubeVertexBuffers(gl, xUnits0, yUnits0);
  mazeWalls[0].xUnits = xUnits0;
  mazeWalls[0].yUnits = yUnits0;
 
  // LEVEL 0 (inner)
  xUnits0 = 51.0;
  yUnits0 = 3.0;
  xUnits1 = 23.25;
  
  mazeWalls[1] = initCubeVertexBuffers(gl, xUnits0, yUnits0);
  mazeWalls[2] = initCubeVertexBuffers(gl, xUnits1, yUnits0);
  mazeWalls[1].xUnits = xUnits0;
  mazeWalls[1].yUnits = yUnits0;
  mazeWalls[2].xUnits = xUnits1;
  mazeWalls[2].yUnits = yUnits0;

  
  // LEVEL 1
  xUnits0 = 101.0;
  yUnits0 = 3.0;
  xUnits1 = 49.0;
  
  mazeWalls[3] = initCubeVertexBuffers(gl, xUnits0, yUnits0);
  mazeWalls[4] = initCubeVertexBuffers(gl, xUnits1, yUnits0);
  mazeWalls[3].xUnits = xUnits0;
  mazeWalls[3].yUnits = yUnits0;
  mazeWalls[4].xUnits = xUnits1;
  mazeWalls[4].yUnits = yUnits0;

  // LEVEL 2
  xUnits0 = 150.0;
  yUnits0 = 3.0;
  xUnits1 = 73.5;

  mazeWalls[5] = initCubeVertexBuffers(gl, xUnits0, yUnits0);
  mazeWalls[6] = initCubeVertexBuffers(gl, xUnits1, yUnits0);
  mazeWalls[5].xUnits = xUnits0;
  mazeWalls[5].yUnits = yUnits0;
  mazeWalls[6].xUnits = xUnits1;
  mazeWalls[6].yUnits = yUnits0;

  // LEVEL 3 (outer)
  xUnits0 = 193.0;
  yUnits0 = 3.0;
  xUnits1 = 95.0;
  
  mazeWalls[7] = initCubeVertexBuffers(gl, xUnits0, yUnits0);
  mazeWalls[8] = initCubeVertexBuffers(gl, xUnits1, yUnits0);
  mazeWalls[7].xUnits = xUnits0;
  mazeWalls[7].yUnits = yUnits0;
  mazeWalls[8].xUnits = xUnits1;
  mazeWalls[8].yUnits = yUnits0;




  for(i=0; i < mazeWalls.length; i++){
    if (!mazeWalls[i]) {
      console.log('Failed to set the cube vertex information');
      return;
    }
  }
  return mazeWalls;
}

function initDoorVertexBuffers(gl){

    var door;
    var xUnits = 3.0;
    var yUnits = 3.0;
    var textureMapping = [1.0, 1.0];

    door = initCubeVertexBuffers(gl, xUnits, yUnits, textureMapping);
    door.xUnits = xUnits;
    door.yUnits = yUnits;

    if (!door) {
        console.log('Failed to set the door vertex information');
        return;
    }
    return door;
}

function initFloorVertexBuffers(gl, halfLength) {

  var vertices = new Float32Array([
    halfLength,0.0,halfLength,
    halfLength,0.0,-halfLength,
    -halfLength,0.0,halfLength,
    -halfLength,0.0,-halfLength,
    ]);

  var indices = new Uint8Array([
    1,2,0,
    3,2,1,
    ]);

  var normals = new Float32Array([
    0.0,1.0,0.0,
    0.0,1.0,0.0,
    0.0,1.0,0.0,
    0.0,1.0,0.0,
    ]);
  halfLength = 0.1*halfLength;
  var texCoords = new Float32Array([   // Texture coordinates
     0.0, 2*halfLength,   2*halfLength, 2*halfLength,   0.0, 0.0,   2*halfLength, 0.0,    // v0-v1-v2-v3 front
  ]);

  var o = new Object();

  o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
  o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
  o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
  o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
  if (!o.vertexBuffer || !o.normalBuffer || !o.texCoordBuffer || !o.indexBuffer) return null; 

  o.numIndices = indices.length;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return o;

}

function initCubeVertexBuffers(gl, xUnits, yUnits, textureUnits=null) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  //the effective shape of the face is double the xUnits and yUnits, 
  var vertices = new Float32Array([   // Vertex coordinates
     xUnits, yUnits, 1.0,  -xUnits, yUnits, 1.0,  -xUnits,-yUnits, 1.0,   xUnits,-yUnits, 1.0,    // v0-v1-v2-v3 front
     xUnits, yUnits, 1.0,   xUnits,-yUnits, 1.0,   xUnits,-yUnits,-1.0,   xUnits, yUnits,-1.0,    // v0-v3-v4-v5 right
     xUnits, yUnits, 1.0,   xUnits, yUnits,-1.0,  -xUnits, yUnits,-1.0,  -xUnits, yUnits, 1.0,    // v0-v5-v6-v1 up
    -xUnits, yUnits, 1.0,  -xUnits, yUnits,-1.0,  -xUnits,-yUnits,-1.0,  -xUnits,-yUnits, 1.0,    // v1-v6-v7-v2 left
    -xUnits,-yUnits,-1.0,   xUnits,-yUnits,-1.0,   xUnits,-yUnits, 1.0,  -xUnits,-yUnits, 1.0,    // v7-v4-v3-v2 down
     xUnits,-yUnits,-1.0,  -xUnits,-yUnits,-1.0,  -xUnits, yUnits,-1.0,   xUnits, yUnits,-1.0     // v4-v7-v6-v5 back
  ]);

  var normals = new Float32Array([   // Normal
     0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front
     1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right
     0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
    -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
     0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // v7-v4-v3-v2 down
     0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0      // v4-v7-v6-v5 back
  ]);
  if(textureUnits==null){
    xUnits = 0.4*xUnits;
    yUnits = 0.4*yUnits; 
  } else {
    xUnits = textureUnits[0];
    yUnits = textureUnits[1];
  }

  var texCoords = new Float32Array([   // Texture coordinates
     xUnits, yUnits,   0.0, yUnits,   0.0, 0.0,   xUnits, 0.0,    // v0-v1-v2-v3 front
     0.0, yUnits,   0.0, 0.0,   2.0, 0.0,   2.0, yUnits,    // v0-v3-v4-v5 right
     xUnits, 0.0,   xUnits, 2.0,   0.0, 2.0,   0.0, 0.0,    // v0-v5-v6-v1 up
     2.0, yUnits,   0.0, yUnits,   0.0, 0.0,   2.0, 0.0,    // v1-v6-v7-v2 left
     0.0, 0.0,   xUnits, 0.0,   xUnits, 2.0,   0.0, 2.0,    // v7-v4-v3-v2 down
     0.0, 0.0,   xUnits, 0.0,   xUnits, yUnits,   0.0, yUnits     // v4-v7-v6-v5 back
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

  // Write vertex information to buffer object
  o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
  o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
  o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
  o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
  if (!o.vertexBuffer || !o.normalBuffer || !o.texCoordBuffer || !o.indexBuffer) return null; 

  o.numIndices = indices.length;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return o;
}