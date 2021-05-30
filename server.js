'use strict';
//All requires should be on the top
require('dotenv').config(); // npm i dotenv
const express = require('express'); //when you require it you need to install  (npm i express)
const weatherData = require('./data/weather.json')
const cors = require('cors'); //understand it more
const axios = require('axios');
const PORT = process.env.PORT // <=> const PORT = 3001;
const server = express();
server.use(cors()); //  make my server opened for anyone
const weatherKey = process.env.WEATHER_API_KEY;
const movieKey = process.env.MOVIE_API_KEY;



// http://localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})

// http://localhost:3001/test
server.get('/test', (req, res) => {
    res.send('test')
})

class Forecast {
    constructor(item) {
        this.date = item.valid_date; //As a JSON-File
        this.description = item.weather.description;
    }
}
class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes = item.average_votes;
        this.total_votes = item.total_votes;
        this.image_url = item.image_url;
        this.popularity = item.popularity;
        this.released_on = item.released_on;
    }
}

// Using each data point from the static data of the city that the user searched, 
// create an array of `Forecast` objects, one for each day.
//  Do the necessary data wrangling to ensure the objects you create contain the information
//   as required for correct client rendering. See the sample response.
// Send the full array back to the client who requested data from the `weather` endpoint

// http://localhost:3001/weather?searchQuery=Amman

server.get('/weather', weatherHandler)
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
/* Start Movie Part */
server.get('/movies', movieHandler)
function movieHandler(req, res) {
    const themoviedbURL = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${req.query.searchQuery}`;
    axios
        .get(themoviedbURL)
        .then(result => {
            let movietArr = []
            movietArr.push(result.data.data.map(item => {
                return new Movie(item);
            }))
            res.send(movietArr);
        })
        .catch(error => {
            res.status(500).send(`error in getting the movies data ==> ${error}`);
        }
        )
}
/* Finish Movie Part */
server.get('*', (req, res) => { // * means all, so for errors we should put it in last
    if (res.status(400))
        res.send('Bad Request');
    else if (res.status(404))
        res.send('Not Found');
})


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

