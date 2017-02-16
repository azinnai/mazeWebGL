function init2DTexture(gl, program, path) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return null;
  }
  var image = new Image();  // Create a image object
  if (!image) {
    console.log('Failed to create the image object');
    return null;
  }
  
  // Register the event handler to be called when image loading is completed
  image.onload = function() {
    // Write the image data to texture object
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.bindTexture(gl.TEXTURE_2D, null); // Unbind texture
  };

  // Tell the browser to load an Image
  image.src = path;

  return texture;
}

function getTexProgramLocations(gl, texProgram){
  // Get storage locations of attribute and uniform variables in program object for texture drawing
  texProgram.a_Position = gl.getAttribLocation(texProgram, 'a_Position');
  texProgram.a_Normal = gl.getAttribLocation(texProgram, 'a_Normal');
  texProgram.a_TexCoord = gl.getAttribLocation(texProgram, 'a_TexCoord');
  texProgram.u_MvpMatrix = gl.getUniformLocation(texProgram, 'u_MvpMatrix');
  texProgram.u_NormalMatrix = gl.getUniformLocation(texProgram, 'u_NormalMatrix');
  texProgram.u_ModelMatrix = gl.getUniformLocation(texProgram, 'u_ModelMatrix');
  texProgram.u_CameraMatrix = gl.getUniformLocation(texProgram, 'u_CameraMatrix');
  texProgram.u_Sampler = gl.getUniformLocation(texProgram, 'u_Sampler');
  texProgram.u_TorchColor = gl.getUniformLocation(texProgram, 'u_TorchColor');
  texProgram.u_AmbientLight = gl.getUniformLocation(texProgram, 'u_AmbientLight');
  texProgram.u_TorchPosition = gl.getUniformLocation(texProgram, 'u_TorchPosition');
  texProgram.u_TreasureLight = gl.getUniformLocation(texProgram, 'u_TreasureLight');
  texProgram.u_TreasureFound = gl.getUniformLocation(texProgram, 'u_TreasureFound');
  texProgram.u_TopView = gl.getUniformLocation(texProgram, 'u_TopView');
  texProgram.u_NightMode = gl.getUniformLocation(texProgram, 'u_NightMode');



  if (texProgram.a_Position < 0 || texProgram.a_Normal < 0 || texProgram.a_TexCoord < 0 ||
    !texProgram.u_MvpMatrix || !texProgram.u_NormalMatrix || !texProgram.u_ModelMatrix || 
    !texProgram.u_CameraMatrix || !texProgram.u_Sampler || !texProgram.u_TorchColor ||
    !texProgram.u_AmbientLight || !texProgram.u_TorchPosition || !texProgram.u_TreasureLight ||
    !texProgram.u_TreasureFound || !texProgram.u_TopView || !texProgram.u_NightMode) { 
    console.log('Failed to get the storage location of attribute or uniform variable'); 
    return;
  }

  return texProgram; 
}

function getMouseProgramLocations(gl, mouseProgram){
  // Get storage locations of attribute and uniform variables in program object for texture drawing
  mouseProgram.a_Position = gl.getAttribLocation(mouseProgram, 'a_Position');
  mouseProgram.a_Normal = gl.getAttribLocation(mouseProgram, 'a_Normal');
  mouseProgram.a_TexCoord = gl.getAttribLocation(mouseProgram, 'a_TexCoord');
  mouseProgram.u_MvpMatrix = gl.getUniformLocation(mouseProgram, 'u_MvpMatrix');
  mouseProgram.u_NormalMatrix = gl.getUniformLocation(mouseProgram, 'u_NormalMatrix');
  mouseProgram.u_ModelMatrix = gl.getUniformLocation(mouseProgram, 'u_ModelMatrix');
  mouseProgram.u_CameraMatrix = gl.getUniformLocation(mouseProgram, 'u_CameraMatrix');
  mouseProgram.u_Sampler = gl.getUniformLocation(mouseProgram, 'u_Sampler');
  mouseProgram.u_TorchColor = gl.getUniformLocation(mouseProgram, 'u_TorchColor');
  mouseProgram.u_AmbientLight = gl.getUniformLocation(mouseProgram, 'u_AmbientLight');
  mouseProgram.u_TorchPosition = gl.getUniformLocation(mouseProgram, 'u_TorchPosition');
  mouseProgram.u_Clicked = gl.getUniformLocation(mouseProgram, 'u_Clicked');
  mouseProgram.u_ClickedColor = gl.getUniformLocation(mouseProgram, 'u_ClickedColor');


  if (mouseProgram.a_Position < 0 || mouseProgram.a_Normal < 0 || mouseProgram.a_TexCoord < 0 ||
    !mouseProgram.u_MvpMatrix || !mouseProgram.u_NormalMatrix || !mouseProgram.u_ModelMatrix || 
    !mouseProgram.u_CameraMatrix || !mouseProgram.u_Sampler || !mouseProgram.u_TorchColor ||
    !mouseProgram.u_AmbientLight || !mouseProgram.u_TorchPosition || !mouseProgram.u_Clicked ||
    !mouseProgram.u_ClickedColor) { 
    console.log('Failed to get the storage location of attribute or uniform variable'); 
    return;
  }

  return mouseProgram; 
}

