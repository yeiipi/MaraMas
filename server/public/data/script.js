//Setup data bar chart
const data = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 
  datasets: [{label: "Shipments", data: [0, 0, 0, 0, 0, 0, 0], backgroundColor: ["#90e0ef"], borderColor:["#48cae4"], borderWidth:1}],
};

//Setup data pie chart
const data2 = {
  labels: ["Clothes", "Electronics", "Food"], 
  datasets: [{label: "Number of products", data: [1, 1, 1], backgroundColor: ["#0077b6", "#00b4d8", "#4ADEDE"], borderWidth:1}],
};

//Setup data progress chart
const dp = document.getElementById("dp").getAttribute("value");
const datapoints = [dp,(100 - dp)]
const backgroundcolor = [];

if (dp >= 0 && dp <= 20) {backgroundcolor.push("#a0001c", "transparent")}
if (dp > 20 && dp <= 50) {backgroundcolor.push("#fb8500", "transparent")}
if (dp > 50 && dp <= 75) {backgroundcolor.push("#ffb703", "transparent")}
if (dp > 75 && dp <= 100) {backgroundcolor.push("#4ADEDE", "transparent")}
const data3 = {
  datasets: [{label: "Number of products", data: datapoints, backgroundColor: backgroundcolor, borderColor:backgroundcolor, borderWidth:3, cutout: '80%', borderRadius: 5 }],
};

//Setup data line chart
const dataec= document.getElementById("inc").getAttribute("value").split(',')
const data4 = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 
  datasets: [{label: "Income", data: dataec, backgroundColor: ['#00b4d8'], borderColor: ['#00b4d8'], borderWidth:1}],
};

//Setup data dough chart
const data5 = {
  labels: ["On Time", "Delayed"], 
  datasets: [{label: "ETA", data: [0, 0], backgroundColor: ['#0077b6', "#4ADEDE"], borderWidth:1}],
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
   tension: 0.2,
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
     legend: {
       position: 'top',
     },
     zoom: {
       pan: {
         enabled: true,
         mode:'xy',
         threshold: 10 
       },
       zoom: {
         wheel: {
           enabled: true,
           speed: 0.01
         }
       }
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

// Functions for week, month, year view bar chart 


function week1(){
week_ship.data.datasets[0].data = week.value.split(',');
week_ship.data.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
week_ship.update();
}

function month1(){
week_ship.data.datasets[0].data = month.value.split(',');
week_ship.data.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
week_ship.update()
}

function year1(){
week_ship.data.datasets[0].data = [1000,2035,1955,2345,2927];
week_ship.data.labels = ["2017","2018","2019","2020","2021"];
week_ship.update()
}

function select_date(){
console.log(reference_date.value);
}

// Functions for week, month, year view pie chart 

function week2(){
prod_ship.data.datasets[0].data = week21.value.split(',');
prod_ship.update()
}

function month2(){
prod_ship.data.datasets[0].data = month21.value.split(',');
prod_ship.update()
}

function year2(){
prod_ship.data.datasets[0].data = year21.value.split(',');
prod_ship.update()
}

// Functions for week, month, year view dough chart 

function week3(){
dough_ship.data.datasets[0].data = week31.value.split(',');
dough_ship.update()
}

function month3(){
dough_ship.data.datasets[0].data = month31.value.split(',');
dough_ship.update()
}

function year3(){
dough_ship.data.datasets[0].data = year31.value.split(',');
dough_ship.update()
}

// Function for reset zoom

function reset_zoom(){
mon_ship.resetZoom();
}


//------------------------------------------

//Render bar chart
const week_ship = new Chart(document.getElementById("week_ship"), config);
const prod_ship = new Chart(document.getElementById("prod_ship"), config2);
const progress_ship = new Chart(document.getElementById("progress_ship"), config3);
const mon_ship = new Chart(document.getElementById("mon_ship"), config4);
const dough_ship = new Chart(document.getElementById("dough_ship"), config5);