//Sensor values are jumpy, this function if for smoothing the values
//input an array variable the output value will be the average value
function valueSmoothing(jumpyValues){
	totalValues = 0;
for(let i = 0; i < jumpyValues.length; i++){
	totalValues += jumpyValues[i];
}
var averageValue = totalValues/jumpyValues.length;
	return averageValue;
}
/*
 this function accept an array and a newValue, it is going to remove the first item of the array and add the newValue to the end of the array
*/
function valueUpdater(oldArray,newValue){
	oldArray.shift();
	oldArray.push(newValue);
	return oldArray;
}
/*
The next function is for collecting sensor data as an array
input the collected data and the data waited to be collected. E.g.let x = [1 2 3] y = 4 
x = sensorDataCollector(x,y) !! Create a empty variable if there isn’t any data being  collected. 
*/
function sensorDataCollector(sensorCollector,beingCollected){
	sensorCollector.push(beingCollected);
	return sensorCollector;
}