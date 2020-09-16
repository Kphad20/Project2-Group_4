const url="https://raw.githubusercontent.com/junewang617/Plot.ly-Homework/master/annual_renewable.json"
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//






// Fetch the JSON data and console log it
d3.json(url).then(function(energy_data) {
  console.log(energy_data);
});

// var annual_energy = d3.json(url)

// console.log(annual_energy)

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

d3.json("https://raw.githubusercontent.com/junewang617/Plot.ly-Homework/master/annual_renewable.json").then(function(energy_Data) {
// Create a function to parse date and time
var parseTime = d3.timeParse("%Y");

// Initial Params
//var chosenXAxis = "hair_length";



// Format the consumption data
energy_Data.forEach(function(data) {
  data["Year"] = parseTime(data["Year"]);//yaxis for both data sets
  data["Total Renewable Energy Consumption"] = +data["Total Renewable Energy Consumption"];
  data["Total Biomass Energy Consumption"] = +data["Total Biomass Energy Consumption"];
  data["Biofuels Consumption"] = +data["Biofuels Consumption"];
  data["Waste Energy Consumption"] = +data["Waste Energy Consumption"];
  data["Wood Energy Consumption"] = +data["Wood Energy Consumption"];
  data["Wind Energy Consumption"] = +data["Wind Energy Consumption"];
  data["Geothermal Energy Consumption"] = +data["Geothermal Energy Consumption"];
  data["Hydroelectric Power Consumption"] = +data["Hydroelectric Power Consumption"];
  //format the production data 
  data["Wood Energy Production"] = +data["Wood Energy Production"];
  data["Biofuels Production"] = +data["Biofuels Production"];
  data["Total Biomass Energy Production"] = +data["Total Biomass Energy Production"];
  data["Total Renewable Energy Production"] = +data["Total Renewable Energy Production"];
});


// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#chartContainer1")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



// Step 5: Create the scales for the chart
  // =================================
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(energy_Data, d => d["Year"]))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear().range([height, 0]);

// Step 6: Set up the y-axis domain
//================
//// find the max of the  data --- consumption group
var total_renewable_energy_consumption_Max = d3.max(energy_Data, d => d["Total Renewable Energy Consumption"]);

var Total_Biomass_Energy_Consumption_Max = d3.max(energy_Data, d => d["Total Biomass Energy Consumption"]);

var Biofuels_Consumption_Max = d3.max(energy_Data, d => d["Biofuels_Consumption"]);

var Waste_Energy_Consumption_Max = d3.max(energy_Data, d => d["Waste Energy Consumption"]);

var Wood_Energy_Consumption_Max = d3.max(energy_Data, d => d["Wood Energy Consumption"]);

var Wind_Energy_Consumption_Max = d3.max(energy_Data, d => d["Wind Energy Consumption"]);

var Solar_Energy_Consumption_Max = d3.max(energy_Data, d => d["Solar Energy Consumption"]);

var Geothermal_Energy_Consumption_Max = d3.max(energy_Data, d => d["Geothermal Energy Consumption"]);

var Hydroelectric_Power_Consumption_Max = d3.max(energy_Data, d => d["Hydroelectric Power Consumption"]);



// var yMax;
// if (total_renewable_energy_consumption_Max > Total_Biomass_Energy_Consumption_Max) {
//   yMax = total_renewable_energy_consumption_Max;
// }
// else {
//   yMax = Total_Biomass_Energy_Consumption_Max;
// }

var yMax=Math.max(total_renewable_energy_consumption_Max,Total_Biomass_Energy_Consumption_Max)
  
  // Biofuels_Consumption_Max,Waste_Energy_Consumption_Max,Wood_Energy_Consumption_Max,Wind_Energy_Consumption_Max,Solar_Energy_Consumption_Max,Geothermal_Energy_Consumption_Max,Hydroelectric_Power_Consumption_Max)


console.log(yMax)

// Use the yMax value to set the yLinearScale domain
yLinearScale.domain([0, yMax]);






// Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
// Add y-axis
chartGroup.append("g").call(leftAxis);


// Set line
line = d3.line()
  .curve(d3.curveBasis)
  .x(function(d) {
    return x(d["Year"]);
  })
  .y(function(d) {
    return y(d["Total Renewable Energy Consumption"]);
  })









// Step 9: Set up two line generators and append two SVG paths

// Line generator for data
var line1 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Total Renewable Energy Consumption"]));


var line2 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Total Biomass Energy Consumption"]));


var line3 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Biofuels Consumption"]));

var line4 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Waste Energy Consumption"]));

var line5 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Wood Energy Consumption"]));

var line6 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Wind Energy Consumption"]));

var line7 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Solar Energy Consumption"]));

var line8 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Geothermal Energy Consumption"]));

var line9 = d3.line()
.x(d => xTimeScale(d["Year"]))
.y(d => yLinearScale(d["Hydroelectric Power Consumption"]));

// Append  path for line

chartGroup
.append("path")
.data([energy_Data])
.attr("d", line1)
.classed("line green", true);


chartGroup
.data([energy_Data])
.append("path")
.attr("d", line2)
.classed("line orange", true);


chartGroup
.append("path")
.data([energy_Data])
.attr("d", line3)
.classed("line orange", true);


chartGroup
.append("path")
.data([energy_Data])
.attr("d", line4)
.classed("line orange", true);


chartGroup
.append("path")
.data([energy_Data])
.attr("d", line5)
.classed("line orange", true);

chartGroup
.append("path")
.data([energy_Data])
.attr("d", line6)
.classed("line orange", true);


chartGroup
.append("path")
.data([energy_Data])
.attr("d", line7)
.classed("line orange", true);


chartGroup
.append("path")
.data([energy_Data])
.attr("d", line8)
.classed("line orange", true);

chartGroup
.append("path")
.data([energy_Data])
.attr("d", line9)
.classed("line orange", true);



let t2plot = null
    timeseries2plot = null
    




var colorScale=d3.scaleOrdinal(d3.schemeCategory10);

timeseries2plot = colorScale.domain().map(function(name) {
  return {
    name: name,
    values: data.map(function(d) {
      return {
        date: d.date,
        price: +d[name]
      };
    })
  };
})




t2plot = svg.selectAll(".t2plot")
.data(timeseries2plot)
.enter().append("g")
.attr("class", "t2plot");

t2plot.append("path")
.attr("class", "line")
.attr("d", function(d) {
  return line(d.values);
})
.style("stroke", function(d) {
  return color(d.name);
});

t2plot.append("text")
.datum(function(d) {
  return {
    name: d.name,
    value: d.values[d.values.length - 1]
  };
})
.attr("transform", function(d) {
  return "translate(" + x(d.value.date) + "," + y(d.value.price) + ")";
})
.attr("x", 3)
.attr("dy", ".50em")
.text(function(d) {
  return d.name;
});












}).catch(function(error) {
  console.log(error);
});


