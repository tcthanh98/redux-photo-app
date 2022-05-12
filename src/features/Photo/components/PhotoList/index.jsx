import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Spinner } from "reactstrap";
import PhotoCard from "../PhotoCard";
import "./photoList.scss";

PhotoList.propTypes = {
  photoList: PropTypes.array,
  onPhotoEditClick: PropTypes.func,
  onPhotoRemoveClick: PropTypes.func,
  onLoading: PropTypes.bool,
};

PhotoList.defaultProps = {
  photoList: [],
  onPhotoEditClick: null,
  onPhotoRemoveClick: null,
  onLoading: true,
};

function PhotoList(props) {
  const { photoList, onPhotoEditClick, onPhotoRemoveClick, onLoading } = props;
  return (
    <>
      {onLoading ? (
        <Spinner className="photo_spinner" />
      ) : (
        <Row style={{ marginLeft: "10px", marginRight: "10px" }}>
          {photoList.map((photo) => (
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
    </>
  );
}

export default PhotoList;
