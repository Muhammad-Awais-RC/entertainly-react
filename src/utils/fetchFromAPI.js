import axios from "axios";
const KEY = `cecf1f71e85cbaf0191ee4ba2db49343`;
const TRENDING_URL = `
https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`;

export const fetchTrending = async (page) => {
  const { data } = await axios.get(TRENDING_URL + `&page=${page}`);

  return data.results;
};

export const fetchMovies = async (page, genreforURL) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
  );

  return data;
};

export const fetchSeries = async (page, genreforURL) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
  );

  return data;
};

export const fetchGenres = async (type) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/${type}/list?api_key=${KEY}&language=en-US`
  );

  return data.genres;
};

export const fetchSearchResults = async (type, page, word) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/${
      type ? "tv" : "movie"
    }?api_key=${KEY}&language=en-US&query=${word}&page=${page}&include_adult=false`
  );

  return data;
};

export const fetchByID = async (type, id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${KEY}&language=en-US`
  );

  return data;
};

export const fetchVideo = async (type, id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${KEY}&language=en-US`
  );

  return data;
};

export const fetchCredits = async (type, id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${KEY}&language=en-US`
  );

  return data;
};
