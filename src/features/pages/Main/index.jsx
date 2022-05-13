import Banner from "components/Banner";
import Images from "constants/images";
import Pagination from "constants/pagination";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/photoSlice";
import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import { getFirebaseUserId, objectToArr } from "utils/common";

MainPage.propTypes = {};

function MainPage() {
  const history = useHistory();
  const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [userPhotos, setUserPhotos] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [isError, setIsError] = useState(false);

  const uID = getFirebaseUserId();

  useEffect(() => {
    const getUserPhotos = () => {
      const dbRef = firebase.database().ref(uID);
      dbRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserPhotos(objectToArr(snapshot.val()));
            setTotalPhotos(snapshot.numChildren());
            setIsError(true);
          } else {
            console.log("no data available");
          }
        })
        .catch((error) => {
          console.error(error);
          // setIsError(true);
        });
    };

    getUserPhotos();
    setIsLoading(false);
  });

  const handlePhotoEditClick = (photo) => {
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  };

  const handlePhotoRemoveClick = (photo) => {
    const removePhotoId = photo.id;
    const action = removePhoto(removePhotoId);
    dispatch(action);
  };

  return (
    <div className="photo-main">
      <Banner
        title="🎉 Your awesome photos 🎉"
        backgroundUrl={Images.PINK_BG}
      />

      <Container className="text-center">
        {uID ? (
          <Link to="/photos/add">Add new photo</Link>
        ) : (
          <p>Log in to create your own album</p>
        )}
      </Container>
      {isError ? (
        <p>There something wrong</p>
      ) : (
        <PhotoList
          photoList={uID ? userPhotos : photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
          onLoading={isLoading}
          limit={Pagination.LIMIT}
          total={totalPhotos}
        />
      )}
    </div>
  );
}

export default MainPage;
