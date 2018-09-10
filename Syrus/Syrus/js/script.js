var latlng = [];
var map = L.map('map', {
  'center': [11.01963, -74.85163],
  'zoom': 12,
  'layers': [
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      'attribution': 'Map data &copy; OpenStreetMap contributors'
    })
  ]
});
var realtime = L.realtime({
        url: 'js/geo.json',
        crossOrigin: true,
        type: 'json'
    }, {
        interval: 3 * 1000
    }).addTo(map);


realtime.on('update', function() {
		var fecha = document.getElementById("FechaV");
	  	var latitud = document.getElementById("LatitudV");
		var longitud = document.getElementById("LongitudV");
		
		$.post("js/consulta.php"),
		$.post("php/consulta.php",
		    {
		        id: 1
		    },
		function(data1, status){
		    	console.log(data1);
		    	if (data1!="") {
		    		fecha.value = data1;
		    	}
		        
		});
    	$.post("php/consulta.php",
	    {
	        id: 2
	    },
	    function(data2, status){
	    	console.log(data2);
	    	if (data2!="") {
	    		latitud.value = data2;
	    	}
	    });
	    $.post("php/consulta.php",
	    {
	        id: 3
	    },
	    function(data3, status){
	    	console.log(data3);
	    	if (data3!="") {
	    		longitud.value = data3;
	    	}
	    });
	map.panTo(new L.LatLng(latitud.value,longitud.value));
	var comparacion = [];
	comparacion.push ([latitud.value,longitud.value]);
	for (i=1; i < comparacion.length ; i++) {
	    console.log(comparacion[i].includes(latlng[i]));
	}
	if (comparacion != latlng) {
			latlng.push([latitud.value,longitud.value]);
	}
	console.log(comparacion);
	console.log(latlng);
	/*var polyline = L.polyline(latlng, {color: 'red'}).addTo(map);*/
});


