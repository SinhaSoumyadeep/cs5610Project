import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "../Component/Login";

export default class LoginContainer
    extends Component {
    render() {
        return (
            <Router>
                <div>

                    <Route path="/login"
                           component={Login}>
                    </Route>

                </div>
            </Router>
        )
    }
}