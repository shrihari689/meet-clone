import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import CallPage from "./pages/CallPage"
import LoginPage from "./pages/LoginPage";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/:id" component={CallPage} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    );
}
