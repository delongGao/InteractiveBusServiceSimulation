	// load basemap 
	  dojo.require("esri.map");
	  var map;
	  function init() {
	    map = new esri.Map("mapDiv", {
	      center: [-122.253, 47.605],
	      // center: [-122.355, 47.508],
	      zoom: 10,
	      basemap: "gray"
	    });
	  }
	  dojo.ready(init);
	
		// constants:
		var zoomLvRes = {
			"0":"156543.03",
			"1":"78271.52",
			"2":"39135.76",
			"3":"19567.88",
			"4":"9783.94",
			"5":"4891.97",
			"6":"2445.98",
			"7":"1222.99",
			"8":"611.50",
			"9":"305.75",
			"10":"152.87",
			"11":"76.437",
			"12":"38.219",
			"13":"19.109",
			"14":"9.5546",
			"15":"4.7773",
			"16":"2.3887",
			"17":"1.1943",
			"18":"0.5972"
		}
		neighborData = NeighborInfo;
		var ww = window.innerWidth;
		var wh = window.innerHeight;
		// var milePerLong = 47.574;
		var milePerLong = 68;

		// var milePerLat = 69.04;
		var milePerLat = 98;

		var cenLong = -122.253;
		var cenLat = 47.605;
		var mile2Meter = 1609.34;
		// this maybe updated to an array of different zoom levels
		var zoomRes = zoomLvRes["10"];

		// area
		var initialAreas = areas;
		// var newScaledAreas = [];
		var linearScale = d3.scale.linear()
                           .domain([d3.min(initialAreas),d3.max(initialAreas)])
                           .range([3,10]);
        for (var i = 0; i < initialAreas.length; i++) {
        	// the new scaled data should be updated to the original neighborhood info
			NeighborInfo[i].r = linearScale(initialAreas[i]);
		}

		// 
		var initialPPD = ppd;
		// var newScaledAreas = [];
		var linearScale = d3.scale.linear()
                           .domain([d3.min(initialPPD),d3.max(initialPPD)])
                           .range([0.2,1]);
        for (var i = 0; i < initialPPD.length; i++) {
        	// the new scaled data should be updated to the original neighborhood info
			NeighborInfo[i].opacity = linearScale(initialPPD[i]);
		}

		// routePathTem
		var routePathTem = {
			"currentR":null,
			"deleteR":null,
			"reducedR":null
		};

		// var start = null;
		// var end = null;

// d3 add elements
		var svgS = d3.select("svg");

		// circles
		var circles = svgS.selectAll("circle")
						  .data(neighborData)
						  .enter()
						  .append("circle");
		var circleAttr = circles
						 .attr("cx",function(d) { 
						 	return ww * 0.5 + (d.x - cenLong) * milePerLong * mile2Meter / zoomRes;
						 })
						 .attr("cy", function(d) {
						 	return wh * 0.5 - (d.y - cenLat) * milePerLat * mile2Meter / zoomRes;
						 })
						 .attr("r", function(d) {
						 	return d.r;
						 })
						 .attr("stroke", "red")
						 .attr("data-name", function(d) { return d.name; })
						 .style("fill", "red")
						 .style("opacity", function(d) {
						 	return d.opacity;
						 })
						 .append("svg:title")
						 .text(function(d) { return d.name; })
						 .attr("font-family", "sans-serif")
	                     .attr("font-size", "10px")
	      //                .attr("fill", "black");

	    // var texts = svgS.selectAll("div")
	    // 				.data(neighborData)
	    // 				.enter()
	    // 				.append("div");
	    // var textLabels = texts.attr("x", function(d) { return d.x; })
	    // 					  .attr("y", function(d) { return d.y; })
	    // 					  .text(function(d) { return d.name; })
	    // 					  .attr("class", "label label-default")
	    // 					  .attr("font-size", "20px")
	    // 					  .attr("fill", "white");

			
