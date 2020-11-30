const expect = require('chai').expect;
const Weather = require("../../models/weather");
const sinon = require('sinon');
describe("weather model", function () {
    it('should be invalid if empty', function(done) {
        let weather = new Weather({})
        weather.validate(function(err){
            expect(err.errors).to.exist;
            done(); 
        });     
    });
    it('should be invalid if location.cooridnates is empty', function(done) {
        let weather = new Weather({
            location: {
                type: "Point",
                //coordinates: [lat,lon]
            },
            city_name: "Cairo",
            country_name: "EG",
            weather_description: "Windy",
            temp: 19,
            pressure: 111,
            wind_speed: 111
        });
        weather.validate(function(err){
            expect(err.errors).to.exist;
            done(); 
        });     
    });

});

