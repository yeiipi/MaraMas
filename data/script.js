//Setup data bar chart
const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 
    datasets: [{label: "Shipments", data: [100,69,77,123,35], backgroundColor: ["#0c1c5044"], borderColor:["#0077b6"], borderWidth:1}],
};

//Setup data pie chart
const data1 = {
    labels: ["Electronics", "Clothes", "Food"], 
    datasets: [{label: "Number of products", data: [50,23,22], backgroundColor: ["#79cbf8", "#74f0ac", "#f8a36a"], borderWidth:1}],
};

//------------------------------------------

//Configurations bar chart
const config = {
    type: "bar",
    data: data,
};
//Configurations pie chart
const config2 = {
    type: 'pie',
    data: data1,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      }
    },
  };

//------------------------------------------
//Render bar chart
const week_ship = new Chart(document.getElementById("week_ship"), config);
const prod_ship = new Chart(document.getElementById("prod_ship"), config2);


