import { Star } from "@mui/icons-material";
import { Badge, Box, CardContent, CardMedia, Typography } from "@mui/material";
import { img_300, unavailable } from "../utils/defaultData";
import CardModal from "./CardModal";

const styles = {
  img: {
    borderRadius: "10px",
  },
  subtittles: {
    display: "flex",
    justifyContent: "space-between",
    p: "3px 2px 0",
  },
};

const MovieCard = ({ id, poster, title, date, mediaType, voteAvg }) => {
  return (
    <CardModal mediaType={mediaType} id={id}>
      <Badge
        badgeContent={voteAvg.toFixed(1)}
        startIcon={<Star />}
        color={voteAvg > 7 ? "primary" : "secondary"}
        sx={{
          top: "10px",
          right: "30px",
          zIndex: 9,
          position: "absolute",
        }}
        overlap="circular"
      />

      <CardMedia
        component="img"
        src={poster ? img_300 + "/" + poster : unavailable}
        alt={title}
        sx={styles.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>

        <Box sx={styles.subtittles}>
          <Typography variant="body2" color="text.secondary">
            {mediaType === "movie" ? "Movie" : "Tv Series"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </CardContent>
    </CardModal>
  );
};

export default MovieCard;
