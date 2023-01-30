import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import Genres from "../components/Genres";
import MovieCard from "../components/MovieCard";
import useGenre from "../hooks/useGenre";
import { fetchMovies } from "../utils/fetchFromAPI";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },

  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",

    tittle: {
      textTransform: "uppercase",
      color: "red",
    },
  },
};

const Movies = () => {
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreforURL = useGenre(selectedGenres);

  function fetchData() {
    fetchMovies(page, genreforURL).then((data) => {
      setMovies(data.results);
      setNumOfPages(data.total_pages);
    });
  }

  function pageSetter() {
    setPage(1);
  }

  useEffect(() => {
    fetchData();
  }, [page, genreforURL]);

  return (
    <Box sx={styles.container}>
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase",
          color: "#FF0000",
          fontSize: {
            xs: " 4vw ",
            md: "2vw",
          },
          fontWeight: "bold",
        }}
      >
        Movies
      </Typography>

      <Genres
        type="movie"
        genres={genres}
        selectedGenres={selectedGenres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />

      <Box sx={styles.cardContainer}>
        {movies &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_year_date || movie.release_date}
              mediaType={"movie"}
              voteAvg={movie.vote_average}
            />
          ))}
      </Box>

      {numOfPages > 1 && (
        <CustomPagination
          setPage={setPage}
          page={page}
          numberOfPages={numOfPages}
        />
      )}
    </Box>
  );
};

export default Movies;
