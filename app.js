const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res)
{
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function (req,res)
{

    const query = req.body.cityName;
    const apiKey = "27d3f4d2d7d106dfdb8ec8fc68bb9fa3";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response)
    {
        console.log(response.statusCode);

        response.on("data",function (data)
        {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;

            console.log(desc);

            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";


            res.write("<p>The weather is currently " + desc + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
            res.write("<img src=" + iconURL + " >");
            res.send();
        });
    });

});

app.listen(3000,()=> {
  console.log("Server started on port 3000");
});
