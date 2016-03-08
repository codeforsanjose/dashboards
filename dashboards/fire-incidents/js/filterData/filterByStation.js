
// ToDo - Double check mapping of some station names
//        Battalion numbers might not always correspond to the station #
function filterDataByStation(inputData) { //# groups,# points per group
    var filteredData = [];

    filteredData.push({
        key: 'Stations',
        values: []
    });

    var numPoints = inputData.length;

    // Initialize the incident count by 0
    var stations = [36];
    for (var i = 0; i < 36; i++) {
        stations[i] = 0;
    }

    for (var j = 0; j < numPoints; j++) {
        var fullDate = inputData[j][fireDataKeys.dateOfEvent]

        var dateArray = fullDate.split(" ")
        var date = dateArray[0];

        var unitString = inputData[j][fireDataKeys.onSceneUnit]
        if (unitString !== null && unitString.length > 1) {
            var unit = unitString.slice(1)

            var unitNum = Number.parseInt(unit)

            if (!isNaN(unitNum)) {
                stations[unitNum] = stations[unitNum] + 1
            }
        }
    }

    for (var idx = 1; idx < 36; idx++) {
        filteredData[0].values.push({
            "value": stations[idx],
            "label": idx
        });
    }

    return filteredData;
}
