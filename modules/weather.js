const axios = require('axios');
const weatherKey = process.env.WEATHER_API_KEY;


function weatherHandler(req, res) {
    // console.log(req.query)
    // let cityData = weatherData.find(item => {
    //     if (req.query.searchQuery.toLowerCase() == item.city_name.toLowerCase()
    // && req.query.lat== item.lat 
    // && req.query.lon ==  item.lon
    //     )
    //         return item;
    // })
    // console.log(cityData);

    const weatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${req.query.searchQuery}&key=${weatherKey}`;
    axios
        .get(weatherbitURL)
        .then(result => {
            let forecastArr = []
            // forecastArr.push(cityData.data.map(item => {
            forecastArr.push(result.data.data.map(item => {
                return new Forecast(item);
            }))
            res.send(forecastArr);
        })
        .catch(error => {
            res.status(500).send(`error in getting the weather data ==> ${error}`);
        }
        )
}

class Forecast {
    constructor(item) {
        this.date = item.valid_date; //As a JSON-File
        this.description = item.weather.description;
    }
}
module.exports = weatherHandler;