function drawTexFloor(gl, program, o, texture) {
  gl.useProgram(program);   // Tell that this program object is used

  // Assign the buffer objects and enable the assignment
  initAttributeVariable(gl, program.a_Position, o.vertexBuffer);  // Vertex coordinates
  initAttributeVariable(gl, program.a_Normal, o.normalBuffer);    // Normal
  initAttributeVariable(gl, program.a_TexCoord, o.texCoordBuffer);// Texture coordinates
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer); // Bind indices

  // Bind texture object to texture unit 0
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  drawFloor(gl, program, o);

}


function drawFloor(gl, program, o){
  // Calculate a model matrix
  g_modelMatrix.setTranslate(0.0, 0.0, 0.0);
  //g_modelMatrix.scale(10,0.0,-10);
  if(topModeView) yPos = yPosTop;
  if(sideModeView){
	g_cameraMatrix.setTranslate(+3.0*Math.sin(degToRad(yaw+90))+xPos, yPos-1, 3.0*Math.cos(degToRad(yaw+90))+zPos);
  	g_cameraMatrix.rotate(yaw+90, 0, 1, 0);	
  } else{
	  g_cameraMatrix.setTranslate(+3.0*Math.sin(degToRad(yaw))+xPos, yPos, 3.0*Math.cos(degToRad(yaw))+zPos);
	  g_cameraMatrix.rotate(yaw, 0, 1, 0);
  }
  g_cameraMatrix.rotate(pitch, 1, 0, 0);
  g_viewMatrix.setInverseOf(g_cameraMatrix);

  g_mvpMatrix.set(g_projMatrix).multiply(g_viewMatrix).multiply(g_modelMatrix);
  // Calculate transformation matrix for normals and pass it to u_NormalMatrix
  g_normalMatrix.setInverseOf(g_modelMatrix);
  g_normalMatrix.transpose();
  var lightDirection = new Vector3([xPos, yPos, zPos]);


  gl.uniform3fv(program.u_TorchPosition, lightDirection.elements);
  gl.uniformMatrix4fv(program.u_NormalMatrix, false, g_normalMatrix.elements);
  gl.uniformMatrix4fv(program.u_ModelMatrix, false, g_modelMatrix.elements);
  gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);
  gl.uniformMatrix4fv(program.u_CameraMatrix, false, g_cameraMatrix.elements);

  gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0);   // Draw
}
/*
function drawSolidCube(gl, program, o, x) {
  gl.useProgram(program);   // Tell that this program object is used

  // Assign the buffer objects and enable the assignment
  initAttributeVariable(gl, program.a_Position, o.vertexBuffer); // Vertex coordinates
  initAttributeVariable(gl, program.a_Normal, o.normalBuffer);   // Normal
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer);  // Bind indices

  drawCube(gl, program, o, x);   // Draw
}
*/
var treasureYUnits = 0.5;
function drawTexTreasure(gl, program, treasure, texture, x, z){
	  drawTexCuboid(gl, program, treasure, texture, x, treasureYUnits, z, 90.0);
}

