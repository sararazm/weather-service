module.exports = app => {
    const weather = require("../controllers/weather.controller.js");

    var router = require("express").Router();

    router.post("/", weather.create);
    router.get("/", weather.findAll);
    router.put("/:id", weather.findByIdAndUpdate);
    router.get("/:id", weather.findOne);
    //router.put("/:id", weather.update);
    router.delete("/:id", weather.delete);
    router.delete("/", weather.deleteAll);
    app.use('/api/weather', router);
};