// document ready function 
		$(function() {
			$("circle").click(function(event) {
				// console.log(this.getAttribute("data-name"));
				event.stopPropagation();
				
				if ($("#controlPanel").css("display") != "none") {
					$("#controlPanel #routes td.tContent").empty();
					$("#widgets").slideUp();
					$("#widgets input").val("");
					// change table
					$("table#after").slideUp(function() {
						$("table#before").slideDown();
					});
				}

				var n1Name = this.getAttribute("data-name");
				$("#controlPanel")
					.css({
						"right":"0",
						"zIndex": "11"
					})
					.fadeIn();
				$("#controlPanel #n1").text(n1Name);

				var currRelPairs = relatedPairs[n1Name];
				$("#controlPanel #n2 select").empty();
				for (i = 0; i < currRelPairs.length; i++) {
					var option = $("<option></option>");
					option.val(currRelPairs[i]);
					// option.val(currRelPairs[i].replace(/ /g,''));
					// because of system dependencies, the string cannot be trimmed.
					option.text(currRelPairs[i]); 
					$("#controlPanel #n2 select").append(option);
				}
			});

			$("#featureSVG").click(function() {
				if ($("#controlPanel").css("display") != "none") {
					$("#controlPanel").fadeOut();
					$("#controlPanel #routes td.tContent").empty();	
					$("#widgets").slideUp();
					$("#widgets input").val("");
					// change table
					$("table#after").slideUp(function() {
						$("table#before").slideDown();
					});
				}
			})

			// after selection
			$("#controlPanel #n2 select").on("change", function() {
				// $("path").remove();
				// $("circle.focused").removeClass("focused");

				// change table
				$("table#after").slideUp(function() {
					$("table#before").slideDown();
				});

				var n1 = $("#controlPanel #n1").text();
				var n2 = $(this).val();
				var pairRoutesInfo = getPairRoutes(n1, n2);
				// console.log(pairRoutesInfo);
				currentBuses = pairRoutesInfo.currentBus;
				deleteBuses = pairRoutesInfo.deleteBus;
				reduceBuses = pairRoutesInfo.reduceBus;
				var routeTMP = {};
				routeTMP["currentR"] = pairRoutesInfo.currentBus;
				routeTMP["deleteR"] = pairRoutesInfo.deleteBus;
				routeTMP["reducedR"] = pairRoutesInfo.reduceBus;
				routeTMP.length = 3;

				// console.log(currentBuses, deleteBuses, reduceBuses);
				
				$("#controlPanel #routes td.tContent").empty();
				
				var routeData = [];
				var initialWidth = [];	
				var barCurrCol = d3.rgb(46, 204, 113);

				// populate initial width
				for (var key in routeTMP) {
					if (!jQuery.isEmptyObject(routeTMP[key])) {
						var currArray = routeTMP[key];
						for (j = 0; j < currArray.length; j++) {
							// console.log(currArray[j]);
							// add initialWidth
							initialWidth.push(getRidershipOneRoute(currArray[j]));	
						}
						// console.log(routeData);
					}
				}
				var widthMax = d3.max(initialWidth);
				var widthMin = d3.min(initialWidth);
				// console.log(d3.max(initialWidth), d3.min(initialWidth));

				// reset
				routeData = [];
				initialWidth = [];
				// populate current bus
				if (currentBuses != null) {
					for (i = 0; i < currentBuses.length; i++) {					
						initialWidth.push(getRidershipOneRoute(currentBuses[i]));
						var busItem = {
							"busNum":currentBuses[i],
							"riderShip":getRidershipOneRoute(currentBuses[i])
						}
						routeData.push(busItem);
					}
					// console.log(initialWidth);
					// console.log(routeData);
				}
				var linearScale = d3.scale.linear()
                           .domain([widthMin,widthMax])
                           .range([20,215]);
		        for (var i = 0; i < initialWidth.length; i++) {
		        	// the new scaled data should be updated to the original neighborhood info
					routeData[i].width = linearScale(initialWidth[i]);
				}
				var currBusContainer = d3.select("#controlPanel #routes #currentR .tContent");
				var curbars = currBusContainer.selectAll("div")
				  				.data(routeData)
				  				.enter()
				  				.append("div")
				  				.style("width", function(d) { return d.width + "px"; })
				  				.style("background-color", barCurrCol)
				  				.attr("class", "barChart")
				  				.attr("title", function(d) { return d.riderShip; })
				  				.text(function(d) { return "Route " + d.busNum; });
				


				// populate delete bus
				routeData = [];
				initialWidth = [];
				var barDeleCol = d3.rgb(231, 76, 60);

				if (deleteBuses != null) {
					for (i = 0; i < deleteBuses.length; i++) {					
						initialWidth.push(getRidershipOneRoute(deleteBuses[i]));
						var busItem = {
							"busNum":deleteBuses[i],
							"riderShip":getRidershipOneRoute(deleteBuses[i])
						}
						routeData.push(busItem);
					}
					// console.log(initialWidth);
					// console.log(routeData);
				}
				var linearScale = d3.scale.linear()
                           .domain([widthMin,widthMax])
                           .range([20,215]);
		        for (var i = 0; i < initialWidth.length; i++) {
		        	// the new scaled data should be updated to the original neighborhood info
					routeData[i].width = linearScale(initialWidth[i]);
				}
				var deleBusContainer = d3.select("#controlPanel #routes #deleteR .tContent");
				var delbars = deleBusContainer.selectAll("div")
				  				.data(routeData)
				  				.enter()
				  				.append("div")
				  				.style("width", function(d) { return d.width + "px"; })
				  				.style("background-color", barDeleCol)
				  				.attr("class", "barChart")
				  				.attr("title", function(d) { return d.riderShip; })
				  				.text(function(d) { return "Route " + d.busNum; });
				
				// populate reduced bus
				routeData = [];
				initialWidth = [];
				var barReduCol = d3.rgb(241, 196, 15);

				if (reduceBuses != null) {
					for (i = 0; i < reduceBuses.length; i++) {					
						initialWidth.push(getRidershipOneRoute(reduceBuses[i]));
						var busItem = {
							"busNum":reduceBuses[i],
							"riderShip":getRidershipOneRoute(reduceBuses[i])
						}
						routeData.push(busItem);
					}
					// console.log(initialWidth);
					// console.log(routeData);
				}
				var linearScale = d3.scale.linear()
                           .domain([widthMin,widthMax])
                           .range([20,215]);
		        for (var i = 0; i < initialWidth.length; i++) {
		        	// the new scaled data should be updated to the original neighborhood info
					routeData[i].width = linearScale(initialWidth[i]);
				}
				var reduBusContainer = d3.select("#controlPanel #routes #reducedR .tContent");
				var reduBars = reduBusContainer.selectAll("div")
				  				.data(routeData)
				  				.enter()
				  				.append("div")
				  				.style("width", function(d) { return d.width + "px"; })
				  				.style("background-color", barReduCol)
				  				.attr("class", "barChart")
				  				.attr("title", function(d) { return d.riderShip; })
				  				.text(function(d) { return "Route " + d.busNum; });
				
				// show the widget box
				$("#widgets").slideDown();
			})

			$("#updateBtn").click(function() {
				var stillBus = $("#stillBus").val();
				var reducePer = $("#reducePer").val();
				var n1 = $("#n1").text();
				var n2 = $("#n2 select").val();
				$("#controlPanel #remainR .tContent").empty();
				if (stillBus != "" && reducePer != "") {
					// console.log(stillBus, reducePer, n1, n2);
					var afterChange = getRidershipIncrease(n1, n2, stillBus, reducePer);
					// console.log(afterChange);
					

					var remainR = getPairRoutes(n1, n2).retainBus.concat(getPairRoutes(n1, n2).reduceBus);
					// console.log(remainRData);

					if (remainR.length > 0) {
						var remainRData = [];
						var initialWidth = [];
						for (i = 0; i < remainR.length; i++) {
							initialWidth.push(getRidershipOneRoute(remainR[i]));
							var busItem = {
								"busNum": remainR[i],
								"beforeRds":getRidershipOneRoute(remainR[i]),
								"increase":afterChange[1]
							}
							remainRData.push(busItem);
						}
						// console.log(remainRData);
						var linearScale = d3.scale.linear()
				                           	.domain([d3.min(initialWidth),d3.max(initialWidth)])
				                           	.range([20,215]);
				        for (var i = 0; i < initialWidth.length; i++) {
				        	// the new scaled data should be updated to the original neighborhood info
							remainRData[i].width = linearScale(initialWidth[i]);
						}

						// render increase part
						var linearScale = d3.scale.linear()
				                           	.domain([d3.min(initialWidth),d3.max(initialWidth)])
				                           	.range([20,195]);
				        for (var i = 0; i < initialWidth.length; i++) {
				        	// the new scaled data should be updated to the original neighborhood info
							remainRData[i].increaseScaled = linearScale(afterChange[1]);
						}

						var remainCol = d3.rgb(52, 152, 219);
						var increaseCol = (afterChange[1] > 0 ? d3.rgb(46, 204, 113) : d3.rgb(231, 76, 60));
						var increaseInfo = (afterChange[1] > 0 ? "Increased " : "Decreased ");
						var remainRContainer = d3.select("#controlPanel #remainR .tContent");
						var reduBars = remainRContainer.selectAll("div")
						  				.data(remainRData)
						  				.enter()
						  				.append("div")
						  				.style("width", function(d) { return d.width + "px"; })
						  				.style("background-color", remainCol)
						  				.attr("class", "barChart")
						  				.text(function(d) { return "Route " + d.busNum; })
						  				.attr("title", function(d) { return d.beforeRds; })
						  				.append("div")
						  				.style("width", function(d) { return Math.abs(d.increaseScaled) + "px" })
						  				.style("height", "20px")
						  				.attr("class", "barChartIncre")
						  				.attr("title", function(d) { return increaseInfo + Math.abs(d.increase) })
						  				.style("background-color", increaseCol);

						// console.log(remainRData);
					}
					else {
						$("table#after td.tContent").text("No bus service remained");
					}

					// change table
					$("table#before").slideUp(function() {
						$("table#after").slideDown();
					});
				}
				else {
					alert("Bad input");
				}
			})
		});

	// external functions

