const axios = require('axios');
const weatherKey = process.env.WEATHER_API_KEY;
let cache = require('./cache.js');

function weatherHandler(req, res) {
    const city = req.query.searchQuery
    const weatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${weatherKey}`;

    if (cache[city] !== undefined) {
        console.log('Cache hit');
        res.send(cache[city])
    }
    else {
        console.log('Cache miss');
        axios
            .get(weatherbitURL)
            .then(result => {
                let forecastArr = []
                forecastArr.push(result.data.data.map(item => {
                    return new Forecast(item);
                }))
                // res.send(forecastArr);
                cache[req.query.searchQuery] = forecastArr;
                res.status(200).send(forecastArr);

            })
            .catch(error => {
                res.status(500).send(`error in getting the weather data ==> ${error}`);
            }
            )
    }
}


class Forecast {
    constructor(item) {
        this.date = item.valid_date; //As a JSON-File
        this.description = item.weather.description;
    }
}
module.exports = weatherHandler;