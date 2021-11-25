

  function InitMap() {
      //Recogemos los datos y los separamos por coma
    const data10 = document.getElementById("info").getAttribute("value").split(",")
    var locations=[]

    //Creamos el arreglo de arreglos para cada vehiculo.
    for(p =0; p<data10.length; p=p+3){
        var prev=[]
        prev.push(data10[p])
        prev.push(data10[p+1])
        prev.push(data10[p+2])
        locations.push(prev)
    }



    //Hace el mapita.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(4.60971, -74.08175),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    //Grafica los vehiculos en el mapita.
    for (i = 0; i <= locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(locations[i][0]), parseFloat(locations[i][1])),
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][2].toString());
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
  }
  