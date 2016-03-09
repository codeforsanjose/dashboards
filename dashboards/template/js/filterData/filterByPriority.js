function filterDataByPriority(inputData) { //# groups,# points per group

    // Initialize data
    var filteredData = [];

    filteredData.push({
        key: 'Priority 1',
        values: []
    });

    filteredData.push({
        key: 'Priority 2',
        values: []
    });

    // Initialize array of days for incidents to 0
    var p1 = [32];
    var p2 = [32];

    for (var i = 0; i < 32; i++ ) {
        p1[i] = 0;
        p2[i] = 0;
    }

    var numPoints = inputData.length;
    for (var j = 0; j < numPoints; j++) {

        // Extract the day
        var fullDate = inputData[j][fireDataKeys.dateOfEvent]
        var dateArray = fullDate.split(" ") // separate day and time
        var date = dateArray[0];
        var tempArray = date.split("/") // separate day, month, year
        var day = +tempArray[1]

        // get the incident type and add it
        var priorityNum = inputData[j][fireDataKeys.priority]
        if (priorityNum === incidentPriorities.one) {
            p1[day] = p1[day] + 1
        } else if (priorityNum === incidentPriorities.two) {
            p2[day] = p2[day] + 1
        }
    }

    // Add the results to be returned
    for (var idx = 1; idx < 32; idx++) {
        filteredData[0].values.push({
            "value": p1[idx],
            "label": idx
        })
        filteredData[1].values.push({
            "value": p2[idx],
            "label": idx
        });
    }

    return filteredData;
}
