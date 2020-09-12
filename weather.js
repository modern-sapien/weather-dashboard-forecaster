$(document).ready(function() {

var currentDateText = $("#current-Day")
var forecastDisplay = $("#current-forecast");
var futureForecast = $("#future-forecast");


$("#search-button").on("click", function()  {
    var searchVal = $("#city-search").val().trim();
    console.log("thanks amiel"); 
 
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&units=imperial&appid=fe5d52c1ddca1663f39aaaddd939123d",
        method: "GET", 
        dataType: "json"
    }).then(function(response){
        console.log(response.coord.lat); // latitude
        console.log(response.coord.lon);   // longitidunal
        
        var searchLat = response.coord.lat;
        var searchLon = response.coord.lon;

        console.log(searchLat);
        console.log(searchLon);
    });





});


});


        // GOING TO SEE IF THIS WORKS WITH THE LATITUDE SEARCH
        // console.log(response.name) // city name
        // console.log(response.main.temp) // speed in MPH
        // console.log(response.wind.speed) // speed in MPH
        // console.log(response.weather[0].icon) // weather icon
        // console.log(response.main.humidity + " i'm humidity") // humidity index



// fe5d52c1ddca1663f39aaaddd939123d

    // // By city name

    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

    // // "cnt" == number of days returned 1 to 16
    // api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}