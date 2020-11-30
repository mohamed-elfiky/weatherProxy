Weather = require('../models/weather');
require('dotenv').config();
const fetch = require('node-fetch');

module.exports.getWeatherData =  async function( lat, lon){
        const api_key = process.env.API_KEY;
        const respone = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`);
        const data = await respone.json();
        if( data["cod"] != 200 ){
            throw new Error(data["message"]);
        }
        return data;
}

