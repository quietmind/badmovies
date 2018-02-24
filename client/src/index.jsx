import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
var axios = require('axios')
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [0],
      favorites: [],
      showFaves: false
  	}

    this.getMovies = this.getMovies.bind(this)
    // whats missing?
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.getSavedMovies = this.getSavedMovies.bind(this)
  }

  componentDidMount(){
    this.getMovies();
    this.getSavedMovies();
  }

  getMovies(genreID) {
    //make an axios request to your server on the GET SEARCH endpoint
   axios.get('/search', { params : {
      language: 'en-US',
      sort_by: 'popularity.acs',
      with_genre: genreID
    }}).then((res) =>{
      this.setState({movies: res.data}, () => console.log("getting movies", this.state.movies))
    })
  }

  getSavedMovies(){
    axios.get('/favs')
         .then((res) => {
          console.log('faaav', res)
          this.setState({favorites: res.data}, () => console.log(this.state.favorites))
         })
  }


  saveMovie(movie) {
    //same as above but do something diff
    console.log(movie)
    axios.post('/save', {movie: movie})
         .then( () => {
          this.getSavedMovies()
        })
    
  }

  deleteMovie(movie) {
    //same as above but do something dif
    axios.post('/delete', {movie: movie})
         .then(() =>{
          this.getSavedMovies()
         })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      
      <div className="main">
        <Search search={this.getMovies}swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} saveMovie={this.state.showFaves ? this.deleteMovie : this.saveMovie}showFaves={this.state.showFaves}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));