function drawTexMazeWalls(gl, program, mazeWallsArray, texture, loc){
  //x,y,x coordinates are referred to center of mass
  

  // LEVEL 0
  //right external wall
  drawTexCuboid(gl, program, mazeWallsArray[1], texture, loc[0], mazeWallsArray[1].yUnits, 0.0, 90.0);
  //left external wall 1 (door)
  drawTexCuboid(gl, program, mazeWallsArray[2], texture, -loc[0], mazeWallsArray[2].yUnits, -loc[1], 90.0);
  //left external wall 2 (door)
  drawTexCuboid(gl, program, mazeWallsArray[2], texture, -loc[0], mazeWallsArray[2].yUnits, loc[1], 90.0);
  //top external wall
  drawTexCuboid(gl, program, mazeWallsArray[1], texture, 0.0, mazeWallsArray[1].yUnits, -loc[0], 0.0);
  //bottom external wall
  drawTexCuboid(gl, program, mazeWallsArray[1], texture, 0.0, mazeWallsArray[1].yUnits, loc[0], 0.0);
  

  // LEVEL 1
  //right external wall 1
  drawTexCuboid(gl, program, mazeWallsArray[4], texture, loc[2], mazeWallsArray[4].yUnits, loc[3], 90.0);
  //right external wall 2
  drawTexCuboid(gl, program, mazeWallsArray[4], texture, loc[2], mazeWallsArray[4].yUnits, -loc[3], 90.0);
  //left external wall
  drawTexCuboid(gl, program, mazeWallsArray[3], texture, -loc[2], mazeWallsArray[3].yUnits, 0.0, 90.0);
  //top external wall
  drawTexCuboid(gl, program, mazeWallsArray[3], texture, 0.0, mazeWallsArray[3].yUnits, -loc[2], 0.0);
  //bottom external wall 1
  drawTexCuboid(gl, program, mazeWallsArray[4], texture, -loc[3], mazeWallsArray[4].yUnits, loc[2], 0.0);
  //bottom external wall 2
  drawTexCuboid(gl, program, mazeWallsArray[4], texture, loc[3], mazeWallsArray[4].yUnits, loc[2], 0.0);


  // LEVEL 2
  //left external wall 1
  drawTexCuboid(gl, program, mazeWallsArray[6], texture, -loc[4], mazeWallsArray[6].yUnits, loc[5]-0.5, 90.0);
  //left external wall 2
  drawTexCuboid(gl, program, mazeWallsArray[6], texture, -loc[4], mazeWallsArray[6].yUnits, -loc[5]+0.5, 90.0);
  //top external wall 1
  drawTexCuboid(gl, program, mazeWallsArray[6], texture, loc[5]+0.5, mazeWallsArray[6].yUnits, -loc[4]+1, 0.0);
  //top external wall 2
  drawTexCuboid(gl, program, mazeWallsArray[6], texture, -loc[5]-0.5, mazeWallsArray[6].yUnits, -loc[4]+1, 0.0);
  //bottom external wall
  drawTexCuboid(gl, program, mazeWallsArray[5], texture, 0.0, mazeWallsArray[5].yUnits, loc[4]-1, 0.0);
  //right external wall
  drawTexCuboid(gl, program, mazeWallsArray[17], texture, loc[4], mazeWallsArray[5].yUnits, 0.0, 90.0);


  // LEVEL 3
  //right external wall
  drawTexCuboid(gl, program, mazeWallsArray[7], texture, loc[6], mazeWallsArray[7].yUnits, 0.0, 90.0);
  //left external wall
  drawTexCuboid(gl, program, mazeWallsArray[7], texture, -loc[6], mazeWallsArray[7].yUnits, 0.0, 90.0);
  //top external wall
  drawTexCuboid(gl, program, mazeWallsArray[7], texture, 0.0, mazeWallsArray[7].yUnits, -loc[6], 0.0);
  //bottom external wall 1
  drawTexCuboid(gl, program, mazeWallsArray[8], texture, -loc[7], mazeWallsArray[8].yUnits, loc[6], 0.0);
  //bottom external wall 2
  drawTexCuboid(gl, program, mazeWallsArray[8], texture, loc[7], mazeWallsArray[8].yUnits, loc[6], 0.0);

  // EXTENSIONS AT DOORS
  // inner tamarrate
  drawTexCuboid(gl, program, mazeWallsArray[10], texture, 0.0, mazeWallsArray[10].yUnits+12.0, loc[0], 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[10], texture, loc[0], mazeWallsArray[10].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[10], texture, 0.0, mazeWallsArray[10].yUnits+12.0, -loc[0], 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[10], texture, -loc[0], mazeWallsArray[10].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, -loc[0]-2.0, mazeWallsArray[16].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, -loc[0]+2.0, mazeWallsArray[16].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[0], mazeWallsArray[15].yUnits, -4.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[0], mazeWallsArray[15].yUnits, 4.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[0], mazeWallsArray[15].yUnits, -8.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[0], mazeWallsArray[15].yUnits, 8.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[0], mazeWallsArray[15].yUnits, -12.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[0], mazeWallsArray[15].yUnits, 12.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, -loc[0], mazeWallsArray[11].yUnits, -50.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, -loc[0], mazeWallsArray[11].yUnits, 50.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, loc[0], mazeWallsArray[11].yUnits, -50.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, loc[0], mazeWallsArray[11].yUnits, 50.0, 0.0);

  //level 1 tamarrate
  drawTexCuboid(gl, program, mazeWallsArray[12], texture, 0.0, mazeWallsArray[12].yUnits+12.0, loc[2], 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, 0.0, mazeWallsArray[16].yUnits+12.0, loc[2]+2.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, 0.0, mazeWallsArray[16].yUnits+12.0, loc[2]-2.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[12], texture, loc[2], mazeWallsArray[12].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, loc[2]+2.0, mazeWallsArray[16].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, loc[2]-2.0, mazeWallsArray[16].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[12], texture, 0.0, mazeWallsArray[12].yUnits+12.0, -loc[2], 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[12], texture, -loc[2], mazeWallsArray[12].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -4.0, mazeWallsArray[15].yUnits, loc[2], -90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, 4.0, mazeWallsArray[15].yUnits, loc[2], -90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -8.0, mazeWallsArray[15].yUnits, loc[2], -90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, 8.0, mazeWallsArray[15].yUnits, loc[2], -90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -12.0, mazeWallsArray[15].yUnits, loc[2], -90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, 12.0, mazeWallsArray[15].yUnits, loc[2], -90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, loc[2], mazeWallsArray[15].yUnits, -4.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, loc[2], mazeWallsArray[15].yUnits, 4.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, loc[2], mazeWallsArray[15].yUnits, -8.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, loc[2], mazeWallsArray[15].yUnits, 8.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, loc[2], mazeWallsArray[15].yUnits, -12.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, loc[2], mazeWallsArray[15].yUnits, 12.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, -loc[2], mazeWallsArray[11].yUnits, -100.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, -loc[2], mazeWallsArray[11].yUnits, 100.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, loc[2], mazeWallsArray[11].yUnits, -100.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, loc[2], mazeWallsArray[11].yUnits, 100.0, 0.0);

  //level 2 tamarrate
  drawTexCuboid(gl, program, mazeWallsArray[13], texture, 0.0, mazeWallsArray[13].yUnits+12.0, loc[4]-1.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[13], texture, loc[4], mazeWallsArray[13].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[13], texture, 0.0, mazeWallsArray[13].yUnits+12.0, -loc[4]+1.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, 0.0, mazeWallsArray[16].yUnits+12.0, -loc[4]+3.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, 0.0, mazeWallsArray[16].yUnits+12.0, -loc[4]-1.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[13], texture, -loc[4], mazeWallsArray[13].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, -loc[4]-2.0, mazeWallsArray[16].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, -loc[4]+2.0, mazeWallsArray[16].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[4], mazeWallsArray[9].yUnits-1, -4.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[4], mazeWallsArray[9].yUnits-1, 4.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[4], mazeWallsArray[9].yUnits-1, -8.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[4], mazeWallsArray[9].yUnits-1, 8.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[4], mazeWallsArray[9].yUnits-1, -12.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -loc[4], mazeWallsArray[9].yUnits-1, 12.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -4.0, mazeWallsArray[15].yUnits, -loc[4]+1.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture,  4.0, mazeWallsArray[15].yUnits, -loc[4]+1.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -8.0, mazeWallsArray[15].yUnits, -loc[4]+1.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture,  8.0, mazeWallsArray[15].yUnits, -loc[4]+1.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -12.0, mazeWallsArray[15].yUnits, -loc[4]+1.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture,  12.0, mazeWallsArray[15].yUnits, -loc[4]+1.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, -loc[4], mazeWallsArray[11].yUnits, -149.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, -loc[4], mazeWallsArray[11].yUnits, 149.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, loc[4], mazeWallsArray[11].yUnits, -149.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, loc[4], mazeWallsArray[11].yUnits, 149.0, 0.0);

  //level 3 tamarrate
  drawTexCuboid(gl, program, mazeWallsArray[14], texture, 0.0, mazeWallsArray[14].yUnits+12.0, loc[6], 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, 0.0, mazeWallsArray[16].yUnits+12.0, loc[6]+2.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[16], texture, 0.0, mazeWallsArray[16].yUnits+12.0, loc[6]-2.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[14], texture, loc[6], mazeWallsArray[14].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[14], texture, 0.0, mazeWallsArray[14].yUnits+12.0, -loc[6], 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[14], texture, -loc[6], mazeWallsArray[14].yUnits+12.0, 0.0, 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -4.0, mazeWallsArray[15].yUnits, loc[6], 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture,  4.0, mazeWallsArray[15].yUnits, loc[6], 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -8.0, mazeWallsArray[15].yUnits, loc[6], 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture,  8.0, mazeWallsArray[15].yUnits, loc[6], 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture, -12.0, mazeWallsArray[15].yUnits, loc[6], 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[15], texture,  12.0, mazeWallsArray[15].yUnits, loc[6], 90.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, -loc[6], mazeWallsArray[11].yUnits, -192.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, -loc[6], mazeWallsArray[11].yUnits, 192.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, loc[6], mazeWallsArray[11].yUnits, -192.0, 0.0);
  drawTexCuboid(gl, program, mazeWallsArray[11], texture, loc[6], mazeWallsArray[11].yUnits, 192.0, 0.0);
  
}

