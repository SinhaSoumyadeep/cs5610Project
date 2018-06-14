import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Register from "../Component/Register";


export default class RegisterContainer
    extends Component {
    render() {
        return (
            <Router>
                <div>

                    <Route path="/register"
                           component={Register}>
                    </Route>

                </div>
            </Router>
        )
    }
}