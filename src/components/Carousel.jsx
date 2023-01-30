import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../utils/defaultData";
import { fetchCredits } from "../utils/fetchFromAPI";

const handleDragStart = (e) => e.preventDefault();

const styles = {
  container: {
    // height: "300px",
  },
  items: {
    display: "flex",
    flexDirection: "column",
    objectFit: "contain",
    p: "10px",
  },
  img: {
    width: "120px",
    borderRadius: "10px",
    margin: "5px",
  },
};

const Carousel = ({ mediaType, id }) => {
  const [credits, setCredits] = useState([]);

  function fetchData() {
    fetchCredits(mediaType, id).then((data) => setCredits(data.cast));
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!credits) return <CircularProgress />;

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 5,
    },
  };

  const items = credits?.map((c) => (
    <Box sx={styles.item}>
      <img
        style={styles.img}
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDrag={handleDragStart}
      />
      <Typography variant="subtitle1" sx={styles.title}>
        {" "}
        {c?.name}{" "}
      </Typography>
    </Box>
  ));

  return (
    <AliceCarousel
      autoHeight
      sx={styles.container}
      responsive={responsive}
      autoPlay
      infinite
      mouseTracking
      items={items}
      disableDotsControls
      disableButtonsControls
    />
  );
};

export default Carousel;
