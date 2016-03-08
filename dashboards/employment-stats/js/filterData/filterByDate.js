function filterDataByDate(inputData) { //# groups,# points per group

    // Initialize data
    var filteredData = [];
    var xAxisLabels = [];
    var unEmploymentRate = []

    unEmploymentRate.push({
        key: 'Unemployment Rate',
        values: [],
        area: true
    })

    filteredData.push({
        key: 'Labor Force',
        values: [],
        area: true
    });

    filteredData.push({
        key: 'Employment',
        values: [],
        area: true
    });

    filteredData.push({
        key: 'Unemployment',
        values: [],
        area: true
    });

    var numPoints = inputData.length;
    for (var j = 0; j < numPoints; j++) {
        var dataPoint = inputData[j]

        var label = dataPoint[dataKeys.year] + "-" + dataPoint[dataKeys.period]

        xAxisLabels.push({
            xAxisTickLabel: label
        })

        var laborForceValue = dataPoint[dataKeys.laborForce]
        var employmentValue = dataPoint[dataKeys.employment]
        var unemploymentValue = dataPoint[dataKeys.unemployment]

        filteredData[0].values.push({
            "value": laborForceValue,
            "label": j
        })

        filteredData[1].values.push({
            "value": employmentValue,
            "label": j
        })

        filteredData[2].values.push({
            "value": unemploymentValue,
            "label": j
        })

        unEmploymentRate[0].values.push({
            "value" : dataPoint[dataKeys.unemploymentRate],
            "label": j
        })
    }


    return {
        "filteredData": filteredData,
        "xAxisLabels": xAxisLabels,
        "unemploymentRate" : unEmploymentRate
    };
}
