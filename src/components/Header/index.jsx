import firebase from "firebase/app";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { getFirebaseUserName } from "utils/common";
import "./Header.scss";

Header.propTypes = {};

function Header(props) {
  const [userName, setUserName] = useState(getFirebaseUserName());
  const [showDropDown, setShowDropDown] = useState(false);

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("firebaseRememberedAccount");
        setUserName(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          <Col xs="auto">
            <a
              className="header__link header__title"
              href="https://github.com/tcthanh98/redux-photo-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              TCT
            </a>
          </Col>

          <Col xs="auto">
            {userName ? (
              <Dropdown
                toggle={() => setShowDropDown(!showDropDown)}
                isOpen={showDropDown}
              >
                <DropdownToggle className="header__dropdown">
                  Hi! {userName}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => handleLogOut()}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <NavLink
                exact
                className="header__link"
                to="/sign-in"
                activeClassName="header__link--active"
              >
                Sign In
              </NavLink>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
