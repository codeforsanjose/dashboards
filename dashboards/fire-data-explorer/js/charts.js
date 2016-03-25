function createCategoriesChart(dimensionData, colors, chartID, onFilt) {

    var chart = dc.rowChart(chartID);
    chart.width($(chartID).innerWidth()-30)
        .height(250)
        .colors(colors)
        .margins({top: 10, left: 20, right: 10, bottom:30})
        .group(dimensionData.group())
        .dimension(dimensionData)
        .elasticX(true)
        .on("filtered", onFilt);

    // rotate the axis tick marks
    chart.on("renderlet.<renderletKey>", function (chart) {
        // rotate x-axis labels
        chart.selectAll('g.axis text')
            .attr('transform', 'translate(-10,10) rotate(315)');
    });
    
    return chart
}

function createOnSceneUnitChart(dimensionData, colors, chartID, onFilt) {

    var chart = dc.rowChart(chartID);
    chart.width($(chartID).innerWidth()-30)
        .height(window.innerHeight - 50)
        .colors(colors)
        .margins({top: 10, left: 10, right: 10, bottom: 20})
        .group(dimensionData.group())
        .dimension(dimensionData)
        .elasticX(true)
        .on("filtered", onFilt);

    return chart;
}

function createIncidentDurationChart(dimensionData, colors, chartID, onFilt) {

    var chart = dc.rowChart(chartID);

    chart.width($(chartID).innerWidth() - 30)
        .height(400)
        .colors(colors)
        .margins({top: 10, left: 20, right: 10, bottom: 20})
        .group(dimensionData.group())
        .dimension(dimensionData)
        .elasticX(true)
        .ordering(function (d) {
            return +d.key;
        })
        .label(function (d) {
            var label
            switch (+d.key) {
                case 10:
                    label = "<= 10 mins";
                    break;
                case 15:
                    label = "10 - 15 mins";
                    break;
                case 20:
                    label = "15 - 20 mins";
                    break;
                case 25:
                    label = "20 - 25 mins";
                    break;
                case 30:
                    label = "25 - 30 mins";
                    break;
                case 60:
                    label = "30 mins - 1 hour";
                    break;
                case 120:
                    label = "1 - 2 hours";
                    break;
                case 600:
                    label = "> 2 hours";
                    break;
            }
            return label
        })
        .on("filtered", onFilt);

    return chart;
}

function createIncidentDayChart(dimensionData, colors, chartID, onFilt) {

    var chart = dc.rowChart(chartID);

    chart.width($(chartID).innerWidth() - 30)
        .height(135)
        .colors(colors)
        .margins({top: 10, left: 20, right: 10, bottom: 30})
        .group(dimensionData.group())
        .dimension(dimensionData)
        .label(function (d) {
            return d.key.split(".")[1];
        })
        .title(function (d) {
            return d.value;
        })
        .elasticX(true)
        .on("filtered", onFilt);
    chart.xAxis().ticks(4);

    chart.on("renderlet.<renderletKey>", function (chart) {
        // rotate x-axis labels
        chart.selectAll('g.axis text')
            .attr('transform', 'translate(-10,10) rotate(315)');
    });

    return chart;
}

function createTimeOfDayChart(dimensionData, colors, chartID, onFilt) {

    var chart = dc.pieChart(chartID);

    chart.width($(chartID).innerWidth())
        .height(200)
        .slicesCap(4)
        .innerRadius(20)
        .dimension(dimensionData)
        .group(dimensionData.group())
        .label(function (d) {
            var label
            switch (d.key) {
                case 0:
                    label = "Early morning";
                    break;
                case 1:
                    label = "Morning";
                    break;
                case 2:
                    label = "Afternoon";
                    break;
                case 3:
                    label = "Evening";
                    break;
            }
            return label;
        })
        .on("filtered", onFilt);

    chart.ordinalColors(['#1f78b4', '#b2df8a', '#cab2d6', '#6799AA']);

    return chart;
}

function createIncidentsByDateChart(dimensionData, colors, chartID, onFilt) {

    var chart = dc.barChart(chartID);

    chart.width($(chartID).innerWidth() - 30)
        .height(80)
        .colors(colors)
        .margins({top: 10, left: 30, right: 10, bottom: 40})
        .dimension(dimensionData)
        .group(dimensionData.group(d3.time.day))
        .x(d3.time.scale().domain([new Date(2014, 12, 31), new Date(2015, 2, 1)]))
        .round(d3.time.day.round)
        .xUnits(d3.time.days)
        .elasticY(true)
        .elasticX(true)
        .on("filtered", onFilt);
    chart.yAxis().ticks(3);

    chart.on("renderlet.<renderletKey>", function (chart) {
        // rotate x-axis labels
        chart.selectAll('g.x text')
            .attr('transform', 'translate(-10,10) rotate(315)');
    });

    return chart;
}

function createPriorityChart(dimensionData, colors, chartID, onFilt) {
    var chart = dc.rowChart(chartID);

    chart.width($(chartID).innerWidth() - 30)
        .height(100)
        .colors(colors)
        .margins({top: 10, left: 10, right: 10, bottom: 20})
        .group(dimensionData.group())
        .dimension(dimensionData)
        .elasticX(true)
        .on("filtered", onFilt);

    return chart;
}

function createNumUnitsChart(dimensionData, colors, chartID, onFilt) {
    var chart = dc.rowChart(chartID);

    chart.width($(chartID).innerWidth() - 30)
        .height(300)
        .colors(colors)
        .margins({top: 10, left: 10, right: 10, bottom: 20})
        .group(dimensionData.group())
        .dimension(dimensionData)
        .elasticX(true)
        .ordering(function (d) {
            return -d.key;
        })
        .on("filtered", onFilt);

    return chart;
}