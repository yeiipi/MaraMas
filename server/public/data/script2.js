//Setup data gauge meter

const effdata = document.getElementById("vh_stat").getAttribute("value").split(',')
const eff = parseFloat((parseInt(effdata[0])/(parseInt(effdata[0])+parseInt(effdata[1]))*100).toFixed(1))
const data6 = {
  labels: ["Active", "Inactive"],
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

//------------------------------------------

//Render bar chart
const meter_info = new Chart(document.getElementById("meter_info"), config6);





