const useGenre = (genres) => {
  if (!genres.length) return "";

  const genresIds = genres.map((genre) => genre.id);

  return genresIds.join(",");
};

export default useGenre;
