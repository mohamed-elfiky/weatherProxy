const chai = require("chai");
const sinon = require("sinon");
const weatherModel = require("../../models/weather");
const expect = chai.expect;
const faker = require("faker");
const weatherService = require("../../services/weatherService");
const nock =  require("nock");
require('dotenv').config();
describe("weather service", function () {
    this.timeout(10000) // all tests in this suite get 10 seconds before timeout
    let lat, lon, valid_response, invalid_response, fetch;
        before(() => {
            valid_response = { coord: { lon: 31, lat: 39 },
                            weather:
                            [ { id: 804,
                                main: 'Clouds',
                                description: 'overcast clouds',
                                icon: '04n' } ],
                            base: 'stations',
                            main:
                            { temp: 1.48,
                                feels_like: -1.34,
                                temp_min: 1.48,
                                temp_max: 1.48,
                                pressure: 1020,
                                humidity: 78,
                                sea_level: 1020,
                                grnd_level: 892 },
                            visibility: 10000,
                            wind: { speed: 0.81, deg: 78 },
                            clouds: { all: 100 },
                            dt: 1606689618,
                            sys: { country: 'TR', sunrise: 1606712119, sunset: 1606746876 },
                            timezone: 10800,
                            id: 321814,
                            name: 'Bayat',
                            cod: 200 };
            invalid_response = { cod: 401,
                                 message:
                                'Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.' };
            lat = 39;
            lon = 31;
            fetch = sinon.stub(fetch);
            api_key = process.env.API_KEY;
        });
    describe("if the api key is valid", function(){
        it("it gets status code 200 and no error is raised ", async function(){
            nock("http://api.openweathermap.org")
            .get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .reply(200, valid_response);
            const data = await weatherService.getWeatherData(lat, lon);
            expect(data["cod"]).to.equal(200);
        });
        
    });
    describe("invalid api key", function(){
        it("raises an error", async function(){
            nock("http://api.openweathermap.org")
            .get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .reply(401, invalid_response);
             try{
                await weatherService.getWeatherData(lat, lon);
             } catch(error) {
                 expect(error).not.to.be.null;
             }
        })
    })
    
});