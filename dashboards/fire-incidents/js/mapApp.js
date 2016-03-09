// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.

function initMap(fire_incidents) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 37.33, lng: -121.90},
        z:13.75
    });

    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };

    setStationMarkers(map, fireStations.raw_data, shape);
    setMarkers(map, fire_incidents.raw_data, shape, 500);
}

function setStationMarkers(map, stations, shape) {

    var blueStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'blue',
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: 'black',
        strokeWeight: 1
    };
    for (var i = 0; i < stations.length; i++) {
        var item = stations[i];

        var title = item.name + "\nBattalion: " + item.battalion + "\n" + item.address + " " + item.zipCode

        var marker = new google.maps.Marker({
            position: {lat: item.latitude, lng: item.longitude},
            map: map,
            animation: google.maps.Animation.DROP,
            shape: shape,
            icon : blueStar,
            title: title
        });
    }
}

function setMarkers(map, inputData, shape, count) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
        url: '/dashboards/shared/open-iconic-master/svg/fire.svg',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };

    var fireIcon = {
        path: 'M2 0c1 2-2 3-2 5s2 3 2 3c-.98-1.98 2-3 2-5s-2-3-2-3zm3 3c1 2-2 3-2 5h3c.4 0 1-.5 1-2 0-2-2-3-2-3z',
        fillColor: 'red',
        fillOpacity: 0.8,
        scale: 2.5,
        strokeColor: 'black',
        strokeWeight: 1
    };

    var medicalIcon = {
        path: 'M2 0v2h-2v4h2v2h4v-2h2v-4h-2v-2h-4z',
        fillColor: 'white',
        fillOpacity: 0.8,
        scale: 2.5,
        strokeColor: 'black',
        strokeWeight: 1
    };

    var infoWindow = new google.maps.InfoWindow;

    var itemInfo = [];
    for (var i = 0; i < count; i++) {
        var item = inputData[i];

        var useMedical = item[fireDataKeys.finalIncidentType] === incidentTypes.medical

        var icon = fireIcon
        if (useMedical) {
            icon = medicalIcon
        }

        var title = item[fireDataKeys.incidentNumber]
        title  = title +  " - " + item[fireDataKeys.dateOfEvent]
        title  = title + "\nUnit: " + item[fireDataKeys.onSceneUnit]
        title  = title + "\nFinal Category: " + item[fireDataKeys.finalIncidentCategory]

        var marker = new google.maps.Marker({
            position: {lat: item[fireDataKeys.latitude], lng: item[fireDataKeys.longitude]},
            map: map,
            icon: icon,
            animation: google.maps.Animation.DROP,
            shape: shape,
            title: title
        });

        var contentInfo = item[fireDataKeys.incidentNumber]
        contentInfo  = contentInfo +  " - " + item[fireDataKeys.dateOfEvent]
        contentInfo  = contentInfo + "<br>Unit: " + item[fireDataKeys.onSceneUnit]
        contentInfo  = contentInfo + "<br>Final Category: " + item[fireDataKeys.finalIncidentCategory]


        itemInfo[i] = new google.maps.InfoWindow({
            content: contentInfo
        });

        google.maps.event.addListener(marker, 'click', (function(marker, info) {
            return function() {
                infoWindow.setContent(info.content);
                infoWindow.open(map, marker);
            }
        })(marker, itemInfo[i]));
    }

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('legend'));

    var styles = []
    styles.push( {
        name: "Fire & Other",
        icon: './imgs/fire.png'
    })

    styles.push( {
        name: "Medical",
        icon: './imgs/medical-cross.png'
    })

    var legend = document.getElementById('legend');
    for (var style in styles) {
        var name = styles[style].name;
        var icon = styles[style].icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);
    }
}

function main() {
    // Data for the markers consisting of a name, a LatLng and a zIndex for the
    // order in which these markers should display on top of each other.

    initMap(fire_incidents)
}

google.maps.event.addDomListener(window, 'load', main);





