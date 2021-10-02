//Setup data bar chart
const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 
    datasets: [{label: "Shipments", data: [100,69,77,123,35], backgroundColor: ["#4ADEDE", "#797ef6"], borderColor:["#4ADEDE", "#797ef6"], borderWidth:1}],
};

//Setup data pie chart
const data2 = {
    labels: ["Electronics", "Clothes", "Food"], 
    datasets: [{label: "Number of products", data: [50,23,22], backgroundColor: ["#797ef6", "#74f0ac", "#4ADEDE"], borderWidth:1}],
};

//Setup data progress chart
const dp = 90
const datapoints = [dp,(100 - dp)]
const data3 = {
    labels: ["Electronics", "Clothes", "Food"], 
    datasets: [{label: "Number of products", data: datapoints, backgroundColor: ["#74f0ac", "transparent"], borderColor:["#74f0ac", "transparent"], borderWidth:1, cutout: '80%', borderRadius: 10 }],
};

//Setup data line chart
const data4 = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 
    datasets: [{label: "Income", data: [50,23,22,234,12,76,203,53,77,10,123,199], backgroundColor: ['#a6f8b1'], borderColor: ['#61ec73'], borderWidth:1},
    {label: "Income", data: [5,26,12,254,22,16,290,57,27,11,213,19], backgroundColor: ['#ff8f8f'],borderColor: ['#f75959'], borderWidth:1}],
};

//Setup data dough chart
const data5 = {
    labels: ["On Time", "Delayed"], 
    datasets: [{label: "ETA", data: [1372,197], backgroundColor: ['#797ef6', "#4ADEDE"], borderWidth:1}],
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

//Configurations line chart
const config4 = {
type: 'line',
   data: data4,
   options: {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
       legend: {
         position: 'top',
       }
     }
   },
 };

//Configurations dough chart
const config5 = {
    type: 'doughnut',
       data: data5,
       options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
           legend: {
             position: 'top',
           }
         }
       },
     };

//------------------------------------------

//Render bar chart
const week_ship = new Chart(document.getElementById("week_ship"), config);
const prod_ship = new Chart(document.getElementById("prod_ship"), config2);
const progress_ship = new Chart(document.getElementById("progress_ship"), config3);
const mon_ship = new Chart(document.getElementById("mon_ship"), config4);
const dough_ship = new Chart(document.getElementById("dough_ship"), config5);


