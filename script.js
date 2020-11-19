$(".btn").on("click", function() {
    let search = $(".search").val();
    getCurrent(search)
})

function getCurrent(search) {
    let currentUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=d26c6650a01058b5807115b5f2832783";
    
    $.ajax ({
        url: currentUrl,
        method: "GET"
    }).then (function(response){
        console.log(response)
        let temp = Math.trunc((response.main.temp - 273.15) * 9/5 + 32)
        $(".temperature").text("Weather: " + temp + "\u00B0 F")
        $(".humidity").text("Humidity: " + response.main.humidity + "%")
        $(".wind").text("wind: " + response.wind.speed + " MPH")

        $(".city").empty()
        $(".city").text(response.name)
        let emoji = response.weather[0].icon
        console.log(emoji)
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

function getForecast(search) {
    let forecastUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=d26c6650a01058b5807115b5f2832783";
    
    $.ajax ({
        url: forecastUrl,
        method: "GET"
    }).then (function(response){
        console.log(response)
    });
};

