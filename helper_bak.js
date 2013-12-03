function getNeighborInfo(NeighborName) {
	for (i = 0; i < NeighborInfo.length; i++) {
		if (NeighborInfo[i].name == NeighborName){
			return NeighborInfo[i];
		}
		else {
			window.alert("wrong name");
		}
	}
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

