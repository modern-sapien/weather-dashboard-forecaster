        $(document).ready(function() {
        var currentDateText = $("#current-Day")
        var forecastDisplay = $("#current-forecast");
        var futureForecast = $("#future-forecast");
        var leftContainer = $("#left-container");
        var dateDisplay = (moment().format("MM/DD/YYYY"));
        var clearBtn = $("#clear-button");
        var userSearchArray = []; //for storing keys for the object

        console.log(moment().add(10, 'days').calendar())
        // substring(0, 10);

        // checks to see if there are any entries in local storage
        var parsedUserSearchArray = JSON.parse(localStorage.getItem("userSearch"))
        console.log(parsedUserSearchArray);

        
        function displayCityKey() {
        var userSearchKey = Object.keys(localStorage); //array of strings // keys or values
        console.log(userSearchKey)
        for (var j = 0; j < userSearchKey.length; j++) {
        if (userSearchKey < 0) {
        return } 
        else {
        var userSearchKeyItem = localStorage.getItem(userSearchKey[j])
        var pastSearchBtn = $("<div>");
        pastSearchBtn.addClass("mt-3 ml-0 btn btn-info created-btn px-5 row");
        pastSearchBtn.attr("data-type", userSearchKey[j])
        pastSearchBtn.text(userSearchKeyItem.toUpperCase());
        leftContainer.append(pastSearchBtn);
        }
        }}

        displayCityKey();
        
        function clearCommand(){
            leftContainer.empty();
            localStorage.clear();
        }

        // CLEAR BUTTON FUNCTIONALITY
        // ==========================
        clearBtn.on("click", function()  {
        leftContainer.empty();
        localStorage.clear();
            });

        //  SAVED SEARCH BUTTON FUNCTIONALITY
        // ====================================
        $(".created-btn").on("click", function(){
            searchLeftVal = ($(this).attr("data-type"));
            searchStorageCity = localStorage.getItem(searchLeftVal);
            console.log(searchStorageCity);
               
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&units=imperial&appid=fe5d52c1ddca1663f39aaaddd939123d",
                    method: "GET", 
                    dataType: "json"
                }).then(function(response){
                    console.log(response + " this the button response")
                    forecastDisplay.empty();
                    futureForecast.empty();
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
                    var currentTemp = Math.floor(response.current.temp) 
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
                    if (uvIndex <= 2)  {h4UvIndex2.addClass("lowUv")}
                    else if (uvIndex <= 5)  {h4UvIndex2.addClass("moderateUv")}
                    else if (uvIndex <= 7)  {h4UvIndex2.addClass("highUv")}
                    else if (uvIndex <= 10) {h4UvIndex2.addClass("veryHighUv")}
                    else h4UvIndex2.addClass("extremeUv");
                    h4UvIndex2.addClass("ml-2");
                    // need to create an IF statement here for determing class & checking documentation for the display 
                    rowUvIndex.append(h4UvIndex2);
                    //FOR LOOP for Bottom Container Content
                    for (i = 0; i < 5; i ++) {
                    // for Loop Local variabbles ====================
                    var dailyIcon = response.daily[i].weather[0].icon;
                    var dailyHumidity = response.daily[i].humidity;
                    var dailyLowTemp = response.daily[i].temp.min;
                    var dailyHighTemp = response.daily[i].temp.max;
                    var dailyAvg = Math.floor((dailyLowTemp + dailyHighTemp) / 2);
                    var dailyDate = moment().add((i+1), "days").format("M/D/YYYY");
                    // FORECAST DIVs =============
                    var foreCastDiv = $("<div>");
                    foreCastDiv.addClass("altTest m-1 px-1 col-2-sm");
                    futureForecast.append(foreCastDiv);
                    // FORECAST Dates ==========
                    var h5Lower = $("<h5>");
                    h5Lower.text(dailyDate);
                    foreCastDiv.append(h5Lower);
                    // Weather Icon Forecast =========
                    var iconLower = $("<img>"); //create variable for img URL & ref
                    iconLower.attr("src", "http://openweathermap.org/img/wn/"+ dailyIcon + "@2x.png");    //replace text with .attr("src", asdlkflaksdjf)
                    foreCastDiv.append(iconLower);
                    // Temp Forecast =========
                    var pLowerTemp = $("<p>");
                    pLowerTemp.text("Temp: " + dailyAvg + " °F");
                    pLowerTemp.addClass("my-1");
                    foreCastDiv.append(pLowerTemp)
                    // Humidity Forecast ========
                    var pLowerHumidity = $("<p>");
                    pLowerHumidity.text("Humidity: " + dailyHumidity + "%");
                    pLowerHumidity.addClass("my-1");
                    foreCastDiv.append(pLowerHumidity);
                    }
                    });
                });
            }

            //=========================================== 
            //   SEARCH INPUT FUNCTIONALITY
            $("#search-button").on("click", function()  {
            var searchVal = $("#city-search").val().trim().toLowerCase();
            // Creates new button based on search value
            var pastSearchBtn = $("<div>");
            pastSearchBtn.addClass("mt-3 ml-0 btn btn-info created-btn px-5 row");
            pastSearchBtn.attr("data-type", searchVal)
            pastSearchBtn.text(searchVal.toUpperCase());
            leftContainer.append(pastSearchBtn);
            localStorage.setItem(searchVal, searchVal);
            // Ajax call to generate initial data to obtain latitude & longitude 
            $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchVal + "&units=imperial&appid=fe5d52c1ddca1663f39aaaddd939123d",
            method: "GET", 
            dataType: "json"
        }).then(function(response){
            forecastDisplay.empty();
            futureForecast.empty();
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
                var currentTemp = Math.floor(response.current.temp) 
                var h3Temp = $("<h3>");   
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
                // If statements regarding UV index visual display
                if (uvIndex <= 2)  {h4UvIndex2.addClass("lowUv")}
                else if (uvIndex <= 5)  {h4UvIndex2.addClass("moderateUv")}
                else if (uvIndex <= 7)  {h4UvIndex2.addClass("highUv")}
                else if (uvIndex <= 10) {h4UvIndex2.addClass("veryHighUv")}
                else h4UvIndex2.addClass("extremeUv");
                h4UvIndex2.addClass("ml-2"); 
                rowUvIndex.append(h4UvIndex2);
                //FOR LOOP for Bottom Container Content
                for (i = 0; i < 5; i ++) {
                // for Loop Local variabbles ====================
                var dailyIcon = response.daily[i].weather[0].icon;
                var dailyHumidity = response.daily[i].humidity;
                var dailyLowTemp = response.daily[i].temp.min;
                var dailyHighTemp = response.daily[i].temp.max;
                var dailyAvg = Math.floor((dailyLowTemp + dailyHighTemp) / 2);
                var dailyDate = moment().add((i+1), "days").format("M/D/YYYY");
                // FORECAST DIVs =============
                var foreCastDiv = $("<div>");
                foreCastDiv.addClass("altTest m-1 px-1 col-2-sm");
                futureForecast.append(foreCastDiv);
                // FORECAST Dates ==========
                var h5Lower = $("<h5>");
                h5Lower.text(dailyDate);
                foreCastDiv.append(h5Lower);
                // Weather Icon Forecast =========
                var iconLower = $("<img>"); //create variable for img URL & ref
                iconLower.attr("src", "http://openweathermap.org/img/wn/"+ dailyIcon + "@2x.png");    //replace text with .attr("src", asdlkflaksdjf)
                foreCastDiv.append(iconLower);
                // Temp Forecast =========
                var pLowerTemp = $("<p>");
                pLowerTemp.text("Temp: " + dailyAvg + " °F");
                pLowerTemp.addClass("my-1");
                foreCastDiv.append(pLowerTemp)
                // Humidity Forecast ========
                var pLowerHumidity = $("<p>");
                pLowerHumidity.text("Humidity: " + dailyHumidity + "%");
                pLowerHumidity.addClass("my-1");
                foreCastDiv.append(pLowerHumidity)
                }
            });
        
    });
}); //search click

    
    });
    



