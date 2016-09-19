$(document).ready(function() {
  var unitLabel = 'F';
  var appid = "&APPID=3eee7c2c63f240642059ae1667f24c87";
  getLocation();

  function getLocation() {
    $.get("http://ipinfo.io", function(location) {
      console.log(location);
      $('#location')
        .append(location.city + ", " + location.region)
      var units = getUnits(location.country);
      getWeather(location.loc, units);
      return weather;
    }, "jsonp");
  }

  function getWeather(loc, units) {
    lat = loc.split(",")[0]
    lon = loc.split(",")[1]

    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units + appid;

    console.log(weatherApiUrl);

    $.get(weatherApiUrl, function(weather) {
        var temp = Math.round(weather.main.temp);
        var tempOriginal = temp;
        var unitLabel;
        $('#temp').text(temp);
        if (units === "imperial") {
          unitLabel = "F";
        } else {
          unitLabel = "C";
        }
        var unitLabelOriginal = unitLabel;
        $('#units').text(unitLabel);
        $("#units").on('click', function() {
            if (unitLabel === "F") {
              if (unitLabelOriginal === 'C') {
                unitLabel = "C";
                $('#temp').text(tempOriginal);
                $('#units').text(unitLabel);
              } else {
              unitLabel = "C";
              temp = Math.round((tempOriginal - 32) * (5 / 9));
              $('#temp').text(temp);
              $('#units').text(unitLabel);
            }
          } else {
            if (unitLabelOriginal === 'F') {
              unitLabel = "F";
              $('#temp').text(tempOriginal);
              $('#units').text(unitLabel);
            } else {
              unitLabel = "F";
              temp = Math.round((tempOriginal * (9 / 5)) + 32);
              $('#temp').text(temp);
              $('#units').text(unitLabel);
            }
          }
          console.log(weather);
        }); $('#icon').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
      var description = weather.weather[0].main; 
      if (description === "Rain") {        document.getElementById('background').style.backgroundImage = "url('https://static.pexels.com/photos/7467/pexels-photo-large.jpeg')";
      } else if (description === "Clouds") {
        document.getElementById('background').style.backgroundImage = "url('https://static.pexels.com/photos/55787/pexels-photo-55787-large.jpeg')";
        document.getElementById('background').style.backgroundImage = "url('https://static.pexels.com/photos/55787/pexels-photo-55787-large.jpeg')";
      } else if (description === "Mist") {
        document.getElementById('background').style.backgroundImage = "url('https://static.pexels.com/photos/1780/landscape-nature-clouds-cloudy-large.jpg')";
      } else if (description === "Clear") {
        document.getElementById('background').style.backgroundImage = "url('http://i1268.photobucket.com/albums/jj579/joey_murphy7385/clearSkies_zpsk2ngxijo.jpg')";
      } else {
        document.getElementById('background').style.backgroundImage = "url('background-image', url('#')";
      }

      $('#postal').append(postal);
    }, "jsonp");
};

function getUnits(country) {
  var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];
  if (imperialCountries.indexOf(country) === -1) {
    var units = 'metric';
  } else {
    units = 'imperial';
  }
  console.log(country, units);
  return units;
}
});
