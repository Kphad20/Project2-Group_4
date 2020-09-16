var StateEnergySourceURL = "data/state.json";
//var StateEnergySourceURL = "api/State_EnergyData_2018";


// create a function for the state info table
function stateSummary() {
    console.log("hello1");
    // read the data
    d3.json(StateEnergySourceURL).then(function(StatePCdata) {
        // d3.json(StateEnergySourceURL, StatePCdata => {
        console.log(StatePCdata)
            // var allStates = StatePCdata['State Name'];
            // var selState = allStates.filter(selectedState => selectedState == StatePCdata['State Name']);
            // // var StateIndex = allStates.indexOf(selState[0])
            // var CO2Emissions = StatePCdata['Carbon Dioxide Emission']
            // var CO2EmissionsRank = StatePCdata['Carbon Dioxide Emission Rank']
            // var consumptionPerCapita = StatePCdata['Consumption per capita']
            // var consumptionRank = StatePCdata['Consumption Rank']
            // var expendituresperCapita = StatePCdata['Expenditure per capita']
            // var expendituresRank = StatePCdata['Expenditure Rank']
            // var productionShare = StatePCdata['Production Share']
            // var productionRank = StatePCdata["Production Rank"]



        // select the demographic table
        var getSummary = d3.select("#state-table");

        // clear the demographic table
        getSummary.html("");

        // loop through the info in the metadata and append results to table
        Object.entries(StatePCdata).forEach((key) => {
            console.log(key)
            getSummary.append("h6").text(key[0] + ": " + key[1] + "\n");
        });
    });
}

function buildCharts() {
    console.log("hello2");
    d3.json(StateEnergySourceURL).then(function(stateEData) {


        var pielabels = Object.entries(stateEData).map(key =>
            key)

        ;
        var values = Object.entries(stateEData).map((key, value) => value)

        var ctx = document.getElementById('pieChart')
        var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: values,
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
                labels: pielabels,
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



function init() {
    console.log("hello3");
    buildCharts();
    stateSummary();


};


init();