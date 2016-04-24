
// Add fire stations to the map
function addStations (stationList, markersLayer, clusterLayer) {

    for (var index in stationList) {

        var station = stationList[index];

        var popupText = station.name + "<br>"
        popupText += station.address + " " + station.zipCode + "<br>"
        popupText += "Battalion: " + station.battalion

        // Create a custom marker with the station name
        var mark = L.marker([station.latitude, station.longitude], {
            icon: new L.DivIcon({
                className: 'css-icon',
                html: station.name,
                iconSize: [60, 20]
            })
        }).bindPopup(popupText);

        mark.on('mouseover', mark.openPopup.bind(mark));
        mark.on('mouseout', mark.closePopup.bind(mark));
        mark.on('click', mark.openPopup.bind(mark));
        mark.on('touchstart', mark.openPopup.bind(mark));
        markersLayer.addLayer(mark);
        clusterLayer.addLayer(mark);
    }
}

// Create marker and mouseover
function createMarkers (d) {

    // add a Leaflet marker for the lat lng and insert the application's stated purpose in popup
    var popupText = d.Incident_No + " - Unit: " + d.On_Scene_Unit + " (" + d.Unit_Count + ")<br>"
    popupText += d.Priority + "<br>";
    popupText += d.Final_Incident_Category + "<br><br>"
    popupText += "Start:     " + d.Date_Time_Of_Event + "<br>"
    popupText += "End: " + d.Cleared_TimeStamp + "<br>"
    popupText += "Incident length (minutes): " + d.actual_duration
    var mark = L.marker([d.Latitude, d.Longitude]).bindPopup(popupText);
    mark.on('mouseover', mark.openPopup.bind(mark));
    mark.on('mouseout', mark.closePopup.bind(mark));
    mark.on('click', mark.openPopup.bind(mark));
    mark.on('touchstart', mark.openPopup.bind(mark));

    return mark;
}

// Updates the displayed map markers to reflect the crossfilter dimension passed in
function updateMap(locs, markersLayer, clusterLayer) {
    // clear the existing markers from the map
    markersLayer.clearLayers();
    clusterLayer.clearLayers();

    locs.forEach(function (d, i) {

        if (d.Latitude != null && d.Longitude != undefined) {
            var mark = createMarkers(d);
            markersLayer.addLayer(mark);
            clusterLayer.addLayer(mark);
        }
    });

    addStations(fireStations.raw_data, markersLayer, clusterLayer);
}

function getTimeOfDay(hours) {

    var timeOfDay = -1;

    if (hours >= 0 && hours < 6) {
        timeOfDay = 0; // early morning
    } else if (hours >= 6 && hours < 12) {
        timeOfDay = 1 // morning
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = 2 // afternoon
    } else if (hours >= 18 && hours < 24) {
        timeOfDay = 3 // evening
    }
    
    return timeOfDay;
}

function getBinnedTime(startTime, endTime) {
    var incident_time = Math.abs(new Date(endTime) - startTime);

    incident_time = (incident_time / 60000);

    var binned_time = incident_time;
    if (binned_time <= 10) {
        binned_time = 10;
    } else if (binned_time > 10 && binned_time <= 15) {
        binned_time = 15
    } else if (binned_time > 15 && binned_time <= 20) {
        binned_time = 20
    } else if (binned_time > 20 && binned_time <= 25) {
        binned_time = 25
    } else if (binned_time > 25 && binned_time <= 30) {
        binned_time = 30
    } else if (binned_time > 30 && binned_time <= 60) {
        binned_time = 60
    } else if (binned_time > 60 && binned_time <= 120) {
        binned_time = 120
    } else if (binned_time > 120 && binned_time <= 600) {
        binned_time = 600
    }

    return ({
        binned_time: binned_time,
        incident_time: incident_time
    });
}

