function getNeighborInfo(NeighborName) {
	for (i = 0; i < NeighborInfo.length; i++) {
		if (NeighborInfo[i].name == NeighborName){
			return NeighborInfo[i];
		}
		/*
		else {
			window.alert("wrong name");
		}*/
	}
	window.alert("wrong name");
}

function getPairID(NeighborName1, NeighborName2) {
	if (NeighborName2 < NeighborName1) {
		var temp = NeighborName1;
		NeighborName1 = NeighborName2;
		NeighborName2 = temp;
	}
	var key = NeighborName1 + "/" + NeighborName2;
	var temp = NeighborPairDict[key];
	if (temp != null){
		return temp;
	}
	else {
		window.alert("check the name");
	}
}

function getRidershipOneRoute(Route) {
	var rship = ridership[Route];
	if (rship != null) return rship;
	else window.alert("wrong route number" + Route);
}

function getRiderships(Routes) {
	if (Routes.length == 0) return null;
	var result = 0;
	for(var i = 0; i < Routes.length; i++) {
		result += getRidershipOneRoute(Routes[i]);
	}
	return parseFloat(result.toFixed(2));
}

function getPairRoutes(NeighborName1, NeighborName2) {
	var id = getPairID(NeighborName1, NeighborName2);
	var pair = NeighborPair[id];
	var result = {};
	result["currentBus"] = pair["current bus"];
	result["deleteBus"] = pair["delete bus"];
	result["reduceBus"] = pair["reduce bus"];
	result["retainBus"] = pair["retain bus"];
	result["soundTransit"] = pair["sound transit"];
	result["currentRidership"] = getRiderships(result["currentBus"]);
	return result;
}

//below are functions that could be used as API
//return two neighbors's local information (object), different types of routes (arrays)
function getPair(NeighborName1, NeighborName2) {
	if (NeighborName2 < NeighborName1) {
		var temp = NeighborName1;
		NeighborName1 = NeighborName2;
		NeighborName2 = temp;
	}
	var N1 = getNeighborInfo(NeighborName1);
	var N2 = getNeighborInfo(NeighborName2);
	var pairRoutes = getPairRoutes(NeighborName1, NeighborName2);
	var result = {};
	result[NeighborName1] = N1;
	result[NeighborName2] = N2;
	result["Routes"] = pairRoutes;
	return result;
}

//return related neighbors to one particular neighbor
function getRelatedNeighbors(NeighborName) {
	var result = relatedPairs[NeighborName];
	if (result != null) {
		return result;
	}
	else{
		window.alert("wrong name");
	}
}

//calculate how much the ridership increase for each remaining route
//based on parameter1: how much reducing passengers that still take bus
//parameter2: how much to reduce the "reduced bus"
//both passed with decimal number, like 0.6
//return an array, 
//the zeroth element means the calculation of average ridership after bus reduction
//the firth element means the increase of ridership per route
//the second means the result of average ridership per route after reduncion
//the third means the number of remaining routes
//the fourth means the number of current routes
//the fifth means the current Ridership
//the sixth means the average ridership before reduction 
function getRidershipIncrease(NeighborName1, NeighborName2, stillBus, reduceBus){	
	var result = getPair(NeighborName1, NeighborName2);
	var N1 = NeighborName1;
	var N2 = NeighborName2;
	if (result[N1]["medianHouseholdIncome"] < result[N2]["medianHouseholdIncome"]) {
		var temp = N1;
		N1 = N2;
		N2 = temp;
	}
	var PD1 = result[N1]["populationDensity"]
	var PD2 = result[N2]["populationDensity"]
	var currentBusNumber = result["Routes"]["currentBus"].length;
	var deleteBusNumber = result["Routes"]["deleteBus"].length;
	var reducedBusNumber = result["Routes"]["reduceBus"].length;
	var currentRidership = result["Routes"]["currentRidership"];
	var remainBusNumber = currentBusNumber - deleteBusNumber - reducedBusNumber * reduceBus;
	if (remainBusNumber == 0) {
		return "Suck! No more bus service!";
	}
	var ridership = -39.82 + 0.003756 * PD1 + 0.001995 * PD2 + 27.23 * remainBusNumber;
	var ridershipAvg = ridership / remainBusNumber;
	var increase = (currentRidership - ridership) * stillBus / remainBusNumber;
	return [ridershipAvg, increase, ridershipAvg + increase, remainBusNumber, currentBusNumber, currentRidership, currentRidership/currentBusNumber];
}