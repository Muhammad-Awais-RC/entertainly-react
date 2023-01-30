import { Box, Chip } from "@mui/material";
import React, { useEffect } from "react";
import { fetchGenres } from "../utils/fetchFromAPI";

const Genres = ({
  genres,
  selectedGenres,
  setGenres,
  setSelectedGenres,
  type,
  setPage,
}) => {
  function fetchData() {
    fetchGenres(type).then((data) => {
      setGenres(data);
    });
  }

  function addHandler(genre) {
    setPage(1);
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((tmp) => tmp.id !== genre.id));
  }
  function removeHandler(genre) {
    setSelectedGenres(selectedGenres.filter((tmp) => tmp.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  }

  useEffect(() => {
    fetchData();
    return () => {
      setGenres([]);
    };
  }, []);

  return (
    <Box p="20px">
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            sx={{ m: "5px" }}
            clickable
            color="primary"
            onDelete={() => removeHandler(genre)}
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            sx={{ m: "5px" }}
            clickable
            onClick={() => addHandler(genre)}
          />
        ))}
    </Box>
  );
};

export default Genres;
