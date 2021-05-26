'use strict';
//All requires should be on the top
const express = require('express'); //when you require it you need to install  (npm i express)
require('dotenv').config(); // npm i dotenv
const weatherData = require('./data/weather.json')
const cors = require('cors'); //understand it more

const server = express();
server.use(cors()); //  make my server opened for anyone

const PORT = process.env.PORT; // <=> const PORT = 3001;


// http://localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})

// http://localhost:3001/weather?(values)
class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}
server.get('/weather', (req, res) => {
    console.log(req.query)
    let cityData = weatherData.results.find(item => {
        if (item.city_name.toLowerCase() == req.query.searchQuery.toLowerCase()
            && item.lat.toLowerCase() == req.query.lat.toLowerCase()
            && item.lon.toLowerCase() == req.query.lon.toLowerCase())
            return item
    })
    let forecastArr=[];
    res.send(cityData)
})

// Using each data point from the static data of the city that the user searched, 
// create an array of `Forecast` objects, one for each day.
//  Do the necessary data wrangling to ensure the objects you create contain the information
//   as required for correct client rendering. See the sample response.
// Send the full array back to the client who requested data from the `weather` endpoint.
server.get('*', (req, res) => {
    if(res.status(400))
    res.send('Bad Request');
    else if(res.status(404))
    res.send('Not Found');
    else if(res.status(500))
    res.send('Internal Server Error');
})


server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})