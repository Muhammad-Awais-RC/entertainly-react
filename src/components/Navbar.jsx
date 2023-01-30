import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Movie, Search, Tv, Whatshot } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ROUTES = ["/", "/movies", "/series", "search"];

const styles = {
  container: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    boxShadow: "0 0 4px  #f70d1a",
    background: "#121212",
    opacity: "0.9",
    zIndex: 100,
    ".Mui-selected": {
      // color: "#f70d1a",
    },
  },
  icon: {
    ":selected": {
      // color: "#FF0000",
    },
  },
};

export default function Navbar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES[value]);
  }, [value, navigate]);

  return (
    <Box sx={styles.container}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Trending"
          icon={<Whatshot sx={styles.icon} />}
        />
        <BottomNavigationAction
          label="Movies"
          icon={<Movie sx={styles.icon} />}
        />
        <BottomNavigationAction
          label="Tv Series"
          icon={<Tv sx={styles.icon} />}
        />
        <BottomNavigationAction
          label="Search"
          icon={<Search sx={styles.icon} />}
        />
      </BottomNavigation>
    </Box>
  );
}
