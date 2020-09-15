var StateEnergySourceURL = "api/'State_Energy_Production_Source_2018'";
var StateProdConsURL = "api/State_EnergyData_2018";


// create a function for the state info table
function stateSummary(id) {
    // read the data
    d3.json(StateProdConsURL, StatePCdata => {
        console.log(data);
        var allStates = StatePCdata['State Name'];
        var selState = allStates.filter(selectedState => selectedState == StatePCdata['State Name']);
        // var StateIndex = allStates.indexOf(selState[0])
        var CO2Emissions = StatePCdata['Carbon Dioxide Emission']
        var CO2EmissionsRank = StatePCdata['Carbon Dioxide Emission Rank']
        var consumptionPerCapita = StatePCdata['Consumption per capita'][StateIndex]
        var consumptionRank = StatePCdata['Consumption Rank'][StateIndex]
        var expendituresperCapita = StatePCdata['Expenditure per capita'][StateIndex]
        var expendituresRank = StatePCdata['Expenditure Rank'][StateIndex]
        var productionShare = StatePCdata['Production Share'][StateIndex]
        var productionRank = StatePCdata["Production Rank"][StateIndex]

        // console.log(metadata);
        // filter samples by the state 
        var result1 = CO2Emissions.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(result1);

        var result2 = CO2EmissionsRank.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(result2);

        var result3 = consumptionPerCapita.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(result3);

        var result4 = consumptionRank.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(resul4t);

        var result5 = expendituresperCapita.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(result5);

        var result6 = expendituresRank.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(result6);

        var result7 = productionShare.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(result7);

        var result8 = productionRank.filter(metadatum => metadatum.id.toString() === id)[0];
        console.log(result8);

        // select the demographic table
        var getSummary = d3.select("#state-summary");

        // clear the demographic table
        getSummary.html("");

        // loop through the info in the metadata and append results to table
        Object.entries(result).forEach((key) => {
            console.log(key)
            getSummary.append("h6").text(key[0] + ": " + key[1] + "\n");
        });
    });
}

function buildCharts(State) {

    d3.json(StateEnergySourceURL, stateEData => {
        var allStates = stateEData.State;
        var selState = allStates.filter(selectedState => selectedState == State);
        var StateIndex = allStates.indexOf(selState[0])

        var coal = stateEData.biopower_gaseous[StateIndex]; //["Fossil Fuel - Coal"]
        var naturalGas = stateEData.biopower_solid[StateIndex]; //["Fossil Fuel - Natural Gas"]
        var crudeOil = stateEData.csp_solar[StateIndex]; //['Fossil Fuel - Crude Oil']
        var nuclear = stateEData.egs_geothermal[StateIndex]; //['Nuclear Power']
        var bioFuels = stateEData.geotermal_hydrothermal[StateIndex]; //['BioFuels']
        var woodWaste = stateEData.hydropower[StateIndex]; //['Wood and Waste']
        var other = stateEData.offshore_wind[StateIndex]; //['Other']


        var pieDataArr = [

            coal, // 1
            naturalGas, // 2
            crudeOil, // 3
            nuclear, // 4
            bioFuels, //5
            woodWaste, //6
            other //7


        ]

        var ctx = document.getElementById('pieChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: pieDataArr,
                    backgroundColor: [
                        'rgb(191, 63, 63)',
                        'rgb(86, 239, 35)',
                        'rgb(239, 188, 35)',
                        'rgb(35, 86, 239)',
                        'rgb(239, 86, 35)',
                        'rgb(188, 35, 239)',
                        '#74c476',


                    ]
                }],
                labels: [
                    "Fossil Fuel - Coal",
                    "Fossil Fuel - Natural Gas",
                    "Fossil Fuel - Crude Oil",
                    "Nuclear Power",
                    "BioFuels",
                    "Wood and Waste",
                    "Other",

                ]
            },
            options: {
                title: {
                    display: true,
                    text: "State Energy production by Source [mill BTU]",
                    fontSize: 18
                },
                legend: {
                    position: 'right',
                    alignment: 'center',
                    labels: {
                        boxWidth: 10
                    }
                }
            }
        });
        return myPieChart
    });
};


// Populate the State DropDown & create initial plots 
function init() {
    // Grab a reference to the DropDown
    var selector = d3.select("#selDataset");
    // Grab the State Names and populate the dropdown
    d3.json(energyComparisonURL, StatePCdata => {
        var States = StatePCdata.State.sort(d3.ascending)

        States.forEach(State => {
            selector
                .append("option")
                .text(State)
                .property("value", State);
        });
        // Create default chart
        var defaultState = States[0];
        buildCharts(defaultState);

    });
};

function StateChange(newState) {
    // Remove previous chart by removing canvas element
    d3.select("#pieChart").remove();
    // Add canvas elements back
    d3.select("#plot1")
        .append('canvas')
        .attr('id', 'pieChart')
        .attr('width', '400')
        .attr('height', '400');

    d3.select("state-table")
        .append('canvas')
        .attr('id', 'summary-table')
        .attr('width', '400')
        .attr('height', '400');

    // Fetch new data each time a new State is selected 
    buildCharts(newState);
}

init();