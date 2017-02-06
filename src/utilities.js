function treasureRandomPos(){
	var space = Math.floor((Math.random() * 4) + 1);
  
  if (space == 1) {
    x_treas = Math.floor((Math.random() * 188.5) - 188.5);
    z_treas = Math.floor((Math.random() * 188.5) - 188.5);
    } else if (space == 2) {
    x_treas = Math.floor((Math.random() * 145.5) - 145.5);
    z_treas = Math.floor((Math.random() * 145.5) - 145.5);
    } else if (space == 3) {
    x_treas = Math.floor((Math.random() * 96.5) - 96.5);
    z_treas = Math.floor((Math.random() * 96.5) - 96.5);
    } else {
    x_treas = Math.floor((Math.random() * 46.5) - 46.5);
    z_treas = Math.floor((Math.random() * 46.5) - 46.5);
    }
  console.log('X location of treasure: ' + x_treas + 'Z location of treasure: ' + z_treas + '\n');
  return [x_treas,z_treas];
}

function check(gl, x, y, u_Clicked, mouseProgram, door, doorTexture) {
  g_picked = true;

  gl.uniform1i(u_Clicked, 1);  // Pass true to u_Clicked
  drawTexDoors(gl, mouseProgram, door, doorTexture);
  // Read pixel at the clicked position
  var pixels = new Uint8Array(4); // Array for storing the pixel value
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  console.log(pixels);
  
  for(i = 0; i < g_drawingColors.length; i++){
      if (pixels[0] == Math.ceil(255*g_drawingColors[i][0]) && pixels[1] == Math.ceil(255*g_drawingColors[i][1]) && pixels[2] == Math.ceil(255*g_drawingColors[i][2])){ // The mouse in on cube if R(pixels[0]) is 255
        g_selectedObjects[i] = true;
      }   
  }
  g_picked = false;

  gl.uniform1i(u_Clicked, 0);  // Pass false to u_Clicked(rewrite the cube)
  drawTexDoors(gl, mouseProgram, door, doorTexture);
}

// Assign the buffer objects and enable the assignment
function initAttributeVariable(gl, a_attribute, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);
}

function initArrayBufferForLaterUse(gl, data, num, type) {
  var buffer = gl.createBuffer();   // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Keep the information necessary to assign to the attribute variable later
  buffer.num = num;
  buffer.type = type;

  return buffer;
}

function initElementArrayBufferForLaterUse(gl, data, type) {
  var buffer = gl.createBuffer();　  // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

  buffer.type = type;

  return buffer;
}