(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){

//Setup data bar chart
const fs= require('fs')

const data = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 
  datasets: [{label: "Shipments", data: [5], backgroundColor: ["#90e0ef"], borderColor:["#48cae4"], borderWidth:1}],
};

//Setup data pie chart
const data2 = {
  labels: ["Electronics", "Clothes", "Food"], 
  datasets: [{label: "Number of products", data: [50,23,22], backgroundColor: ["#0077b6", "#00b4d8", "#4ADEDE"], borderWidth:1}],
};

//Setup data progress chart
const dp = 33
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
const data4 = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 
  datasets: [{label: "Income", data: [50,23,22,234,12,76,203,53,77,10,123,199], backgroundColor: ['#00b4d8'], borderColor: ['#00b4d8'], borderWidth:1}],
};

//Setup data dough chart
const data5 = {
  labels: ["On Time", "Delayed"], 
  datasets: [{label: "ETA", data: [200,197], backgroundColor: ['#0077b6', "#4ADEDE"], borderWidth:1}],
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
week_ship.data.datasets[0].data = msg.number;
week_ship.data.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
week_ship.update()
}

function month1(){
week_ship.data.datasets[0].data = [258,323,109,129,359,400,90,299,167,321,200,401];
week_ship.data.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

week_ship.update()
}

function year1(){
week_ship.data.datasets[0].data = [1000,2035,1955,2345,2927];
week_ship.data.labels = ["2017","2018","2019","2020","2021"];
week_ship.update()
}

// Functions for week, month, year view pie chart 

function week2(){
prod_ship.data.datasets[0].data = [50,23,22];
prod_ship.update()
}

function month2(){
prod_ship.data.datasets[0].data = [9,22,69];
prod_ship.update()
}

function year2(){
prod_ship.data.datasets[0].data = [20,67,13];
prod_ship.update()
}

// Functions for week, month, year view dough chart 

function week3(){
dough_ship.data.datasets[0].data = [200,197];
dough_ship.update()
}

function month3(){
dough_ship.data.datasets[0].data = [900,300];
dough_ship.update()
}

function year3(){
dough_ship.data.datasets[0].data = [1500,789];
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


},{"fs":1}]},{},[2]);
