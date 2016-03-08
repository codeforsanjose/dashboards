function filterDataByDate(inputData) { //# groups,# points per group

    // Initialize data
    var filteredData = [];

    filteredData.push({
        key: 'Medical',
        values: []
    });

    filteredData.push({
        key: 'Fire and Other',
        values: []
    });

    // Initialize array of days for incidents to 0
    var medicalIncidents = [32];
    var fireIncidents = [32];

    for (var i = 0; i < 32; i++ ) {
        medicalIncidents[i] = 0;
        fireIncidents[i] = 0;
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
        var incidentType = inputData[j][fireDataKeys.finalIncidentType]
        if (incidentType === incidentTypes.medical) {
            medicalIncidents[day] = medicalIncidents[day] + 1
        } else if (incidentType === incidentTypes.fireOther) {
            fireIncidents[day] = fireIncidents[day] + 1
        }
    }

    // Add the results to be returned
    for (var idx = 1; idx < 32; idx++) {
        filteredData[0].values.push({
            "value": medicalIncidents[idx],
            "label": idx
        })
        filteredData[1].values.push({
            "value": fireIncidents[idx],
            "label": idx
        });
    }

    return filteredData;
}
