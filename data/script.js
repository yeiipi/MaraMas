var canvasElement = document.getElementById("week_ship");
var config = {
    type: "bar",
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 
        datasets: [{label: "Shipments", data: [100,69,77,123,35], backgroundColor: ["#0c1c5044"], borderColor:["#0077b6"], borderWidth:1}],
    },
}
var week_ship = new Chart(canvasElement, config)

