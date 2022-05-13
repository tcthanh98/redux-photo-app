import { Pagination } from "@mui/material";
import PaginationCons from "constants/pagination";
import PropTypes from "prop-types";
import React from "react";
import "./pagination.scss";

PaginationComponent.propTypes = {
  total: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

PaginationComponent.defaultProps = {
  total: 0,
  setCurrentPage: null,
};

function PaginationComponent(props) {
  const { total, setCurrentPage } = props;
  const numPages = Math.ceil(total / PaginationCons.LIMIT);

  const handleChangePage = (e, value) => {
    if (!value) return;
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pagination">
      <Pagination
        className="pagination__btnGroup"
        count={numPages}
        defaultPage={1}
        siblingCount={1}
        boundaryCount={1}
        color="primary"
        onChange={handleChangePage}
      />
    </div>
  );
}

export default PaginationComponent;
