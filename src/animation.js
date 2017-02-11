var blacklist = [];
var whitelist = [];

function computeBlackList(mazeWallsArray, locations) {

	//faccio la treasure box

	for (i = 0; i < locations.length; i++) {
		
		x0 = locations[i]+2.0;
		x1 = x0-4.0;
		z0 = x0;//mazeWallsArray[i+1].xUnits;
		z1 = z0-4.0;
		
		blacklist[i] = [[x0,z0], [x1,z1]];
	} 
 }

 function computeWhiteList(locations) {

  for (i = 0; i < locations.length; i++) {
    
    x0 = locations[i][0]+2.0;
    x1 = x0-4.0;
    z0 = locations[i][1]+2.0;//mazeWallsArray[i+1].xUnits;
    z1 = z0-4.0;
    
    whitelist[i] = [[x0,z0], [x1,z1]];
  } 
} 

function checkWhiteList(x,z){
  var insideEXT = false;
  var insideINT = false;
  for (i = 0; i < whitelist.length; i++){
    if(whitelist[i][0][0]-x > 0 && whitelist[i][0][1] - z > 0){
      insideEXT = true;
    }

    if(whitelist[i][1][0]-x < 0 && whitelist[i][1][1] - z < 0){
      insideINT = true;
    }

    if( insideINT && insideEXT && g_doorIsOpen[i]) {
      return true;
    }
    insideEXT = false;
    insideINT = false;
  }
  return false;
 }



 function checkBlackList(x,z){
 	var insideEXT = false;
 	var insideINT = false;
 	for (i = 0; i < blacklist.length; i++){
 		if(blacklist[i][0][0]-Math.abs(x) > 0 && blacklist[i][0][1] - Math.abs(z) > 0){
 			insideEXT = true;
		}

		if(blacklist[i][1][0]-Math.abs(x) > 0 && blacklist[i][1][1] - Math.abs(z) > 0){
 			insideINT = true;
		}

		if( myXOR(insideEXT, insideINT) ) {
			return false;
		}
		insideEXT = false;
		insideINT = false;
 	}
 	return true;
 }


function myXOR(a,b) {
  return ( a || b ) && !( a && b );
}



function degToRad(degrees) {
        return degrees * Math.PI / 180;
}


var currentlyPressedKeys = {};

function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}

var pitch = 0;
var pitchRate = 0;
var yaw = 0;
var yawRate = 0;
var xPos = 0.0;  
var yPos = 1.4;
var zPos = 240.7057334788756;
var speed = 0;

// disegno avatar
var step = 200.0;
var ankleInterval = 48.0;
var armInterval = 25.0;
var hipInterval = 40.0;
var kneeInterval = 40.0;
var lastUp = false;
var lastDown = false;
// 1 stands for LEFT, 2 stands for RIGHT
var g_jointAnkle1 = 0.0;   // The rotation angle of arm1 (degrees)
var g_jointAnkle2 = 0.0; // The rotation angle of joint1 (degrees)
var g_jointKnee1 = 0.0;  // The rotation angle of joint2 (degrees)
var g_jointKnee2 = 0.0;  // The rotation angle of joint3 (degrees)
var g_jointHip1 = 0.0;  // The rotation angle of joint3 (degrees)
var g_jointHip2 = 0.0;  // The rotation angle of joint3 (degrees)
var g_jointArm1 = 0.0;  // The rotation angle of joint3 (degrees)
var g_jointArm2 = 0.0;  // The rotation angle of joint3 (degrees)
var g_picked = 0.0;
var g_drawingColors = []; 


var val1 = [];
var val2 = [];
var increment = true;
var decrement = false;


