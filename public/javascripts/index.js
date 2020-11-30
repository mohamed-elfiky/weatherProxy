$(document).ready(function() {
  // geolocation enabled

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showcityname);

    function showcityname(position) {
      let lat = position.coords.latitude;
      let longit = position.coords.longitude;
      let latitude_text = document.getElementById("latitude-val");
      let longit_text = document.getElementById("longit-val");
      let city_name;
      let temp;
      let pressure;
      let wind_speed;
      let country_name;
      let weather_description;
      longit_text.innerHTML = "Longitude is " + longit;
      latitude_text.innerHTML = "Latitude is " + lat;
      const api_url = `weather/${lat},${longit}`;
      $.post(api_url, function(data) {
        city_name = data["city_name"];
        country_name = data["country_name"];
        weather_description = data["weather_description"];
        temp = data["temp"];
        pressure = data["pressure"];
        wind_speed = data["wind_speed"];
        $("#cityname").html(city_name + " &#40;" + country_name + "&#41; " + "has " + weather_description);
        $(".temp").html(temp);
        $(".pressure").html(pressure + " mBar");
        $(".wind-spd").html(wind_speed + " m/s");

      })

    }

  }

})