function initializeMap(markersLayer, clusterLayer) {
    // Set up the base map tile layers (this is the terrain, imagery, etc)
    var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | Fire incidents from <a href="http://data.sanjoseca.gov/dataviews/226237/san-jose-fire-incidents-jan-2015/" target="_blank">data.sanjose.gov</a>',
        maxZoom: 18
    });

    var cartodb_light = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions" target="_blank">CartoDB</a> | Fire incidents from <a href="http://data.sanjoseca.gov/dataviews/226237/san-jose-fire-incidents-jan-2015/" target="_blank">data.sanjose.gov</a>',
        maxZoom: 18
    });

    var cartodb_dark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions" target="_blank">CartoDB</a> | Fire incidents from <a href="http://data.sanjoseca.gov/dataviews/226237/san-jose-fire-incidents-jan-2015/" target="_blank">data.sanjose.gov</a>',
        maxZoom: 18
    });

    // Our basemaps (tile layers)
    var baseMaps = {
        "Positron (CartoDB)": cartodb_light,
        "Dark Matter (CartoDB)": cartodb_dark,
        "OSM Default": osm
    };

    // Our overlays
    var overlays = {
        "Clustered Markers": clusterLayer,
        "Individual Markers": markersLayer
    };

    // Initialize the Leaflet map and set an initial location and zoom level for San Jose
    var map = L.map('map', {
        center: [37.3382, -121.8863],
        zoom: 12,
        layers: [cartodb_light, clusterLayer]
    });

    // Add the layers to a control group
    L.control.layers(baseMaps, overlays).addTo(map);
}

function addEventHandlers(resetFilters, applyFilter) {
    document.getElementById("incidents-by-date-reset").addEventListener("click", resetFilters);
    document.getElementById("priority-reset").addEventListener("click", resetFilters);
    document.getElementById("num-units-reset").addEventListener("click", resetFilters);
    document.getElementById("incident-day-reset").addEventListener("click", resetFilters);
    document.getElementById("time-of-day-reset").addEventListener("click", resetFilters);
    document.getElementById("incident-duration-reset").addEventListener("click", resetFilters);
    document.getElementById("categories-reset").addEventListener("click", resetFilters);
    document.getElementById("on-scene-unit-reset").addEventListener("click", resetFilters);

    document.getElementById("calls-over-two-hours").addEventListener("click", applyFilter);
    document.getElementById("structure-fires").addEventListener("click", applyFilter);
    document.getElementById("early-morning").addEventListener("click", applyFilter);
}

