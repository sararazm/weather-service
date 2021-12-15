const express = require("express");
const cors = require("cors");
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
var corsOptions = {
    origin: "http://localhost:8081/"
};

app.set('view engine', 'ejs');
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));



require("./app/routes/weather.routes")(app);

app.listen(6060, () => {
    console.log(`Server is running on port 6060.`);
});