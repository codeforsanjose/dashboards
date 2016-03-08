function addLineWithFocusChart(inputOptions) {
    nv.addGraph(function() {
        var chart = nv.models.lineChart()
            .x(function(d) { return d.label })    //Specify the data accessors.
            .y(function(d) { return d.value })
            .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
            .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
            .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
            .showYAxis(true)        //Show the y-axis
            .showXAxis(true)        //Show the x-axis

        chart.xAxis
            .axisLabel(inputOptions.xAxisLabel)

        chart.yAxis
            .tickFormat(d3.format(',.1f'))
            .axisLabel(inputOptions.yAxisLabel);

        chart.yDomain([0, inputOptions.maxY]);

        chart.xAxis.tickFormat(function(d) {
            return inputOptions.xAxisTickLabels[d].xAxisTickLabel;
        });

        d3.select('#' + inputOptions.id + ' svg')
            .datum(inputOptions.data)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}
