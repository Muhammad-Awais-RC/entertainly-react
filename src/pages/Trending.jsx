import { Badge, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import MovieCard from "../components/MovieCard";
import { fetchTrending } from "../utils/fetchFromAPI";

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

const Trending = () => {
  const [trendings, setTrendings] = useState();
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    fetchTrending(page).then((data) => setTrendings(data));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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
        Trending Today
      </Typography>
      <Box sx={styles.cardContainer}>
        {trendings &&
          trendings.map((trending) => (
            <MovieCard
              key={trending.id}
              id={trending.id}
              poster={trending.poster_path}
              title={trending.title || trending.name}
              date={trending.first_air_date || trending.release_date}
              mediaType={trending.media_type || trending.media_type}
              voteAvg={trending.vote_average}
            />
          ))}
      </Box>

      <CustomPagination setPage={setPage} />
    </Box>
  );
};

export default Trending;
