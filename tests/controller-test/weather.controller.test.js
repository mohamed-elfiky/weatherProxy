const chai = require("chai");
const sinon = require("sinon");
const weatherModel = require("../../models/weather");
const expect = chai.expect;
const faker = require("faker");
const weatherService = require("../../services/weatherService");
const weatherController = require("../../controllers/weatherController");


describe("weatherController", function () {
    this.timeout(10000) // all tests in this suite get 10 seconds before timeout
    describe("save_data controller method ", function(){
        let res, req, weatherServiceSpy, sandbox, savingWeather;
        beforeEach(() => {
            req = { params: { latlon: "39,31" } };
            res = { 
                json: function() {},
                send: function() {}
                };
            weatherServiceSpy = sinon.stub(weatherService, 'getWeatherData');
            savingWeather = sinon.stub(weatherModel, 'createWeather');
        });

        describe("if data does not exist", function(){
            beforeEach( () => {const stub = sinon.stub(weatherModel, 'getWeather').returns([])});
            it("it should call the the weather service to get the data ", async function(){
                const response = await weatherController.save_data(req, res);
                expect(weatherServiceSpy.calledOnce).to.be.true;
            });

            it("it should persist the data", async function(){
                const response = await weatherController.save_data(req, res);
                expect(savingWeather.calledOnce).to.be.true;
            });

            it("it should render json data", async function(){
                const mock = sinon.mock(res);
                mock.expects("json").once();
                const response = await weatherController.save_data(req, res);
                mock.verify();
            });
        })

        describe("if data does  exist", function(){
            beforeEach( () => {const stub = sinon.stub(weatherModel, 'getWeather').returns([{blah: "blah"}])});

            it(" it shouldnt call weatherService", async function(){
                const response = await weatherController.save_data(req, res);
                expect(weatherServiceSpy.calledOnce).to.be.false;
            });

            it("it should render json data", async function(){
                const mock = sinon.mock(res);
                mock.expects("json").once();
                const response = await weatherController.save_data(req, res);
                mock.verify();
            });
        });
        afterEach(()=>{
            sinon.reset();
            sinon.restore();
        });
    });

    
});

