import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { fetchByID, fetchVideo } from "../utils/fetchFromAPI";
import Carousel from "./Carousel";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../utils/defaultData";
import { YouTube } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: { xs: "90%", sm: "80%" },
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  // display: "flex",

  // flexDirection: { sx: "column", md: "row" },
  // justifyContent: "space-between",
  // overflow: "auto",
};

const styles = {
  container: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    gap: { xs: "20px" },
    overflowY: "scroll",
    scrollbarWidth: "none",
  },

  card: {
    width: { xs: "46%", sm: "200px " },
    display: "flex",
    flexDirection: "column",
    p: "8px",
    m: "5px 0",
    borderRadius: "15px",
    position: "relative",

    "&:hover": {
      background: "#333",
      scale: "1.02",
    },
  },

  imgL: {
    objectFit: "contain",
    borderRadius: "10px",
    // width: "auto",
    display: { xs: "flex", md: "none" },
  },
  imgP: {
    objectFit: "contain",
    borderRadius: "10px",
    display: { xs: "none", md: "flex" },
  },

  about: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: { xs: "100%", md: "65%" },
    gap: { xs: "20px", sm: "10px", md: "5px" },
  },
  discription: {
    display: "flex",
    maxHeight: "36%",
    minHeight: "100px",
    overflowY: "auto",
    padding: "15px",
    borderRadius: "20px",
    scrollbarWidth: "thin",
    boxShadow: " inset 0 0 5px #FF0000",
    textAlign: "justify",
  },
  title: {
    fontSize: { xs: "24px" },
    alignSelf: "center",
  },
  tagline: {
    alignSelf: "center",
  },
};

export default function CardModal({ children, id, mediaType }) {
  const [open, setOpen] = useState(false);

  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = () => {
    fetchByID(mediaType, id).then((data) => setContent(data));

    fetchVideo(mediaType, id).then((data) => setVideo(data.results[0]?.key));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card sx={styles.card} onClick={handleOpen}>
        {children}
      </Card>

      {/* <Box >{children}</Box> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <Box sx={styles.container}>
                <CardMedia
                  component="img"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  sx={styles.imgP}
                />

                <CardMedia
                  component="img"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  sx={styles.imgL}
                />

                <Box sx={styles.about}>
                  <Typography variant="h4" sx={styles.title}>
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </Typography>
                  <Typography variant="subtitle1" sx={styles.tagline}>
                    {content.tagline && (
                      <i className="tagline">{content.tagline}</i>
                    )}
                  </Typography>

                  <Typography variant="subtitle2" sx={styles.discription}>
                    {content.overview}
                  </Typography>

                  <Box>
                    <Carousel mediaType={mediaType} id={id} />
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    sx={{ m: "20px 0 0 " }}
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
