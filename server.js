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
const weatherHandler = require('./modules/weather.js');
const movieHandler = require('./modules/movie.js');




// http://localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})

// http://localhost:3001/test
server.get('/test', (req, res) => {
    res.send('test')
})




// http://localhost:3001/weather?searchQuery=Amman

server.get('/weather',weatherHandler)

      
    server.get('*', (req, res) => { // * means all, so for errors we should put it in last
        if (res.status(400))
            res.send('Bad Request');
        else if (res.status(404))
            res.send('Not Found');
    })


    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`)
    })

