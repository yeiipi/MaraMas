//Setup data horizontal bar chart
const data7 = {
  labels: ["Trucks Loaded", "Inventory Review", "Package Quality Check"], 
  datasets: [{label: "Progress", data: [90,69,77], backgroundColor: ["#00b4d8"], borderColor:["#00b4d8"], borderWidth:1}],
};

//Setup data progress chart
const dp = 88
const datapoints = [dp,(100 - dp)]
const data3 = {
    datasets: [{label: "Number of products", data: datapoints, backgroundColor: ["#4ADEDE", "transparent"], borderColor:["#4ADEDE", "transparent"], borderWidth:3, cutout: '80%', borderRadius: 5 }],
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
        ctx.fillText(datapoints[0] + "%", width/2.7, (height/2) + options.fontSize * 0.34)

    }
};

//------------------------------------------

//Configurations progress chart
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

//Configurations horizontal bar chart
const config7 = {
  type: "bar",
  data: data7,
  options: {
    indexAxis: 'y',
    plugins: {
    legend: {display:false},
    },
    scales: {
      x: {grid: {display:false}},
      y: {grid: {display:false}},
    }
  }
};

//------------------------------------------

//Render bar chart
const effi_graph = new Chart(document.getElementById("effi_graph"), config7);
const progress_ship = new Chart(document.getElementById("progress_ship"), config3);



