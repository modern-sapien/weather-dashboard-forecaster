## Weather Dashboard

The assignment is to create a weather site

## Key Functionality

* Searchable
    the search is linked to an ajax function that accesses the API
        the information from that call then populates the information on the right hand side of the screen
    
    the search then populates into a div with it's name in the history

* Tracks History
    appended divs of previous search history have a clickable functionality similar to search, only THEY DO NOT LEAD TO more population of history. 

* UV index for current day  is in a color block that is dependent on favorable, moderate or severe conditions
    "red severe", "yellow moderate", "green is fair"

* Icon representation of conditions
    Either URL link or have images in asset folder and assign a URL for "sunny", "partly cloudly", "thunderstorm", etc.

* Clicking on a past search history item brings up that item & presents it again


## Key Display

[Left Container ] 
of site is for search functionality & history

One div that holds all content on the left is hard coded with a search text area & a button for searching, upon searching that search then displays in an appended div populated from local search history. 

Upon ever


[ Main container ] 
of the site is divided into two sections

One main target area displays larger
in a "card" tyle style

This section will only TWO areas hardcoded; a card for the main display & a div for the row of 5 day forecasts
_____________________________________________________
h1 - City / Date

h2 - Temperature: _____     in degrees

h2 - Humidity: _____    in percentage

h2 - Wind Speed: _____  in MPH

h2 - UV index: ______ stylized block display w/ numbers
______________________________________________________

5-Day Forecast:

    ______          _____           _____      
    DATE:           Date:           Date:
    ICON            ICON            ICON
    TEMP:           TEMP:           TEMP:
    HUMIDITY:       HUMIDITY        HUMIDITY



