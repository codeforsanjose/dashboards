function filterDataByDayPeriod(inputData) { //# groups,# points per group

    // Initialize data
    var filteredData = [];

    filteredData.push({
        key: 'Morning',
        values: []
    });

    filteredData.push({
        key: 'Afternoon',
        values: []
    });

    filteredData.push({
        key: 'Evening',
        values: []
    });

    filteredData.push({
        key: 'Early Morning',
        values: []
    });

    // Initialize array of days for incidents to 0
    var morning = [32];  // 6 - 11:59
    var afternoon = [32]; // noon - 5:59
    var evening = [32]; // 6 - 11:59
    var earlyMorning = [32]; // midnight - 5:59

    for (var i = 0; i < 32; i++ ) {
        morning[i] = 0;
        afternoon[i] = 0;
        evening[i] = 0;
        earlyMorning[i] = 0;
    }

    var numPoints = inputData.length;
    for (var j = 0; j < numPoints; j++) {

        // Extract the day
        var fullDate = inputData[j][fireDataKeys.dateOfEvent]
        var dateArray = fullDate.split(" ") // separate day and time
        var time = dateArray[1];
        var isMorning = dateArray[2] === "AM";
        var timeArray = time.split(":") // get hour

        var hour = parseInt(timeArray[0])

        var date = dateArray[0];
        var tempArray = date.split("/") // separate day, month, year
        var day = +tempArray[1]

        if (isMorning) {
            if (hour >= 6 && hour <= 11) {
                //console.log("M: " + day + " - " + time + " " + morning)
                morning[day] = morning[day] + 1
            } else {
                //console.log("EM: " + day + " - " + time + " " + morning)
                earlyMorning[day] = earlyMorning[day] + 1
            }
        } else {
            if (hour === 12 || (hour >= 1 && hour <= 5)) {
                //console.log("A: " + day + " - " + time + " " + morning)
                afternoon[day] = afternoon[day] + 1;
            } else {
                //console.log("E: " + day + " - " + time + " " + morning)
                evening[day] = evening[day] + 1;
            }
        }
    }

    // Add the results to be returned
    for (var idx = 1; idx < 32; idx++) {
        filteredData[0].values.push({
            "value": morning[idx],
            "label": idx
        })
        filteredData[1].values.push({
            "value": afternoon[idx],
            "label": idx
        });
        filteredData[2].values.push({
            "value": evening[idx],
            "label": idx
        });
        filteredData[3].values.push({
            "value": earlyMorning[idx],
            "label": idx
        });
    }

    return filteredData;
}