function drawTexDoors(gl, program, door, texture){
  var x0 = -50.0;
  var x1 = 100.0;
  var x2 = 0;
  var x3 = -150.0;
  var x4 = 0.0;
  var x5 = 0.0;
  var z0 = 0.0;
  var z1 = 0.0;
  var z2 = 100.0;
  var z3 = 0.0;
  var z4 = -149.0;
  var z5 = 192.0;



	drawTexCuboid(gl, program, door, texture, x0, g_doorYunits[0], z0, 90.0, g_drawingColors[0], g_picked);
	drawTexCuboid(gl, program, door, texture, x1, g_doorYunits[1], z1, 90.0, g_drawingColors[1], g_picked);
	drawTexCuboid(gl, program, door, texture, x2, g_doorYunits[2], z2, 0.0, g_drawingColors[2], g_picked);
	drawTexCuboid(gl, program, door, texture, x3, g_doorYunits[3], z3, 90.0, g_drawingColors[3], g_picked);
	drawTexCuboid(gl, program, door, texture, x4, g_doorYunits[4], z4, 0.0, g_drawingColors[4], g_picked);
	drawTexCuboid(gl, program, door, texture, x5, g_doorYunits[5], z5, 0.0, g_drawingColors[5], g_picked);



}

function drawTexCuboid(gl, program, o, texture, x, y, z, planeAngle, color=null, picked=false) {
  gl.useProgram(program);   // Tell that this program object is used

  if(picked){
  	  gl.uniform3f(program.u_ClickedColor, color[0], color[1], color[2]);
  }
  // Assign the buffer objects and enable the assignment
  initAttributeVariable(gl, program.a_Position, o.vertexBuffer);  // Vertex coordinates
  initAttributeVariable(gl, program.a_Normal, o.normalBuffer);    // Normal
  initAttributeVariable(gl, program.a_TexCoord, o.texCoordBuffer);// Texture coordinates
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer); // Bind indices

  // Bind texture object to texture unit 0
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  drawCuboid(gl, program, o, x, y, z, planeAngle); // Draw
  //gl.bindTexture(gl.TEXTURE_2D, null);
}


