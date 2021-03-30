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

// Create event listener for button
button.on("click", () => {
    d3.event.preventDefault();

    // Set up date filter
    var inputDate = inputFieldDate.property("value").trim();
    var filterDate = tableData.filter(tableData => tableData.datetime === inputDate);

    // Set up city filter 
    var inputCity = inputFieldCity.property("value").toLowerCase().trim();
    var filterCity = tableData.filter(tableData => tableData.city === inputCity);

    // Set up combined filter
    var combinedFilter = tableData.filter(tableData => tableData.datetime === inputDate && tableData.city === inputCity)

    tBody.html("");

    let response = {
        filterDate, filterCity, combinedFilter
    }

    // Show data if 1 or more results match search terms for search using both filters
    if (response.combinedFilter.length !==0){
        addData(combinedFilter);
    }

    // Show data if 0 results match search terms for search using both filters but 1 or more result for either date or city filter
    else if(response.combinedFilter.length === 0 && ((response.filterDate.length !== 0 || response.filterCity.length !== 0))) {
        addData(filterDate) || addData(filterCity);
    }
        // Show text if no results
        else {
            tBody.append("tr").append("td").text("No sightings match your search terms.")
        }
})