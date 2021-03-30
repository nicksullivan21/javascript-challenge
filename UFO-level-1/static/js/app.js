// from data.js
var tableData = data;

// Create references using d3
var tBody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputFieldDate = d3.select("#datetime");
var inputFieldCity = d3.select("#city");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Input data into HTML
var addData = (dataInput) => {
    dataInput.forEach(ufosighting => {
        var row = tBody.append("tr");
        columns.forEach(column => row.append("td").text(ufosighting[column])
        )
    });
}

addData(tableData);

