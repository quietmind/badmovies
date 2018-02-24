import React from "react";

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }
  //

  //    Make an onclick for each list item. If the movies shown is the search results,
  //.   add it to the db (do it in the main app, and passs down the function).

  //.   If youre currently showing the fave list, delete the movie instead
  //.   you can tell which list it is based on whether the prop "showFaves" is false (search results) or true (fave list)

  //
  render() {
    return (
      <ul className="movies">
{
        this.props.movies.map((movie, i) => {
          return <li onClick={() => this.props.saveMovie(movie)}className="movie_item">
            <img src={movie.poster_path} />
            <div className="movie_description">
              <h2>{movie.title}</h2>
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Year</span>
                  <span>{movie.release_date}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span>{movie.average_rating}</span>
                </div>
              </section>
            </div>
          </li>
        })
}
      </ul>
    );
  }
}

export default Movies;
