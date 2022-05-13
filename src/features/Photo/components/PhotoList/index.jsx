import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Spinner } from "reactstrap";
import PhotoCard from "../PhotoCard";
import "./photoList.scss";
import PaginationComponent from "components/Pagination";
import PaginationCons from "constants/pagination";

PhotoList.propTypes = {
  photoList: PropTypes.array,
  onPhotoEditClick: PropTypes.func,
  onPhotoRemoveClick: PropTypes.func,
  onLoading: PropTypes.bool,
  total: PropTypes.number,
};

PhotoList.defaultProps = {
  photoList: [],
  onPhotoEditClick: null,
  onPhotoRemoveClick: null,
  onLoading: true,
  total: 0,
};

function PhotoList(props) {
  const { photoList, onPhotoEditClick, onPhotoRemoveClick, onLoading, total } =
    props;

  const [currentPage, setCurrentPage] = useState(1);
  const [photosByPaging, setPhotosByPaging] = useState(
    photoList.slice(0, PaginationCons.LIMIT)
  );

  useEffect(() => {
    const startIndex = (currentPage - 1) * PaginationCons.LIMIT;
    const endIndex = startIndex + PaginationCons.LIMIT;
    setPhotosByPaging(photoList.slice(startIndex, endIndex));
  }, [currentPage, photoList]);

  return (
    <>
      {onLoading ? (
        <Spinner className="photo_spinner" />
      ) : (
        <Row style={{ marginLeft: "10px", marginRight: "10px" }}>
          {photosByPaging.map((photo) => (
            <Col key={photo.title} xs="12" md="6" lg="3">
              <PhotoCard
                photo={photo}
                onEditClick={onPhotoEditClick}
                onRemoveClick={onPhotoRemoveClick}
              />
            </Col>
          ))}
        </Row>
      )}
      <PaginationComponent total={total} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default PhotoList;
