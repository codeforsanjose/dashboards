function main() {

    var numbersByDate = filterDataByDate(sj_unemployment.raw_data);

    addLineWithFocusChart({
        data: numbersByDate.filteredData,
        id: "chart_employment",
        xAxisLabel: "Date",
        yAxisLabel: "Count",
        maxY: 600000,
        xAxisTickLabels: numbersByDate.xAxisLabels
    });

    addLineWithFocusChart({
        data: numbersByDate.unemploymentRate,
        id: "chart_unemployment_rate",
        xAxisLabel: "Date",
        yAxisLabel: "Count",
        maxY: 15,
        xAxisTickLabels: numbersByDate.xAxisLabels
    });

}

main();