import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Search as SearchIcon } from "@mui/icons-material";
import { fetchSearchResults } from "../utils/fetchFromAPI";
import CustomPagination from "../components/CustomPagination";
import MovieCard from "../components/MovieCard";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },

  inputContainer: {
    display: "flex",
    width: "100%",
    gap: "10px",
    m: "15px 0",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  input: {
    width: "100%",
    "& label": {
      fontSize: "20px",
    },
  },
  tabs: {
    m: "12px",
    width: "100%",
  },
  tab: {
    width: "50% !important",
    color: "#fff",
  },
};

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState([]);

  const fetchData = () => {
    fetchSearchResults(type, page, searchTerm).then((data) => {
      setContent(data.results);
      setNumOfPages(data.total_pages);
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type]);

  return (
    <Box sx={styles.container}>
      <Box style={styles.inputContainer}>
        <TextField
          label="Search..."
          flex={1}
          variant="filled"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={styles.input}
        />
        <Button variant="outlined" onClick={fetchData}>
          {" "}
          <SearchIcon />{" "}
        </Button>
      </Box>

      <Tabs
        value={type}
        indicatorColor="primary"
        onChange={(e, value) => {
          setType(value);
          setPage(1);
        }}
        centered
        sx={styles.tabs}
      >
        <Tab sx={styles.tab} label="Search Movies" />
        <Tab sx={styles.tab} label="Search TV Series" />
      </Tabs>

      <Box sx={styles.cardContainer}>
        {content &&
          content.map((c) => (
            <MovieCard
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              mediaType={type ? "tv" : "movie"}
              voteAvg={c.vote_average}
            />
          ))}
      </Box>

      {searchTerm &&
        !content &&
        (type ? <h1>No Series Found</h1> : <h1>No Movie Found</h1>)}

      {numOfPages > 1 && <CustomPagination setPage={setPage} />}
    </Box>
  );
};

export default Search;
