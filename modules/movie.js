const axios = require('axios');
const movieKey = process.env.MOVIE_API_KEY;



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

module.exports = movieHandler;