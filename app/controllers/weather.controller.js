// const { query } = require("express");
// const db = require("../models");
// const Weather = db.weather;

exports.create = (req, res) => {
    try {
        const https = require('https');
        const cityName = req.body.CityName;
        console.log("city name= ",cityName);
        const apiKey = '72a236e3c559fda70fe2e726dba99d66';
        const unit = 'metric';
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '&units='
            + unit;
        https.get(url, function (response) {
            console.log("Response from mongodb= ",response.statusCode);

            response.on('data', function (data) {
                const weatherData = JSON.parse(data)
                const temp = Math.round(weatherData.main.temp)
                const weatherDescription = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
                //console.log("temperature is ", temp);

                // 1* insert to database
                var MongoClient = require('mongodb').MongoClient;
                var url = "mongodb://localhost:27017/";
                var city = { title: cityName, temp: temp, image: imageURL };
                console.log(city);
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("weather");

                    dbo.collection("city").insertOne(city, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                        // 2* redirect to weather page

                    });
                });
                //res.render('weather', { data: city });

        //     });
        //     if (!req.body.query) {
        //         res.status(400).send({ message: "Content can not be empty!" });
        //         return;
        //     }
       })



        // if (!req.body.query) {
        //     res.status(400).send({ message: "Content can not be empty!" });
        //     return;
        //   }

        //   const weather = new Weather({
        //       city: req.body.cityName
        //   })

        // weather 
        // .save(weather)
        // .then(data => {
        //     res.send(data);
        // })
        // .catch(err => {
        //     res.send(data);
       
            })

        res.send("Create weather is done!");

    } catch (err) {
        console.log("Error", err.message);
    }

}
exports.findAll = (req, res) => {
    res.send("Find All is working");
}
exports.findOne = (req, res) => {
    const id = req.params.id;
    res.send("Find weather by id: " + id);
}
exports.update = (req, res) => {
    res.send("Update is working");
}
exports.findByIdAndUpdate = (req, res) => {
    res.send("Find By Id And Update is working");
}
exports.delete = (req, res) => {
    res.send("delete is working");
}
exports.deleteAll = (req, res) => {
    res.send("deleteAll is working");
}
exports.update = (req, res) => {
    res.send("Update is working");
}
exports.findAllPublished = (req, res) => {
    res.send("findAllPublished is working");
}