function handleKeys() {

    if (currentlyPressedKeys[65]) {
        // A
        yawRate = 0.05;
    } else if (currentlyPressedKeys[68]) {
        // D
        yawRate = -0.05;
    } else if (currentlyPressedKeys[80]) {
        // P
        pitchRate = 0.05;
    } else if (currentlyPressedKeys[76]) {
        // L
        pitchRate = -0.05;
    } else {
        pitchRate = 0;
    }
    if (currentlyPressedKeys[37]) {
        // Left cursor key 
        yawRate = 0.05;
    } else if (currentlyPressedKeys[39]) {
        // Right cursor key
        yawRate = -0.05;
    } else {
        yawRate = 0;
    }


    if (currentlyPressedKeys[38]) {
        // Up cursor key
        speed = 0.03;
    } else if (currentlyPressedKeys[40]) {
        // Down cursor key
        speed = -0.03;
    } else {
        speed = 0;
    }

    if(!treasureFound){ 	
	    if (currentlyPressedKeys[38]) {
	        if(lastDown = false){
	          if(increment = true){
	            increment = false;
	            decrement = true;
	          } else {
	            increment = true;
	            decrement = false;
	          }
	      }

	      if((hipInterval/2 - step/hipInterval) < g_jointHip1){
	        increment = false;
	        decrement = true;
	      } else if ((-hipInterval/2 + step/hipInterval) > g_jointHip1){
	        increment = true;
	        decrement = false;
	      }

	    
	      lastUp = true;
	      lastDown = false;

	      if (increment) { 
	        g_jointHip1 += step/hipInterval;
	        g_jointHip2 -= step/hipInterval;
	      } else if (decrement) { 
	        g_jointHip1 -= step/hipInterval;
	        g_jointHip2 += step/hipInterval;
	      } 


	      if (increment) { 
	        g_jointKnee1 -= step/kneeInterval;
	        g_jointKnee2 += step/kneeInterval;
	      } else if (decrement) { 
	        g_jointKnee1 += step/kneeInterval;
	        g_jointKnee2 -= step/kneeInterval;
	      } 
	    
	      if (increment) { 
	        g_jointArm1 += step/armInterval;
	        g_jointArm2 -= step/armInterval;
	      } else if (decrement) { 
	        g_jointArm1 -= step/armInterval;
	        g_jointArm2 += step/armInterval;
	      }

	      if (increment) { 
	        g_jointAnkle1 += step/ankleInterval;
	        g_jointAnkle2 -= step/ankleInterval;
	      } else if (decrement) { 
	        g_jointAnkle1 -= step/ankleInterval;
	        g_jointAnkle2 += step/ankleInterval;
	      }

	    } 

	    if (currentlyPressedKeys[40]){
	      if(lastUp = false){
	          if(increment = true){
	            increment = false;
	            decrement = true;
	          } else{
	            increment = true;
	            decrement = false;
	          }
	      }

	      lastDown = true;
	      lastUp = false;
	   

	      if((hipInterval/2 - step/hipInterval) < g_jointHip1){
	        increment = true;
	        decrement = false;
	      } else if ((-hipInterval/2 + step/hipInterval) > g_jointHip1){
	        increment = false;
	        decrement = true;
	      }
	      
	      if (increment) { 
	        g_jointHip1 -= step/hipInterval;
	        g_jointHip2 += step/hipInterval;
	      } else if (decrement) { 
	        g_jointHip1 += step/hipInterval;
	        g_jointHip2 -= step/hipInterval;
	      } 


	      if (increment) { 
	        g_jointKnee1 += step/kneeInterval;
	        g_jointKnee2 -= step/kneeInterval;
	      } else if (decrement) { 
	        g_jointKnee1 -= step/kneeInterval;
	        g_jointKnee2 += step/kneeInterval;
	      } 
	    
	      if (increment) { 
	        g_jointArm1 -= step/armInterval;
	        g_jointArm2 += step/armInterval;
	      } else if (decrement) { 
	        g_jointArm1 += step/armInterval;
	        g_jointArm2 -= step/armInterval;
	      }

	      if (increment) { 
	        g_jointAnkle1 -= step/ankleInterval;
	        g_jointAnkle2 += step/ankleInterval;
	      } else if (decrement) { 
	        g_jointAnkle1 += step/ankleInterval;
	        g_jointAnkle2 -= step/ankleInterval;
	      }
	    }
	}

}

var lastTime = 0;
    // Used to make us "jog" up and down as we move forward.
var joggingAngle = 0;
var g_selectedDoors = [false, false, false, false, false, false];
var g_doorYunits = [3.0, 3.0, 3.0, 3.0, 3.0, 3.0];
var goingDown = [false, false, false, false, false, false];
var timeUPDoor = 3.0;
var g_doorUP = [false, false, false, false, false, false];
var g_doorIsOpen = [false, false, false, false, false, false];
var yDoorMax = 9.0;
var yDoorMin = 3.0;
var doorSpeed = 0.0005;
var treasureFound = false;

function animate() {
    var timeNow = new Date().getTime();
    var xPosNew = xPos;
    var yPosNew = yPos;
    var joggingAngleNew = joggingAngle;
    var zPosNew = zPos ;
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        if (speed != 0 && !treasureFound) {
            xPosNew -= Math.sin(degToRad(yaw)) * speed * elapsed;
            zPosNew -= Math.cos(degToRad(yaw)) * speed * elapsed;
            joggingAngleNew += elapsed * 0.6; // 0.6 "fiddle factor" - makes it feel more realistic :-)
            yPosNew = Math.sin(degToRad(joggingAngle)) / 20 + 1.4;
//console.log('xPos  '+ xPosNew + ' yPos  '+ zPosNew);
            if(checkBlackList(xPosNew,zPosNew)){
            	xPos = xPosNew;
            	zPos = zPosNew;
            	joggingAngle = joggingAngleNew;
            	yPos = yPosNew;
            } else if(checkWhiteList(xPosNew, zPosNew)){
            	xPos = xPosNew;
            	zPos = zPosNew;
            	joggingAngle = joggingAngleNew;
            	yPos = yPosNew;	
            } 
        }
        yaw += yawRate * elapsed;
        pitch += pitchRate * elapsed;
       
        for(i = 0; i < g_selectedDoors.length; i++){
        	if(g_selectedDoors[i] && g_doorUP){
        		if(g_doorYunits[i] < yDoorMax && !goingDown[i]){
        			g_doorYunits[i] += doorSpeed * elapsed;
        		} else if(g_doorYunits[i] > yDoorMin) {
        			g_doorYunits[i] -= doorSpeed * elapsed;
        			goingDown[i] = true;
        		} else {
        			g_doorYunits[i] = 3.0;
        			goingDown[i] = false;
              g_selectedDoors[i] = false;
        		}

        	}
        	if(g_doorYunits[i] > 5.0){
        		g_doorIsOpen[i] = true;
        	} else {
        		g_doorIsOpen[i] = false;
        	}

        }

        if(treasureFound){
          treasureYUnits += doorSpeed * elapsed;
        }
        
    }
    lastTime = timeNow;
}