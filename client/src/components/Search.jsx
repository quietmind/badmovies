import React from 'react';
var axios = require('axios')
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectValue: 0
    }
    this.getGenres = this.getGenres.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.getGenres()
  }

  handleChange(e){
    this.setState({selectValue: e.target.value}, () => console.log(this.state.selectValue));
  }


  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
         .then((genres) =>{
          this.setState({
            genres: genres.data
          })
         })
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select onChange={this.handleChange}>
{ 
      this.state.genres.map((genre, i ) => <option value={genre.id}>{genre.name}</option>)
}
      </select>
        <br/><br/>

        <button onClick={ () => this.props.search(this.state.selectValue)}>Search</button>

      </div>)
  }
}

export default Search
