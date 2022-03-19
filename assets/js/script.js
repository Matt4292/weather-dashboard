
// search info
var searchInput = document.getElementById("search-input");
var recentsList = document.getElementById("list-recents");
var APIKey = "3d08c57a99956ae3a607652d2a643ceb";

// Current Weather elements JQuery
var city = $("#cityName");
$("#currentDate").text(moment().format('L'))
var currentTemp = $("#currentTemp");
var currentWind = $("#currentWind");
var currentHumid = $("#currentHumid");
var currentUV = $("#currentUV");
var currentIcon = $("#icon")

// Forecast Weather Elements JQuery
var forecastTemp = $("#forecastTemp")
var forecastWind = $("#forecastWind")
var forecastHumid = $("#forecastHumid")

console.log(searchInput.value)

for (var i=0; i<=8; i++) {
  var recentSearch = localStorage.getItem(localStorage.length-i);
  $("#list-recents").append($("<h2>").text(recentSearch))
}

$(".submit-btn").on("click", function(event) {
  event.preventDefault();
  var searchedCity = searchInput.value;
  var newSavedItem = localStorage.length++
  if (searchedCity){
    localStorage.setItem(newSavedItem, searchedCity);
    apiPull();
  }
    
});

function apiPull(){
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+searchInput.value+"&appid="+APIKey+"&units=imperial";
  console.log(queryURL);
  fetch(queryURL)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
      console.log(data)
      city.text(data.name)
      var lat = (data.coord.lat);
      var lon = (data.coord.lon);


      var nextQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid="+APIKey+"&units=imperial"
      fetch(nextQueryURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
          console.log(data)
          currentTemp.text(data.current.temp)
          currentWind.text(data.current.wind_speed+" MPH")
          currentHumid.text(data.current.humidity+"%")
          currentUV.text(data.current.uvi)

          for (var i=1; i<=5; i++) {
            $("#forecastDate"+i).text(moment().add(i, 'days').format('L'))
            $("#forecastTemp"+i).text(data.daily[i].temp.day)
            $("#forecastWind"+i).text(data.daily[i].wind_speed+" MPH")
            $("#forecastHumid"+i).text(data.daily[i].humidity+"%")
            console.log("test")
          }

        });
    });
}
