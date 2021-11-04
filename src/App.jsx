import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loader from "./components/Shared/Loader";
import CallPage from "./pages/CallPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { auth } from "./utils/firebase";
import { setUser } from "./database/auth";
import { connect } from "react-redux";

function App({ isLoggedIn, setCurrentUser }) {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser({
        id: user?.uid,
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        isLoggedIn: user != null,
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoggedIn === null) {
    return <Loader />;
  }

  if (isLoggedIn === false) {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/:id([a-z]{3}-[a-z]{4}-[a-z]{3})" component={CallPage} />
        <Redirect from="/" to="/home" />
      </Switch>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (e) => dispatch(setUser(e)),
});

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
