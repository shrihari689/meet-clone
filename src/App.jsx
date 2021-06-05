import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Loader from "./components/Shared/Loader";
import CallPage from "./pages/CallPage"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { auth } from "./utils/firebase"

export default function App() {
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    }, [])

    if (currentUser === false) {
        return <Loader />
    }

    if (currentUser === null) {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </Router>
        )
    }

    return (
        <Router>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/:id" component={CallPage} />
                <Redirect from="/" to="/home" />
            </Switch>
        </Router>
    );
}
