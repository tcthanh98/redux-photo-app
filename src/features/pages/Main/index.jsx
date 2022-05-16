import Banner from "components/Banner";
import Error from "components/Error";
import Images from "constants/images";
import Pagination from "constants/pagination";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/photoSlice";
import firebase from "firebase/app";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import { getFirebaseUserId, objectToArr } from "utils/common";
import "./main.scss";

MainPage.propTypes = {};

function MainPage() {
  const history = useHistory();
  const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();
  const typingTimeoutRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isTop, setIsTop] = useState(true);

  const [userPhotos, setUserPhotos] = useState([]);
  const [searchPhotos, setSearchPhotos] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState(0);

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
          } else {
            console.log("no data available");
          }
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        });
    };

    getUserPhotos();
    setIsLoading(false);
  }, [uID]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    });
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

  const handleScrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (!searchTerm) {
      console.log("search: ", searchTerm);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const searchResult = userPhotos.filter((photo) =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchPhotos(searchResult);
    }, 300);
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

      <input placeholder="Search..." onChange={handleSearch} />

      {isError && uID ? (
        <Error />
      ) : (
        <>
          {searchPhotos.length <= 0 && (
            <PhotoList
              photoList={uID ? userPhotos : photos}
              onPhotoEditClick={handlePhotoEditClick}
              onPhotoRemoveClick={handlePhotoRemoveClick}
              onLoading={isLoading}
              limit={Pagination.LIMIT}
              total={totalPhotos}
            />
          )}
          {searchPhotos.length > 0 && (
            <PhotoList
              photoList={uID ? searchPhotos : photos}
              onPhotoEditClick={handlePhotoEditClick}
              onPhotoRemoveClick={handlePhotoRemoveClick}
              onLoading={isLoading}
              limit={Pagination.LIMIT}
              total={searchPhotos.length}
            />
          )}
        </>
      )}

      {isTop === false && (
        <button
          className="photo-main__scrollTop"
          onClick={() => handleScrollToTop()}
        >
          Top
        </button>
      )}
    </div>
  );
}

export default MainPage;
