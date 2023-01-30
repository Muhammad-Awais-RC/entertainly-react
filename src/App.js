import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },

    mode: "dark",
  },
});

const styles = {
  app: {
    minHeight: "100vh",
    p: "40px 0",
    mb: "30px",
  },
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> <Header />
        <Box sx={styles.app}>
          <Container>
            <Routes>
              <Route path="/" exact element={<Trending />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Container>
        </Box>
        <Navbar />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
