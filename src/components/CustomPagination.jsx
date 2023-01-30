import { Pagination } from "@mui/material";
import React, { useEffect } from "react";

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  function changeHandler(page) {
    setPage(page);
    window.scrollTo(0, 0);
  }

  return (
    <Pagination
      count={numberOfPages}
      onChange={(e) => changeHandler(e.target.textContent)}
      sx={{ m: "20px" }}
      color="primary"
    />
  );
};

export default CustomPagination;
