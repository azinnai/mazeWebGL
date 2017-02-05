// ProgramObject.js (c) 2012 matsuda and kanda
// Vertex shader for single color drawing
/*
var SOLID_VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  // The followings are some shading calculation to make the arm look three-dimensional
  '  vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));\n' + // Light direction
  '  vec4 color = vec4(1.0, 0.4, 0.0, 1.0);\n' +  // Robot color
  '  vec3 normal = normalize((u_NormalMatrix * a_Normal).xyz);\n' +
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
  '  v_Color = vec4(color.rgb * nDotL + vec3(0.1)*0.6, color.a);\n' +
  '}\n';

// Fragment shader program
var SOLID_FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';
*/
var SKYBOX_VSHADER_SOURCE = " \
  uniform mat4 u_MvpMatrix;\n\
  attribute vec3 a_Position ;\n\
  varying vec3 vpos ;\n\
  void main ( void )\n\
  {\n\
    vpos = a_Position;\n\
    gl_Position = u_MvpMatrix * vec4 (a_Position , 1.0);\n \
  }";

var SKYBOX_FSHADER_SOURCE = " \
  precision highp float ;\n\
  uniform samplerCube u_CubeMap; \n \
  varying vec3 vpos ;\n\
  void main( void )\n\
  {\n\
    vec3 color = textureCube(u_CubeMap, vpos).rgb;\n \
    gl_FragColor = vec4(0.2*color, 1.0) ;\n \
  } ";
