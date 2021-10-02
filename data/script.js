//Setup data bar chart
const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 
    datasets: [{label: "Shipments", data: [100,69,77,123,35], backgroundColor: ["#0c1c5044"], borderColor:["#0077b6"], borderWidth:1}],
};

//Setup data pie chart
const data2 = {
    labels: ["Electronics", "Clothes", "Food"], 
    datasets: [{label: "Number of products", data: [50,23,22], backgroundColor: ["#79cbf8", "#74f0ac", "#f8a36a"], borderWidth:1}],
};

//Setup data doughnut chart
const dp = 90
const datapoints = [dp,(100 - dp)]
const data3 = {
    labels: ["Electronics", "Clothes", "Food"], 
    datasets: [{label: "Number of products", data: datapoints, backgroundColor: ["#0c1c5044", "transparent"], borderColor:["#0077b6", "transparent"], borderWidth:1, cutout: '80%', borderRadius: 10 }],
};

//------------------------------------------

//counter plugin
const counter = {
    id: 'counter',
    beforeDraw(chart,args,options){
        const {ctx, chartArea: {top, right, bottom, left, width, height}} = chart;
        ctx.save();
        
        ctx.font = options.fontSize + 'px ' + options.fontFamily;
        ctx.textAlign = 'centre';
        ctx.fillStyle = options.fontColor;
        ctx.fillText(datapoints[0] + "%", width/2.5, (height/2) + options.fontSize * 0.34)

    }
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
    data: data2,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      }
    },
  }; 

//Configurations doughnut chart
const config3 = {
    type: 'doughnut',
    data: data3,
    options: {
        responsive: true,
        plugins: {
          legend: {display: false},
          counter: {
              fontColor: 'black', 
              fontSize: '25',
              fontFamily: 'Neutrif Pro'
          }
        }
      },
    plugins: [counter]
  };

//------------------------------------------

//Render bar chart
const week_ship = new Chart(document.getElementById("week_ship"), config);
const prod_ship = new Chart(document.getElementById("prod_ship"), config2);
const progress_ship = new Chart(document.getElementById("progress_ship"), config3);


