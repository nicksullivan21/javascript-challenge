// from data.js
var tableData = data;

// Create references using d3
var tBody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputFieldDate = d3.select("#datetime");
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

// Create event listener for button
button.on("click", () => {
    d3.event.preventDefault();

    // Set up date filter
    var inputDate = inputFieldDate.property("value").trim();
    var filterDate = tableData.filter(tableData => tableData.datetime === inputDate);

    tBody.html("");

    let response = {
        filterDate
    }

    // Show data if 1 or more results match search terms
    if (response.filterDate.length !==0){
        addData(filterDate);
    }

        // Show text if no results
        else {
            tBody.append("tr").append("td").text("No sightings match your search terms.")
        }
})