//Setup data horizontal bar chart
const data7 = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 
  datasets: [{label: "Shipments", data: [100,69,77,123,35], backgroundColor: ["#90e0ef"], borderColor:["#48cae4"], borderWidth:1}],
};

//Setup data gauge meter
const eff = 90
const effdata = [(eff*2),(200 - (eff*2))]
const data6 = {
  labels: ["Efficiency", "Inefficiency"],
  datasets: [{label: "Gauge", data : effdata, backgroundColor: ["#4ADEDE", '#0077b6'], borderRadius: 5, borderWidth:3, cutout: '70%'}]
};

//------------------------------------------

//counter plugin 2 (for gauge meter)
const counter2 = {
    id: 'counter2',
    beforeDraw(chart,args,options){
        const {ctx, chartArea: {top, right, bottom, left, width, height}} = chart;
        ctx.save();
        
        ctx.font = options.fontSize + 'px ' + options.fontFamily;
        ctx.textAlign = 'centre';
        ctx.fillStyle = options.fontColor;
        ctx.fillText(eff + "%", width/2.7, (height/1.5) + options.fontSize * 0.34)
    }
  };  

//------------------------------------------
//Configurations gauge meter
const config6 = {
    type:"doughnut",
    data: data6,
    options: {
        responsive: true,
        circumference: 180,
        rotation : -90,
        plugins: {
          legend: {display: false},
          counter2: {
            fontColor: 'black', 
            fontSize: '25',
            fontFamily: 'Neutrif Pro'
        }
        }
    },
    plugins: [counter2]
}; 
//Configurations horizontal bar chart
const config7 = {
  type: "bar",
  data: data7,
};

//------------------------------------------

//Render bar chart
const effi_graph = new Chart(document.getElementById("effi_graph"), config7);
const meter_info = new Chart(document.getElementById("meter_info"), config6);



