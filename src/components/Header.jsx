import { AppBar } from "@mui/material";

const styles = {
  appbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#121212",
    color: "#FF0000",
    fontSize: {
      xs: "7vw",
      sm: "5.5vw",
      md: "4.5vw",
      lg: "3.5vw",
    },
    fontWeight: 700,
    p: "10px 0",
    textShadow: "red",
    boxShadow: "0 0px 5px  #FF0000",
    zIndex: 100,
    position: "sticky",
  },
};

const Header = () => {
  return (
    <AppBar sx={styles.appbar} onClick={() => window.scroll(0, 0)}>
      Entertainly
    </AppBar>
  );
};

export default Header;
