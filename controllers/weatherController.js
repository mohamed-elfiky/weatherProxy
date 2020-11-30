// import packages
const fetch = require('node-fetch');
require('dotenv').config();
const Weather = require('../models/weather');
const weatherService = require('../services/weatherService');

exports.save_data = async(req, res, next) => {
    try{
        const latlon = req.params.latlon.split(',');
        const lat = latlon[0];
        const lon = latlon[1];
        const result = await Weather.getWeather(lat, lon);
        if(result.length){
            res.json(result[0]);
        } else {
            //get data via api
            const data = await weatherService.getWeatherData(lat, lon);
            //persist it
            let weather = await Weather.createWeather(data, lat, lon);
            res.json(weather);
        }
    } catch (err) {
        next(err);
    }
} 

