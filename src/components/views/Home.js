import React, { useState, useEffect, Fragment } from "react";
import { useRecoilState } from "recoil";
import { getAllMovies } from "../../firebase";
import MovieList from "../movies/MovieList";
import { globalMoviesState } from "../../index";
import { Link } from "react-router-dom";
const Home = (props) => {
  const [isMovieListReady, setMovieListReady] = useState(false);
  const [movieList, setMovieList] = useRecoilState(globalMoviesState);

  useEffect(() => {
    getAllMovies().then((res) => {
      setMovieList(res);

      setMovieListReady(true);
    });
  }, []);

  return (
    <div>
      <h1>This is home page</h1>
      <Link to="/dashboard">go to dashboard</Link>
      <h2>List of movies here</h2>
      {isMovieListReady ? (
        movieList && movieList.length > 0 ? (
          <MovieList
            listData={movieList ? movieList : null}
            filterCondition={{ adminApproved: true }}
          />
        ) : (
          <h3>No data to show</h3>
        )
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

Home.propTypes = {};

export default Home;
