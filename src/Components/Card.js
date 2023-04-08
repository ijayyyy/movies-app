import React from "react";

function Card(movie) {
  let imgPath = "https://image.tmdb.org/t/p/w500";
  return (
    <div>
      <div className="movie">
        <img
          src={imgPath + movie.info.poster_path}
          className="poster"
          alt="movie"
        ></img>
        <div className="movie-info">
          <div className="box">
            <h4 className="title">{movie.info.title}</h4>
            <p className="ratings">{movie.info.vote_average}</p>
          </div>
          <div className="review">
            <h2>overview</h2>
            {movie.info.overview}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
