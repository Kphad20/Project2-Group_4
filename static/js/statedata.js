//console.log("In state data")
//console.log(window.location.search) 
const params = new URLSearchParams(window.location.search) 
const satename = params.get('name');
console.log(satename);

var url_ranking=`http://localhost:5000/state/ranking?name=${satename}`
d3.json(url_ranking)
  .then (data=> {
   // console.log("Hello")
    console.log(data);
  });
// d3.json("localhost:5000/state/ranking?name=nj").then(data=>{
//     console.log(data)
// })

const url_productionsource=`http://localhost:5000/state/production?name=${satename}`
d3.json(url_productionsource)
  .then(data=> {
    console.log(data);
  });

