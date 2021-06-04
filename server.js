'use strict';
//All requires should be on the top
require('dotenv').config(); // npm i dotenv
const express = require('express'); //when you require it you need to install  (npm i express)
// const weatherData = require('./data/weather.json')
const cors = require('cors'); //understand it more
const axios = require('axios');
const PORT = process.env.PORT // <=> const PORT = 3001;
const server = express();
server.use(cors()); //  make my server opened for anyone
const movieKey = process.env.MOVIE_API_KEY;
const weatherHandler = require('./modules/weather.js');



// http://localhost:3001/
server.get('/', (req, res) => {
    res.send('home route')
})

// http://localhost:3001/test
server.get('/test', (req, res) => {
    res.send('test')
})


class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes = item.average_votes;
        this.total_votes = item.total_votes;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.released_on;
    }
}


/* Start Movie Part */
function movieHandler(req, res) {
    let themoviedbURL = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${req.query.query}`;
    axios
        .get(themoviedbURL).then(result => {
            let movieArr = result.data.results.map(item => {
                return new Movie(item);
            })
            res.send(movieArr);
        })
        .catch(error => {
            res.status(500).send(`error in getting the movies data ==> ${error}`);
        })
}
server.get('/weather',weatherHandler)

server.get('/movie', movieHandler)

/* Finish Movie Part */
server.get('*', (req, res) => { // * means all, so for errors we should put it in last
    if (res.status(400))
        res.send('Bad Request');
    else if (res.status(404))
        res.send('Not Found');
})

      
    server.get('*', (req, res) => { // * means all, so for errors we should put it in last
        if (res.status(400))
            res.send('Bad Request');
        else if (res.status(404))
            res.send('Not Found');
    })


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

