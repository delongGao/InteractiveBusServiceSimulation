// console.log(startPoint.x);
				// var focusStart = svgS.append("circle")
				// 	.attr("cx", ww * 0.5 + (startPoint.x - cenLong) * milePerLong * mile2Meter / zoomRes)
				// 	.attr("cy", wh * 0.5 + (startPoint.y - cenLat) * milePerLat * mile2Meter / zoomRes)
				// 	.attr("r", "20")
				// 	.attr("stroke", focusCol)
				// 	.attr("stroke-width", "0")
				// 	.attr("class", "focused")
				// 	.style("fill", focusCol);
				// focusStart.transition()
				// 		  .attr("stroke", focusCol)
				// 		  .attr("stroke-width", "2");
				
				// console.log(endPoint.x);
				// var focusEnd = svgS.append("circle")
				// 	.attr("cx", ww * 0.5 + (endPoint.x - cenLong) * milePerLong * mile2Meter / zoomRes)
				// 	.attr("cy", wh * 0.5 + (endPoint.y - cenLat) * milePerLat * mile2Meter / zoomRes)
				// 	.attr("r", "20")
				// 	.attr("stroke", focusCol)
				// 	.attr("stroke-width", "0")
				// 	.attr("class","focused")
				// 	.style("fill", focusCol);
				// focusEnd.transition()
				// 		  .attr("stroke", focusCol)
				// 		  .attr("stroke-width", "2");
				
				// console.log(neighbors);



				function drawPath(routeNum, n1, n2) {
		// var rawPathData = busStop[routeNum].direction0;
		// var rawPathDataLength = Object.keys(rawPathData).length;
		// // parse float to int
		// // var step = parseInt(rawPathDataLength / 1.5);
		// // console.log(step);
		// var startTem = getNeighborInfo(n1);
		// var startPoint = {
		// 	"Direction":"0",
		// 	"Latitude":startTem.y,
		// 	"Longitude":startTem.x,
		// 	"StopName":startTem.name
		// }
		// var endTem = getNeighborInfo(n2);
		// var endPoint = {
		// 	"Direction":"0",
		// 	"Latitude":endTem.y,
		// 	"Longitude":endTem.x,
		// 	"StopName":endTem.name
		// }

		// var disLong = Math.abs(startPoint.Longitude - endPoint.Longitude);
		// var disLat = Math.abs(startPoint.Latitude - endPoint.Latitude);
		
		// var midPoint = {
		// 	"Direction":"0",
		// 	"Latitude":parseFloat(startPoint.Latitude) + disLat * Math.random() * 0.1,
		// 	"Longitude":parseFloat(startPoint.Longitude) + disLong * Math.random() * 0.1,
		// 	"StopName":"midPoint"
		// }

		// // console.log(disLong,disLat);
 	// 	var pathData = [];
 	// 	// add start point and end point
 	// 	pathData.push(startPoint);
		// pathData.push(midPoint);
		// // for (i = 0; i < rawPathDataLength; i = i + step) {
		// // 	pathData.push(rawPathData[Object.keys(rawPathData)[i]]);
		// // 	console.log(i);
		// // }
		// pathData.push(endPoint);
		// console.log(pathData);
		// var lineFunction = d3.svg.line()
	 //                        	 .x(function(d) { 
	 //                        	 	return ww * 0.5 + (d.Longitude - cenLong) * milePerLong * mile2Meter / zoomRes;
	 //                        	  })
		//                     	 .y(function(d) { 
		//                     	 	return wh * 0.5 - (d.Latitude - cenLat) * milePerLat * mile2Meter / zoomRes;
		//                     	  })
	 //    	                	 .interpolate("linear");
	 //   	var lineGraph = svgS.append("path")
		//                             .attr("d", lineFunction(pathData))
		//                             .attr("stroke", "blue")
		//                             .attr("stroke-width", 2)
		//                             .attr("fill", "none");
	}




					// for (j = 0; j < routeArray.length; j++) {
   		// 				// add content to control panel 
						


					// 	var routeItem = $("<div></div>");
					// 	routeItem.text(routeArray[j]);
					// 	if (j != routeArray.length - 1) {
					// 		routeItem.css({
					// 			"borderBottom":"dashed 1px #cbd0d3"
					// 		})
					// 	}
					// 	routeItem.appendTo($("#controlPanel #routes #" + target + " .tContent"));
						
					// 	// add routes on the map
					// 	var currRoute = routeArray[j];
					// 	// console.log(n1, n2);
					// 	// if (target == "currentR") {
					// 	// 	drawPath(currRoute, n1, n2);
					// 	// }
					// }




					var focusCol = d3.rgb(52, 73, 94);
				var startPoint = $("circle[data-name='" + n1 + "']");
				var endPoint = $("circle[data-name='" + n2 + "']");