function main() {
    // Create a new group to which we can (later) add or remove our markers / spots on the map
    var markersLayer = new L.LayerGroup(); // NOTE: Layer is created here!

    // Create a new cluster group to which we can (later) add or remove our markers / spots on the map
    var clusterLayer = new L.MarkerClusterGroup();
    
    // Initialize our dc.js charts, passing the DOM Id in which we want the chart rendered as an argument
    var categoriesChart;
    var onSceneUnitChart;
    var incidentsByDateChart;
    var priorityChart;
    var numUnitsChart;
    var incidentDayChart;
    var timeOfDayChart;
    var incidentDurationChart;

    // A common color for all of the bar and row charts
    var commonChartBarColor = '#a1d99b';

    // This is where we will hold our crossfilter data
    var xdata = null;
    var all = null;
    var locations;

    // ToDo : Handle consuming the entire stream
    //var url = "http://api.data.sanjoseca.gov/api/v2/datastreams/SAN-JOSE-FIRE-INCID-JAN/data.csv"
    //var apiKey = "da255b1280151e37ba370d6c2a37b936ad023ccf"
    //url = url + "/?auth_key=" + apiKey;

    var url = "https://raw.githubusercontent.com/codeforsanjose/dashboards/master/dashboards/fire-data-explorer/data/FireIncidents_Jan2015.csv"
    
    // Called when dc.js is filtered (typically from user click interaction)
    var onFilt = function (chart, filter) {
        updateMap(locations.top(Infinity), markersLayer, clusterLayer );
    };

    var resetFilters = function(e) {

        var chart = null;
        switch(e.target.id) {
            case "categories-reset" : chart = categoriesChart;
                break;
            case "on-scene-unit-reset" : chart = onSceneUnitChart;
                break;
            case "incidents-by-date-reset" : chart = incidentsByDateChart;
                break;
            case "priority-reset" : chart = priorityChart;
                break;
            case "num-units-reset" : chart = numUnitsChart;
                break;
            case "incident-day-reset" : chart = incidentDayChart;
                break;
            case "time-of-day-reset" : chart = timeOfDayChart;
                break;
            case "incident-duration-reset" : chart = incidentDurationChart;
                break;
        }
        if (chart !== null) {
            chart.filterAll();
            dc.redrawAll();
        }
    };

    var applyFilter = function(e) {

        var filterString;
        var chart = null;
        switch(e.target.id) {
            case "calls-over-two-hours" :
                chart = incidentDurationChart;
                filterString = 600;
                break;
            case "early-morning" :
                chart = timeOfDayChart;
                filterString = 0;
                break;
            case "structure-fires" :
                chart = categoriesChart;
                filterString = "Structure Fire";
                break;
        }
        if (chart !== null) {
            chart.filter(filterString);
            dc.redrawAll();
        }
    };

    initializeMap(markersLayer, clusterLayer);
    addStations(fireStations.raw_data,markersLayer, clusterLayer )

    addEventHandlers(resetFilters, applyFilter);

  
    // If wifi is not available - use local file
    //d3.csv('data/FireIncidents_Jan2015.csv', function(error, data) {

    // Process the data and create the charts
    d3.csv(url, function (error, data) {

        // Throw away rows that don't have a dispatch time
        // and incidents that are categorized as "Uncategorized"
        data = data.filter(function (row) {
            if (row.Dispatched_Time.length !== 0 && row.Final_Incident_Category !== "Uncategorized")
                return row;
        })

        // Add a few additional elements
        data.forEach(function (d, i) {

            d.date_e = new Date(d.Date_Time_Of_Event)

            var times = getBinnedTime(d.date_e, d.Cleared_TimeStamp);

            d.incident_duration = "" + times.binned_time;
            d.actual_duration = times.incident_time;

            // Get the time of day - early morning., morning, afternoon, evening
            d.timeOfDay = getTimeOfDay(d.date_e.getHours());

            // If the on_scene_unit is not set, set it to "Unknown"
            if (d.On_Scene_Unit.trim() === null || d.On_Scene_Unit.trim() === undefined || d.On_Scene_Unit === '') {
                d.On_Scene_Unit = "Unknown";
            }

            // Set markers on the map
            var lat = d.Latitude;
            var longitude = d.Longitude;
            // create a map marker if the lat lng is present
            if (longitude != null && lat != undefined) {
                d.ll = L.latLng(longitude, lat);
                var mark = createMarkers(d);
                markersLayer.addLayer(mark);
                clusterLayer.addLayer(mark);
            }
        });

        // Construct the chart
        xdata = crossfilter(data);
        all = xdata.groupAll();

        // // Define the crossfilter dimensions
        var categories = xdata.dimension(function (d) {
            return d.Final_Incident_Category;
        });
        locations = xdata.dimension(function (d) {
            return d.ll;
        });
        var onSceneUnit = xdata.dimension(function (d) {
            return d.On_Scene_Unit;
        });
        var incidentDuration = xdata.dimension(function (d) {
            return d.incident_duration;
        });
        var numUnits = xdata.dimension(function (d) {
            return d.Unit_Count;
        });
        var timeOfDay = xdata.dimension(function (d) {
            return d.timeOfDay;
        });
        var priority = xdata.dimension(function (d) {
            return d.Priority;
        });

        var dayOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        var incidentDay = xdata.dimension(function (d) {
            return d.date_e.getDay() + "." + dayOfWeekNames [d.date_e.getDay()];
        });

        var incidentsByDate = xdata.dimension(function (d) {
            return d.date_e;
        });

        // Construct the charts and setting each chart's options
        categoriesChart = createCategoriesChart(categories, commonChartBarColor, "#categories-chart", onFilt);
        onSceneUnitChart = createOnSceneUnitChart(onSceneUnit, commonChartBarColor, "#on-scene-unit-chart", onFilt);
        incidentsByDateChart = createIncidentsByDateChart(incidentsByDate, commonChartBarColor, "#incidents-by-date-chart", onFilt);
        priorityChart = createPriorityChart(priority, commonChartBarColor, "#priority-chart", onFilt);
        numUnitsChart = createNumUnitsChart(numUnits, commonChartBarColor, "#num-units-chart", onFilt);
        incidentDayChart = createIncidentDayChart(incidentDay, commonChartBarColor, "#incident-day-chart", onFilt);
        timeOfDayChart = createTimeOfDayChart(timeOfDay, commonChartBarColor, "#time-of-day-chart", onFilt);
        incidentDurationChart = createIncidentDurationChart(incidentDuration, commonChartBarColor, "#incident-duration-chart", onFilt);

        dc.renderAll();

    });
}

window.onload = function(e) {
    main();
}
