import React from "react";
import Banner from "../../../components/Banner";
import Images from "../../../constants/images";


MainPage.propTypes = {};

function MainPage(props) {
  return (
    <div>
      <Banner
        title="🎉 Your awesome photos 🎉"
        backgroundUrl={Images.PINK_BG}
      />
      Main Page
    </div>
  );
}

export default MainPage;
