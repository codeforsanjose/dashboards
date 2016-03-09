function main() {

    var incidentCountByDate = filterDataByDate(fire_incidents.raw_data);

    addBarChart({
        data: incidentCountByDate,
        id: "chart_date",
        xAxisLabel: "Days - January 2015",
        yAxisLabel: "Incident Count",
        showControls: true
    });

    var incidentCountByStation = filterDataByStation(fire_incidents.raw_data);

    addBarChart({
        data: incidentCountByStation,
        id: "chart_incidents_station",
        xAxisLabel: "Stations",
        yAxisLabel: "Incident Count"
    });

    var incidentCountByPriority = filterDataByPriority(fire_incidents.raw_data);

    addScatterChart({
        data: incidentCountByPriority,
        id: "chart_priority",
        xAxisLabel: "Days - January 2015",
        yAxisLabel: "Incident Count",
        maxY: 300
    });

    var incidentCountByDayPeriod = filterDataByDayPeriod(fire_incidents.raw_data);

    addScatterChart({
        data: incidentCountByDayPeriod,
        id: "chart_incidents_day_period",
        xAxisLabel: "Days - January 2015",
        yAxisLabel: "Incident Count",
        maxY: 110
    });
}

main();





