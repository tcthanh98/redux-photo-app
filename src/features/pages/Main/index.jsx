import Banner from "components/Banner";
import Images from "constants/images";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/photoSlice";
import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import { getFirebaseUserId, objectToArr } from "utils/common";

MainPage.propTypes = {};

function MainPage(props) {
  const history = useHistory();
  const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [userPhotos, setUserPhotos] = useState([]);
  const uID = getFirebaseUserId();

  useEffect(() => {
    const getUserPhotos = () => {
      const dbRef = firebase.database().ref(uID);
      dbRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserPhotos(objectToArr(snapshot.val()));
          } else {
            console.log("no data available");
          }
        })
        .catch((error) => {
          console.error(error);
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
      <PhotoList
        photoList={uID ? userPhotos : photos}
        onPhotoEditClick={handlePhotoEditClick}
        onPhotoRemoveClick={handlePhotoRemoveClick}
        onLoading={isLoading}
      />
    </div>
  );
}

export default MainPage;
