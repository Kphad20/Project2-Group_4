//console.log("In state data")
//console.log(window.location.search) 
const params = new URLSearchParams(window.location.search)
const satename = params.get('name');
console.log(satename);

function createData1() {
    var url_ranking = `http://localhost:5000/state/ranking?name=${satename}`
    d3.json(url_ranking)
        .then(data => {
            // console.log("Hello")
            console.log(data);
        });
    // d3.json("localhost:5000/state/ranking?name=nj").then(data=>{
    //     console.log(data)
    // })
}

function createData() {
    const url_productionsource = `http://localhost:5000/state/production?name=${satename}`
    d3.json(url_productionsource)
        .then(data => {
            console.log(data);
        });
}


var StateEnergySourceURL = `http://localhost:5000/state/production?name=${satename}`;
var StateProdConsURL = `http://localhost:5000/state/ranking?name=${satename}`;


// create a function for the state info table
function stateSummary() {
    console.log("hello1");
    // read the data
    d3.json(StateProdConsURL).then(function(StatePCdata2) {

        console.log(StatePCdata2)
        var StatePCdata = StatePCdata2[0];

        var CO2Emissions = StatePCdata['Carbon Dioxide Emission']
        var CO2EmissionsRank = StatePCdata['Carbon Dioxide Emission Rank']
        var consumptionPerCapita = StatePCdata['Consumption per capita']
        var consumptionRank = StatePCdata['Consumption Rank']
        var expendituresperCapita = StatePCdata['Expenditure per capita']
        var expendituresRank = StatePCdata['Expenditure Rank']
        var productionShare = StatePCdata['Production Share']
        var productionRank = StatePCdata["Production Rank"]

        var tableDataArr = [

            CO2Emissions, // 1
            CO2EmissionsRank, // 2
            consumptionPerCapita, // 3
            consumptionRank, // 4
            expendituresperCapita, //5
            expendituresRank, //6
            productionShare, //7
            productionRank
        ]

        // select the demographic table
        var getSummary = d3.select("#state-table");

        // clear the demographic table
        getSummary.html("");

        // loop through the info in the metadata and append results to table
        Object.entries(StatePCdata).slice(0, -2).forEach((key) => {
            console.log(key)
            getSummary.append("h6").text(key[0] + ": " + key[1] + "\n");
        });
    });
}

function buildCharts() {
    console.log("hello2");
    d3.json(StateEnergySourceURL).then(function(stateEData2) {
        console.log(stateEData2[0]);

        var stateEData = stateEData2[0];
        // var pielabels = Object.entries(stateEData).map(key =>
        //     key)

        ;
        var coal = stateEData["Fossil Fuel - Coal"]; //["Fossil Fuel - Coal"]
        console.log(stateEData);
        var naturalGas = stateEData["Fossil Fuel - Natural Gas"]; //["Fossil Fuel - Natural Gas"]
        var crudeOil = stateEData['Fossil Fuel - Crude Oil']; //['Fossil Fuel - Crude Oil']
        var nuclear = stateEData['Nuclear Power']; //['Nuclear Power']
        var bioFuels = stateEData['BioFuels']; //['BioFuels']
        var woodWaste = stateEData['Wood and Waste']; //['Wood and Waste']
        var other = stateEData['Other']; //['Other']


        var pieDataArr = [

                coal, // 1
                naturalGas, // 2
                crudeOil, // 3
                nuclear, // 4
                bioFuels, //5
                woodWaste, //6
                other //7

            ]
            //var values = Object.entries(stateEData).map((key, value) => value)

        var ctx = document.getElementById('pieChart')
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
                labels: ["Fossil Fuel - Coal",
                    "Fossil Fuel - Natural Gas",
                    "Fossil Fuel - Crude Oil",
                    "Nuclear Power",
                    "BioFuels",
                    "Wood and Waste",
                    "Other"
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



function init() {
    console.log("hello3");
    buildCharts();
    stateSummary();
    createData();
    createData1();
};


init();