// Vertex shader for texture drawing
var TEXTURE_VSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'varying float v_NdotL;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec3 v_Normal;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader for texture drawing
var TEXTURE_FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'uniform vec3 u_TorchColor;\n' +     // Light color  
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'uniform mat4 u_CameraMatrix;\n' +
  'uniform vec3 u_TorchPosition;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'void main() {\n' +
  '  vec4 color = texture2D(u_Sampler, v_TexCoord);\n' +

  '  vec3 normal = normalize(v_Normal);\n' +
  
  //diffuse light from light source
  '  vec4 torchDirection = u_CameraMatrix * vec4(0.0,0.0,-1.0, 0.0);\n' +
  '  float r = distance(u_TorchPosition, v_Position);\n' +
  '  vec3 L = normalize(u_TorchPosition - v_Position);\n' +
  '  float LdotNDiffuse = dot(torchDirection.xyz, -L);\n' +
  '  if(LdotNDiffuse > 0.6) LdotNDiffuse = pow(LdotNDiffuse, 100.0);\n' +
  '  else LdotNDiffuse = 0.0;\n' +
  '	 float NdotLDiffuse = max(0.0, dot(normal, L))/(0.003*r*r);\n' +
  '  float diffuseCoef = LdotNDiffuse*NdotLDiffuse;\n' +
  '  if(diffuseCoef>0.7) diffuseCoef = 0.7;\n ' +
  '  vec3 diffuse =  diffuseCoef * u_TorchColor * color.rgb ;\n' +

  //ambient light
  '  vec3 ambient = 0.8 * u_AmbientLight * color.rgb;\n' +
    //directional light
  '  vec3 colorDirectionalLight = vec3(1.0, 1.0, 1.0);\n' +  // Robot color
  '  vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));\n' + // Light direction
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
  '  vec3 directional = nDotL*colorDirectionalLight*color.rgb;\n' +
  '    gl_FragColor = vec4(diffuse + 0.4*ambient + 0.4*directional, color.a);\n' +
  '}\n';

  var MOUSE_VSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'varying float v_NdotL;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec3 v_Normal;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader for texture drawing
var MOUSE_FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'uniform vec3 u_TorchColor;\n' +     // Light color  
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'uniform mat4 u_CameraMatrix;\n' +
  'uniform vec3 u_TorchPosition;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'uniform bool u_Clicked;\n' + // Mouse is pressed
  'void main() {\n' +
  '  vec4 color = texture2D(u_Sampler, v_TexCoord);\n' +

  '  vec3 normal = normalize(v_Normal);\n' +
  
  //diffuse light from light source
  '  vec4 torchDirection = u_CameraMatrix * vec4(0.0,0.0,-1.0, 0.0);\n' +
  '  float r = distance(u_TorchPosition, v_Position);\n' +
  '  vec3 L = normalize(u_TorchPosition - v_Position);\n' +
  '  float LdotNDiffuse = dot(torchDirection.xyz, -L);\n' +
  '  if(LdotNDiffuse > 0.6) LdotNDiffuse = pow(LdotNDiffuse, 100.0);\n' +
  '  else LdotNDiffuse = 0.0;\n' +
  '	 float NdotLDiffuse = max(0.0, dot(normal, L))/(0.003*r*r);\n' +
  '  float diffuseCoef = LdotNDiffuse*NdotLDiffuse;\n' +
  '  if(diffuseCoef>0.7) diffuseCoef = 0.7;\n ' +
  '  vec3 diffuse =  diffuseCoef * u_TorchColor * color.rgb ;\n' +

  //ambient light
  '  vec3 ambient = 0.8 * u_AmbientLight * color.rgb;\n' +
    //directional light
  '  vec3 colorDirectionalLight = vec3(1.0, 1.0, 1.0);\n' +  // Robot color
  '  vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));\n' + // Light direction
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
  '  vec3 directional = nDotL*colorDirectionalLight*color.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + 0.4*ambient + 0.4*directional, color.a);\n' +
  '  if (u_Clicked) {\n' + //  Draw in red if mouse is pressed
  '    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '  }\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  var skyProgram = createProgram(gl, SKYBOX_VSHADER_SOURCE, SKYBOX_FSHADER_SOURCE);
  var texProgram = createProgram(gl, TEXTURE_VSHADER_SOURCE, TEXTURE_FSHADER_SOURCE);
  var mouseProgram = createProgram(gl, MOUSE_VSHADER_SOURCE, MOUSE_FSHADER_SOURCE);
  if (!texProgram || !skyProgram || !mouseProgram) {
    console.log('Failed to intialize shaders.');
    return;
  }

  //retrieve locations of shader variables
  skyProgram = getSkyProgramLocations(gl, skyProgram);
  texProgram = getTexProgramLocations(gl, texProgram);
  mouseProgram = getMouseProgramLocations(gl, mouseProgram);

  
  //lights in the scene, better to put in a function
  gl.useProgram(texProgram);
   // Set the light color (white)
  gl.uniform3f(texProgram.u_TorchColor, 1.0, 1.0, 1.0);

  gl.uniform3f(texProgram.u_AmbientLight , 1.0, 1.0, 1.0);

  gl.useProgram(mouseProgram);
   // Set the light color (white)
  gl.uniform3f(mouseProgram.u_TorchColor, 1.0, 1.0, 1.0);

  gl.uniform3f(mouseProgram.u_AmbientLight , 1.0, 1.0, 1.0);

  //initializing vertex buffers
  var mazeWalls = initMazeVertexBuffers(gl);
  if (!mazeWalls){
    console.log('Failed to set mazeWalls vertex information');
    return;
  }

  var halfFloorSideLength = 250.0;
  var floor = initFloorVertexBuffers(gl, halfFloorSideLength);
  if (!floor){
    console.log('Failed to set floor vertex information');
    return;
  }

  var skyCube = initSkyCubeVertexBuffers(gl);
  if (!skyCube){
    console.log('failed to set skyCube vertex information');
  }

  var avatar = initAvatarVertexBuffers(gl);
  if (!avatar){
    console.log('failed to set avatar vertex information');
  }

  var door = initDoorVertexBuffers(gl);
  if (!door){
    console.log('failed to set door vertex information');
  }


  // Set textures
  var mazeWallTexture = init2DTexture(gl, texProgram, 'resources/wallstone.jpg');
  if (!mazeWallTexture) {
    console.log('Failed to intialize the cube texture.');
    return;
  }

  var floorTexture = init2DTexture(gl, texProgram, 'resources/floor.jpg');
  if (!floorTexture) {
    console.log('Failed to intialize the floor texture.');
    return;
  }

  var avatarTexture = init2DTexture(gl, texProgram, 'resources/avatar.jpg');
  if (!floorTexture) {
    console.log('Failed to intialize the avatar texture.');
    return;
  }
  //il tesoro si deve stampare con un'altra funzione non in drawtexobjects
  var treasureTexture = init2DTexture(gl, texProgram, 'resources/wood.jpg'); //questa bisogna cambiarla, ce ne sono alcune carine ma non gli piacciono
  if (!floorTexture) {
    console.log('Failed to intialize the trasure texture.');
    return;
  }

  var doorTexture = init2DTexture(gl, mouseProgram, 'resources/door.jpg'); //questa bisogna cambiarla, ce ne sono alcune carine ma non gli piacciono
  if (!doorTexture) {
    console.log('Failed to intialize the door texture.');
    return;
  }

  var cubeMapTexture = createCubeMap(gl,
    'resources/cubemap/posx.jpg', 
    'resources/cubemap/negx.jpg',
    'resources/cubemap/posy.jpg',
    'resources/cubemap/negy.jpg',
    'resources/cubemap/posz.jpg',
    'resources/cubemap/negz.jpg'
    );

  if(!cubeMapTexture){
    console.log('failed to initialize sky texture. ')
  }

  // Set the clear color and enable the depth test
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  g_projMatrix.setPerspective(40.0, canvas.width/canvas.height, 0.02, 400.0);

  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;


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


	var x0 = 50.0;
	var z0 = 26.25;
	var x1 = 100.0;
	var z1 = 52.0;
	var x2 = 150.0;
	var z2 = 76.5;
	var x3 = 192.0;
	var z3 = 98.0;
	var blackLocations = [x0, x1, x2, x3, halfFloorSideLength];

	var drawLocations = [x0, z0, x1, z1, x2, z2, x3, z3];

	computeBlacklist(mazeWalls, blackLocations);

	canvas.onmousedown = function(ev) {   // Mouse is pressed
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      // If pressed position is inside <canvas>, check if it is above object
      var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
      var picked = check(gl, x_in_canvas, y_in_canvas, mouseProgram.u_Clicked, mouseProgram, door, doorTexture);
      if (picked) alert('The cube was selected! ');

    }
  }

  var tick = function() {
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear color and depth buffers

    handleKeys();

    animate();
    drawTexSkyBox(gl, skyProgram, skyCube, cubeMapTexture);
    drawTexFloor(gl, texProgram, floor, floorTexture);
   	drawTexMazeWalls(gl, texProgram, mazeWalls, mazeWallTexture, treasureTexture, x_treas, z_treas, drawLocations);
    drawTexAvatar(gl, texProgram, avatar, avatarTexture);
    drawTexDoors(gl, mouseProgram, door, doorTexture);
    
    window.requestAnimationFrame(tick, canvas);

  };

  tick();
}

function check(gl, x, y, u_Clicked, mouseProgram, door, doorTexture) {
  var picked = false;
  gl.uniform1i(u_Clicked, 1);  // Pass true to u_Clicked
  drawTexDoors(gl, mouseProgram, door, doorTexture);
  // Read pixel at the clicked position
  var pixels = new Uint8Array(4); // Array for storing the pixel value
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  if (pixels[0] == 255) // The mouse in on cube if R(pixels[0]) is 255
    picked = true;

  gl.uniform1i(u_Clicked, 0);  // Pass false to u_Clicked(rewrite the cube)
  drawTexDoors(gl, mouseProgram, door, doorTexture);
  
  return picked;
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

