$(document).ready(function() {



var forecastDisplay = $("#current-forecast");
var futureForecast = $("#future-forecast");


$("#search-button").on("click", function()  {
    var searchVal = $("#city-search").val().trim();
    console.log("thanks amiel"); 
 
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&appid=fe5d52c1ddca1663f39aaaddd939123d",
        method: "GET", 
        dataType: "json"
    }).then(function(response){
        console.log(response)
        console.log(response.name)
        

        console.log(response.wind.speed)


    })
});


});



// fe5d52c1ddca1663f39aaaddd939123d

    // // By city name

    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

    // // "cnt" == number of days returned 1 to 16
    // api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}