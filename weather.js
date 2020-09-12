$(document).ready(function() {


$("#search-button").on("click", function()  {
    var searchVal = $("#city-search").val().trim()
    console.log(searchVal + "thanks amiel")
})

searchFunction() {

}

function searchFunction() {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&appid=fe5d52c1ddca1663f39aaaddd939123d",
        type: "GET", 
        dataType: "json"
    })
}

    // fe5d52c1ddca1663f39aaaddd939123d

    // // By city name

    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

    // // "cnt" == number of days returned 1 to 16
    // api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}



});