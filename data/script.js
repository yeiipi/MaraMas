//Setup data bar chart
const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 
    datasets: [{label: "Shipments", data: [100,69,77,123,35], backgroundColor: ["#90e0ef"], borderColor:["#48cae4"], borderWidth:1}],
};

//Setup data pie chart
const data2 = {
    labels: ["Electronics", "Clothes", "Food"], 
    datasets: [{label: "Number of products", data: [50,23,22], backgroundColor: ["#0077b6", "#00b4d8", "#4ADEDE"], borderWidth:1}],
};

//Setup data progress chart
const dp = 33
const datapoints = [dp,(100 - dp)]
const data3 = {
    datasets: [{label: "Number of products", data: datapoints, backgroundColor: ["#0077b6", "transparent"], borderColor:["#0077b6", "transparent"], borderWidth:3, cutout: '80%', borderRadius: 5 }],
};

//Setup data line chart
const data4 = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 
    datasets: [{label: "Income", data: [50,23,22,234,12,76,203,53,77,10,123,199], backgroundColor: ['#00b4d8'], borderColor: ['#00b4d8'], borderWidth:1}],
};

//Setup data dough chart
const data5 = {
    labels: ["On Time", "Delayed"], 
    datasets: [{label: "ETA", data: [1372,197], backgroundColor: ['#0077b6', "#4ADEDE"], borderWidth:1}],
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
          labels: {
            usePointStyle: true,
            boxWidth: 6
          }
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
             position: 'bottom',
             labels: {
                usePointStyle: true,
                boxWidth: 6
              }
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




