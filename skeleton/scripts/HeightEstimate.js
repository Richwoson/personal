//Sensing device orientation
//placing the angle in div id "toast"
let angleRef = document.getElementById("toast");

//device orientation
window.addEventListener('deviceorientation',handleOrientation);
let anglerecord, betaAngle = []; //used to record base and apex angles
function handleOrientation(event){
    if (event.beta < 0){
        angle = "Phone is upside down!";
    } else if (event.beta === null) {
        angle = "Cannot connect to the sensor."
    } else {
        if(betaAngle.length < 10){
            betaAngle.push(event.beta)
        } else{
            betaAngle.shift()
            betaAngle.push(event.beta)
        }
    }
    let i = 0, angleSum = 0;
    while(i < betaAngle.length){
        angleSum += betaAngle[i]
        i++
    }
    angleRef.innerHTML = (angleSum/betaAngle.length).toFixed(2)
    anglerecord=event.beta
    console.log(betaAngle)
}

//Feature 2: Smoothing sensor data


//Setting camera height
let cameraHeight = 1; //used in height and distance calculation, Default value =1
var heightLabel = document.getElementById("heightOfCamera")
var heightCamRef = document.getElementById("cameraHeight")
function heightCamera() {
    heightCamRef = prompt("enter the height of camera from the base")
    var height = Number(heightCamRef)
    cameraHeight = Math.abs(height)
    if (isNaN(height)) {
        height = "Please input a number"
    }  else {
        height = "Camera height: " + Math.abs(height) + "m"
    }
    heightLabel.innerHTML = height
}

//Recording tilt angles
let baseAngle = 0, topAngle = 0; //used in height and distance calculation 
function BaseAngle(){
    document.getElementById('baseAngle').innerHTML = 'The base angle is: ' + anglerecord.toFixed(2) + "°"
    baseAngle = anglerecord
}
function TopAngle(){
    document.getElementById('topAngle').innerHTML = 'The apex angle is: ' + anglerecord.toFixed(2) + "°"
    topAngle = anglerecord
}


//Calculating height and distance of the object
function calculatehnd(){
    //default value
    let b = 0, distance = 0; 
    if (cameraHeight === 1){
        heightLabel.innerHTML = "No input! Default heigt: 1m"
    }
    //error messages
    if (baseAngle < 0 || topAngle < 0){
        angleRef.innerHTML = "Phone is upside down!"
    } else if(baseAngle > topAngle){
        angleRef.innerHTML = "Base angle must be smaller than the apex angle"
    } else {
        //changing angles to radiant 
        let baseAngleRad = baseAngle*Math.PI/180
        let topMinusBaseAngleRad = (topAngle-baseAngle)*Math.PI/180
        let theta3AngleRad = (180 - baseAngle - (topAngle-baseAngle))*Math.PI/180
        //calculations, a: hypotenous of lower triangle b: height of object
        let a = cameraHeight/Math.cos(baseAngleRad)
        b = a*Math.sin(topMinusBaseAngleRad) / Math.sin(theta3AngleRad)
        
        //calculation of distance
        distance = (Math.tan(baseAngleRad))*cameraHeight
    }

    //output to the HTML
    document.getElementById('heightOfObject').innerHTML = "Est. object height: " + b.toFixed(2) + "m"
    document.getElementById('distanceOfObject').innerHTML = "Est. distance of object: " + distance.toFixed(2) + "m"
}