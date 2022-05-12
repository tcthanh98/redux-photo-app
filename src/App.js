import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "features/Auth/pages/SignIn";
import firebase from "firebase/app";
import "firebase/auth";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Spinner } from "reactstrap";
import "./App.css";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectID: process.env.REACT_APP_FIREBASE_PID,
};

firebase.initializeApp(config);

// Lazy load - Code splitting
const Photo = React.lazy(() => import("./features/Photo"));

function App() {
  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logout
          return;
        }
        const userDetail = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        };

        localStorage.setItem(
          "firebaseRememberedAccount",
          JSON.stringify(userDetail)
        );
        // const token = await user.getIdToken();
        // console.log("Token: ", token);
      });

    return () => unregisterAuthObserver;
  }, []);

  return (
    <div className="photo-app">
        <Suspense fallback={<Spinner className="photo-app-spinner" />}>
          <BrowserRouter>
            <Header />

            <Switch>
              <Redirect exact from="/" to="/photos" />
              <Route path="/photos" component={Photo} />
              <Route path="/sign-in" component={SignIn} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </Suspense>
    </div>
  );
}

export default App;
