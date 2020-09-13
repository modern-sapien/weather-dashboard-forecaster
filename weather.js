$(document).ready(function() {

var currentDateText = $("#current-Day")
var forecastDisplay = $("#current-forecast");
var futureForecast = $("#future-forecast");

var dateDisplay = (moment().format("MM/DD/YYYY"))

console.log(moment().add(10, 'days').calendar())
// substring(0, 10);

$("#search-button").on("click", function()  {
    var searchVal = $("#city-search").val().trim();
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&units=imperial&appid=fe5d52c1ddca1663f39aaaddd939123d",
        method: "GET", 
        dataType: "json"
    }).then(function(response){
        console.log(response)
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        var locationTot = "lat="+ cityLat + "&lon=" + cityLon; 
        // CURRENT CITY     
        var cityName = (response.name);
        var mainLine = $("<h1>");
        mainLine.text(cityName + " " + dateDisplay);
        forecastDisplay.append(mainLine);
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?" + locationTot + "&units=imperial&appid=fe5d52c1ddca1663f39aaaddd939123d",
                method: "GET", 
                dataType: "json"
            }).then(function(response){
                console.log(response);
                //CURRENT TEMP ===========
                var currentTemp = response.current.temp 
                var h3Temp = $("<h3>");     //creation of h2 subheading
                h3Temp.addClass("py-2");
                h3Temp.text("Temperature " + currentTemp + " °F");
                mainLine.append(h3Temp);
                // HUMIDITY ============
                var currentHumidity = response.current.humidity;
                var h3Humidity = $("<h3>");
                h3Humidity.addClass("py-2");
                h3Humidity.text("Humidity:  " + currentHumidity);
                mainLine.append(h3Humidity);
                // WIND ===========
                var currentWind = response.current.wind_speed;
                var h3Wind = $("<h3>");
                h3Wind.addClass("py-2");
                h3Wind.text("Wind Speed:  " + currentWind + "  MPH");
                mainLine.append(h3Wind);
                // UV INDEX ==============
                var uvIndex = response.current.uvi  
                var rowUvIndex = $("<div>");
                rowUvIndex.addClass("row pl-3 py-2")
                mainLine.append(rowUvIndex);
                    //LEFT SIDE
                var h3UvIndex1 = $("<h3>");
                h3UvIndex1.text("UV Index:    ");
                rowUvIndex.append(h3UvIndex1);
                    //RIGHT SIDE
                var h4UvIndex2 = $("<h4>");
                h4UvIndex2.text(uvIndex);
                h4UvIndex2.addClass("altTest ml-2");
                // need to create an IF statement here for determing class & checking documentation for the display 
                rowUvIndex.append(h4UvIndex2);

                console.log(response.current.weather[0].icon) // icon display

                //FOR LOOP for Bottom Container Content
                for (i = 0; i < 5; i ++) {
                // for Loop Local variabbles ====================
                var dailyIcon = response.daily[i].weather[0].icon;
                var dailyHumidity = response.daily[i].humidity;
                var dailyLowTemp = response.daily[i].temp.min;
                var dailyHighTemp = response.daily[i].temp.max;
                var dailyAvg = (dailyLowTemp + dailyHighTemp) / 2;
                var dailyDate = moment().add((i+1), "days").format("M/D/YYYY");
                // FORECAST DIVs =============
                var foreCastDiv = $("<div>");
                foreCastDiv.addClass("altTest m-1 px-1 col-2-sm");
                futureForecast.append(foreCastDiv);
                // FORECAST Dates ==========
                var h5Lower = $("<h5>");
                h5Lower.text(dailyDate);
                h5Lower.addClass("altTest");
                foreCastDiv.append(h5Lower);
                // Weather Icon Forecast =========
                var iconLower = $("<img>"); //create variable for img URL & ref
                iconLower.attr("src", "http://openweathermap.org/img/wn/"+ dailyIcon + "@2x.png");    //replace text with .attr("src", asdlkflaksdjf)
                foreCastDiv.append(iconLower);
                // Temp Forecast =========
                var pLowerTemp = $("<p>");
                pLowerTemp.text("Temp: " + dailyAvg + " °F");
                pLowerTemp.addClass("altTest my-1");
                foreCastDiv.append(pLowerTemp)
                // Humidity Forecast ========
                var pLowerHumidity = $("<p>");
                pLowerHumidity.text("Humidity: " + dailyHumidity + "%");
                pLowerHumidity.addClass("altTest my-1");
                foreCastDiv.append(pLowerHumidity)
                }
                


            });
    });





});


});

    //  THIS IS THE URL for inputting the icon codes so they display
    // http://openweathermap.org/img/wn/10d@2x.png


        // GOING TO SEE IF THIS WORKS WITH THE LATITUDE SEARCH
        // console.log(response.name) // city name
        // console.log(response.main.temp) // speed in MPH
        // console.log(response.wind.speed) // speed in MPH
        // console.log(response.weather[0].icon) // weather icon
        // console.log(response.main.humidity + " i'm humidity") // humidity index



// fe5d52c1ddca1663f39aaaddd939123d