// Coordinate transformation matrix
var g_cameraMatrix = new Matrix4();
var g_viewMatrix = new Matrix4();
var g_projMatrix = new Matrix4();
var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();

function drawCuboid(gl, program, o, x, y, z, planeAngle) {
  // Calculate a model matrix
  g_modelMatrix.setTranslate(x, y, z);
  g_modelMatrix.rotate(planeAngle, 0.0, 1.0, 0.0);
  
  /*g_cameraMatrix.setTranslate(xPos,yPos,zPos);
  g_cameraMatrix.rotate(yaw, 0, 1, 0);
  g_cameraMatrix.rotate(pitch, 1, 0, 0);
  g_viewMatrix.setInverseOf(g_cameraMatrix);
   */
  //generating modelViewProjectionMatrix and passing it to the uniform variable
  g_mvpMatrix.set(g_projMatrix).multiply(g_viewMatrix).multiply(g_modelMatrix);
  gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);
  gl.uniformMatrix4fv(program.u_ModelMatrix, false, g_modelMatrix.elements);
  gl.uniformMatrix4fv(program.u_CameraMatrix, false, g_cameraMatrix.elements);
  // Calculate transformation matrix for normals and pass it to u_NormalMatrix
  g_normalMatrix.setInverseOf(g_modelMatrix);
  g_normalMatrix.transpose();
  gl.uniformMatrix4fv(program.u_NormalMatrix, false, g_normalMatrix.elements);
  gl.uniform3f(program.u_TorchPosition, xPos, yPos, zPos);

  gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0);   // Draw
}





