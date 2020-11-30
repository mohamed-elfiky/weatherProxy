const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let weatherSchema = new Schema({
    location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
    city_name: {type: String, required: true},
    country_name: {type: String, required: true},
    weather_description: {type: String, required: true},
    temp: {type: Number, required: true},
    pressure: {type: Number, required: true},
    wind_speed: {type: Number, required: true},
}, {timestamps: true});

weatherSchema.index({createdAt:1}, {expireAfterSeconds: 7200 });
weatherSchema.index({location: "2dsphere"});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
module.exports.getWeather = async (lat, lon) => { 
   const weather = await Weather.find({
            location:{
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lat,lon]
                    },
                    $maxDistance:10000,
                    $minDistance:0
                }
            }
        });
    return weather;
}
module.exports.createWeather = async (data, lat, lon) => {
     const weather = new Weather  ({
            location: {
                type: "Point",
                coordinates: [lat,lon]
            },
            city_name: data["name"],
            country_name: data["sys"]["country"],
            weather_description: data["weather"][0]["description"],
            temp: data["main"]["temp"],
            pressure: data["main"]["pressure"],
            wind_speed: data["wind"]["speed"]
        })
    let savedWeather = await weather.save();
    return savedWeather;
}

