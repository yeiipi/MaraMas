var locations = [
    ['Raj Ghat', 28.648608, 77.250925, 1],
    ['Purana Qila', 28.618174, 77.242686, 2],
    ['Red Fort', 28.663973, 77.241656, 3],
    ['India Gate', 28.620585, 77.228609, 4],
    ['Jantar Mantar', 28.636219, 77.213846, 5],
    ['Akshardham', 28.622658, 77.277704, 6]
  ];
  function InitMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(28.614884, 77.208917),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
  }