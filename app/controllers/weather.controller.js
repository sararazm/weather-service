var MongoClient = require('mongodb').MongoClient;
var urls = "mongodb://localhost:27017/";
const cityModel = require("../models/city.model");

exports.create = (req, res) => {
    try {
        var globalCity;
        const https = require('https');
        const cityName = req.body.CityName;
        // console.log(JSON.stringify(req))
        console.log("city name= ", cityName);
        const apiKey = '72a236e3c559fda70fe2e726dba99d66';
        const unit = 'metric';
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '&units='
            + unit;
        https.get(url, function (response) {

            console.log("Response from mongodb= ", response.statusCode);
            response.on('data', function (data) {
                const weatherData = JSON.parse(data)
                const temp = weatherData.main.temp
                const weatherDescription = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'

                //  insert to database

                var city = cityModel.setCity(cityName, temp, imageURL);
                globalCity = city;
                console.log("globalCity = ", globalCity)
                console.log("City = ", city);
                MongoClient.connect(urls, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("weather");
                    dbo.collection("city").insertOne(city, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();

                    });

                });

            })

        })
        //console.log("it's working");
        //console.log(" globalcity = ",globalCity);
        res.write("City is inserted.");
        res.send();
    } catch (err) {
        console.log("Error", err.message);
    }

}

exports.findAll = (req, res) => {
    try {
        var cities;

        MongoClient.connect(urls, function (err, db) {
            if (err) throw err;
            var dbo = db.db("weather");

            dbo.collection("city").find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                cities = result;
                db.close();
                res.send(cities);

            });
        });
    } catch (err) {
        console.log("Error", err.message);
    }
}


exports.findOne = (req, res) => {
    const ObjectId = require('mongodb').ObjectId;
    const id = req.params.id;

    try {
        var city;
        var city_id = new ObjectId(id);

        MongoClient.connect(urls, function (err, db) {
            if (err) throw err;
            var dbo = db.db("weather");


            dbo.collection("city").findOne({ '_id': city_id }, function (err, result) {
                console.log("Id is :", id);
                if (err) throw err;
                console.log(result);
                city = result;
                db.close();
                res.send(city);

            });
        });
    } catch (err) {
        console.log("Error", err.message);
    }

}


exports.findByIdAndUpdate = (req, res) => {
    const ObjectId = require('mongodb').ObjectId;
    const id = req.params.id;
    const cityName = req.body.CityName;
    console.log("The new City Name is:", cityName, " And the ID is :", id)

    try {
        var city;
        var city_id = new ObjectId(id);

        MongoClient.connect(urls, function (err, db) {
            if (err) throw err;
            var dbo = db.db("weather");
           
           
            var newCity = { $set: {title: cityName} };
            console.log("My new city is : ", newCity)
            dbo.collection("city").updateOne({ _id: city_id } ,newCity, function (err, result){
                console.log("Id is :", id);
                if (err) throw err;
                console.log("After Error ")
                console.log(result);
                city = result;
                db.close();
            

            });
        });
    } catch (err) {
        console.log("Error", err.message);
    }

    res.send("One city is Updated.");

}

exports.delete = (req, res) => {

    const ObjectId = require('mongodb').ObjectId;
    const id = req.params.id;

    try {
        var city;
        var city_id = new ObjectId(id);

        MongoClient.connect(urls, function (err, db) {
            if (err) throw err;
            var dbo = db.db("weather");


            dbo.collection("city").findOneAndDelete({ '_id': city_id }, function (err, result) {
                console.log("Delete city by ID: ", id);
                if (err) throw err;
                console.log(result);
                city = result;
                db.close();
                res.send(city);

            });
        });
    } catch (err) {
        console.log("Error", err.message);
    }


    res.send("Delete city by ID is successfully done!");
}
exports.deleteAll = (req, res) => {
    try {
        var cities;

        MongoClient.connect(urls, function (err, db) {
            if (err) throw err;
            var dbo = db.db("weather");

            dbo.collection("city").deleteMany({} , function (err, result) {
                if (err) throw err;
                console.log(result);
                cities = result;
                db.close();
                res.send(cities);

            });
        });
    } catch (err) {
        console.log("Error", err.message);
    }
    res.send("All cities has are deleted.");
}
exports.findAllPublished = (req, res) => {
    res.send("findAllPublished is working");
}