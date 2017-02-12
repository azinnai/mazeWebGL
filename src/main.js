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
    gl_FragColor = vec4(0.7*color, 1.0) ;\n \
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
  'uniform vec3 u_TreasureLight;\n' +   // Ambient light color
  'uniform mat4 u_CameraMatrix;\n' +
  'uniform vec3 u_TorchPosition;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'uniform bool u_TreasureFound;\n' + // Mouse is pressed
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
  '  vec3 ambient = u_AmbientLight * color.rgb;\n' +
    //directional light
  '  vec3 colorDirectionalLight = vec3(1.0, 1.0, 1.0);\n' +  // Robot color
  '  vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));\n' + // Light direction
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
  '  vec3 directional = nDotL*colorDirectionalLight*color.rgb;\n' +
  '  if(u_TreasureFound){\n' + 
  '     gl_FragColor = vec4(u_TreasureLight*color.rgb, color.a);\n' +
  '  } else {\n' +
  '     gl_FragColor = vec4(diffuse + 0.4*ambient + 0.4*directional, color.a);\n' +
  '  }\n' +
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
  'uniform vec3 u_ClickedColor;\n' +   // Ambient light color
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
  '  vec3 ambient = u_AmbientLight * color.rgb;\n' +
    //directional light
  '  vec3 colorDirectionalLight = vec3(1.0, 1.0, 1.0);\n' +  // Robot color
  '  vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));\n' + // Light direction
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
  '  vec3 directional = nDotL*colorDirectionalLight*color.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + 0.4*ambient + 0.4*directional, color.a);\n' +
  '  if (u_Clicked) {\n' + //  Draw in red if mouse is pressed
  '    gl_FragColor = vec4(u_ClickedColor, 1.0);\n' +
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

  var treasure = initTreasureVertexBuffers(gl);
  if (!treasure){
    console.log('Failed to set treasure vertex information');
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


	treasurePos = treasureRandomPos();
  treasurePos = [0,230];
	//setting mazewalls locations
	var x0 = 50.0;
	var z0 = 26.25;
	var x1 = 100.0;
	var z1 = 52.0;
	var x2 = 150.0;
	var z2 = 76.5;
	var x3 = 192.0;
	var z3 = 98.0;
	var blackLocations = [x0, x1, x2, x3, halfFloorSideLength];
  computeBlackList(mazeWalls, blackLocations);

	var drawLocations = [x0, z0, x1, z1, x2, z2, x3, z3];

  var x0D = -50.0;
  var x1D = 100.0;
  var x2D = 0;
  var x3D = -150.0;
  var x4D = 0.0;
  var x5D = 0.0;
  var z0D = 0.0;
  var z1D = 0.0;
  var z2D = 100.0;
  var z3D = 0.0;
  var z4D = -149.0;
  var z5D = 192.0;

  var doorLocations = [[x0D,z0D], [x1D,z1D], [x2D,z2D], [x3D,z3D], [x4D,z4D], [x5D,z5D]];
  computeWhiteList(doorLocations);

  	g_drawingColors  = [[1.0,0.0,0.0], [0.0,1.0,0.0], [0.0,0.0,1.0], [0.0,0.5,0.5], [0.5,0.5,0.0], [0.5,0.0,0.5], [0.9,0.5,0.5]];
	canvas.onmousedown = function(ev) {   // Mouse is pressed
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      // If pressed position is inside <canvas>, check if it is above object
      var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
      check(gl, x_in_canvas, y_in_canvas, mouseProgram, door, doorTexture);
    }
  }

  var goalDist = 8.0;
  var treasureYUnitsMax = 3.0;
  var rT = 1.0;
  var gT = 1.0;
  var bT = 1.0;

  var tick = function() {

    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear color and depth buffers

    handleKeys();

    animate();
    if(pointDist(treasurePos, [xPos,zPos]) < goalDist){
      rT = 1.0;
      gT = 1.0;
      bT = 1.0;
      var factor = treasureYUnits/treasureYUnitsMax*1.4;
      //var factor = 1.0;
      treasureFound = true;
      gl.useProgram(texProgram);
      gl.uniform1i(texProgram.u_TreasureFound, 1);  // Pass true to u_Clicked
      gl.uniform3f(texProgram.u_TreasureLight, rT*factor, gT*factor, bT*factor);
    }

    if(treasureYUnits > treasureYUnitsMax){

       window.alert("Yuppy!! You have found the treasure!!!");
    }

    drawTexSkyBox(gl, skyProgram, skyCube, cubeMapTexture);
    drawTexFloor(gl, texProgram, floor, floorTexture);
   	drawTexMazeWalls(gl, texProgram, mazeWalls, mazeWallTexture, drawLocations);
    drawTexAvatar(gl, texProgram, avatar, avatarTexture);
    drawTexDoors(gl, texProgram, door, doorTexture);
    drawTexTreasure(gl, mouseProgram, treasure, treasureTexture, treasurePos[0], treasurePos[1]);

    window.requestAnimationFrame(tick, canvas);

  };

  tick();
}




