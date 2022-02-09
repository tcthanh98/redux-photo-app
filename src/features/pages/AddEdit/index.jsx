import React from "react";
import Banner from "../../../components/Banner";
import PhotoForm from "../../Photo/components/PhotoForm";

import "./styles.scss";

AddEditPage.propTypes = {};

function AddEditPage(props) {
  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />
      <div className="photo-edit__form">
        <PhotoForm
            onSubmit={value => console.log(value)}
        />
      </div>
    </div>
  );
}

export default AddEditPage;
