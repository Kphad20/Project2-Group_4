console.log("In state data")
var url_ranking="http://localhost:5000/state/ranking?name=nj"
d3.json(url_ranking, function(data) {
    console.log("Hello")
    console.log(data);
})
// d3.json("localhost:5000/state/ranking?name=nj").then(data=>{
//     console.log(data)
// })

const url_productionsource="http://localhost:5000/state/production?name=nj"
d3.json(url_productionsource,function(data) {
    console.log(data);
  });