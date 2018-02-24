var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var axios = require('axios')
var db = require('./database')
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.get('/search', function(req, res) {
    //get the search genre     
    console.log(req.params)

    // use this endpoint to search for movies by genres, you will need an API key

    //https://developers.themoviedb.org/3/discover/movie-discover
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b23471b38cebc297f8072ffddf620b40`)
    	 .then((resp) =>{
    	 	console.log(resp.data.results)
    	 	res.send(resp.data.results)
    	 })

    //and sort them by horrible votes using the search parameters in the API
})

app.get('/genres', function(req, res) {
    //make an axios request to get the list of official genres

    // from this endpoint https://developers.themoviedb.org/3/genres/get-movie-list which needs your api ke

    axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=b23471b38cebc297f8072ffddf620b40&language=en-US")
         .then((resp) =>{
         	res.send(resp.data.genres)
         })
})

app.get('/favs', function(req,res){
	db.query(`SELECT * FROM favorite`, (err,data) =>{
		if(err) console.log(err)
		res.send(data)
	})
})

app.post('/save', function(req, res) {
	console.log("req", req)
	var movie = req.body.movie
	db.query(`INSERT INTO favorite (title, rating, releasedate) VALUES ("${movie.title}", "${movie.average_rating}", "${movie.release_date}")`, (err,date) =>{
		if(err) console.log(err)
		res.end()
	})
})

app.post('/delete', function(req, res) {
	var movie = req.body.movie
	db.query(`DELETE FROM favorite WHERE title="${movie.title}"`)
	res.end()
})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});