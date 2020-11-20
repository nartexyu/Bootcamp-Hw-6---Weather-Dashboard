// Creates current date
let d = new Date()
let date = (d.getMonth()+1) + "-" + d.getDate() + "-" + d.getFullYear();
//console.log(date)

// Retreives last searched city from local storage runs functions for search
let lastCity = localStorage.getItem("lastCity")
if (lastCity != null) {
    getCurrent(lastCity);
    getForecast(lastCity);
};

// Clears previous search history on page load
$(".history").html("")

// On click event to run ajax functions
$(".btn").on("click", function() {
    let search = $(".search").val();
    localStorage.setItem("lastCity", search)
    getCurrent(search);
    getForecast(search);
    $(".search").val("");

    $(".history").append(`<div class="col-10 d-flex mb-2 p-2 border cityHistory"> ${search} </div>`)

    // On click event to research previously searched cities
    $(".cityHistory").on("click", function() {
        let research = $(this).text()
        // localStorage.setItem("lastCity", research)
        console.log(research)
        getCurrent(research);
        getForecast(research);
    });
});



// Function to ajax call current weather data
function getCurrent(search) {
    let currentUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=d26c6650a01058b5807115b5f2832783";
    
    $.ajax ({
        url: currentUrl,
        method: "GET"
    }).then (function(response){
        // console.log(response)
        let temp = Math.trunc((response.main.temp - 273.15) * 9/5 + 32)
        $(".temperature").text("Weather: " + temp + "\u00B0 F")
        $(".humidity").text("Humidity: " + response.main.humidity + "%")
        $(".wind").text("wind: " + response.wind.speed + " MPH")

        $(".city").empty()
        $(".city").text(response.name + " (" + date + ")")
        let emoji = response.weather[0].icon
        $(".city").append('<img src="https://openweathermap.org/img/wn/' + emoji + '@2x.png" class="weather-icon">')
        
        let lat = response.coord.lat
        let lon = response.coord.lon
        let uvUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&appid=d26c6650a01058b5807115b5f2832783";
        
        $.ajax ({
            url: uvUrl,
            method: "GET"
        }).then (function(response){
            // console.log(response)
            $(".uvSpan").text(response.value)
            if (response.value > 0 && response.value < 3) {
                $(".uvSpan").attr("class", "badge badge-success")
            } else if (response.value > 3 && response.value < 6) {
                $(".uvSpan").attr("class", "badge badge-warning")
            } else if (response.value > 6) {
                $(".uvSpan").attr("class", "badge badge-danger")
            };
        });
    });
};

// Function to ajax call 5 day weather forecast
function getForecast(search) {
    let forecastUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=d26c6650a01058b5807115b5f2832783";
    
    $.ajax ({
        url: forecastUrl,
        method: "GET"
    }).then (function(response){
        console.log(response)

        for(let i = 0; i < 40; i=i+8){
            let date = response.list[i].dt_txt.substring(0,10)
            $(".date"+i).text(date)

            let emoji = response.list[i].weather[0].icon
            $(".emoji"+i).attr("src", "http://openweathermap.org/img/wn/" + emoji + ".png")

            let temperature = Math.trunc((response.list[i].main.temp - 273.15) * 9/5 + 32)
            $(".fWeather"+i).text("Temp: " + temperature + "°F")
            
            $(".fHumidity"+i).text("Humidity: " + response.list[i].main.humidity + "%")
        }
    });
};

