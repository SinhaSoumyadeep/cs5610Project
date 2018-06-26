import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import BookList from '../Component/BookList'
import Login from '../Component/Login'
import Register from '../Component/Register'
import BookDetails from './BookDetails'
import BookPreview from "./BookPreview";
import ErrorPage from "./ErrorPage";
import ReviewWidget from "./ReviewWidget";
import Profile from "./Profile";
import Settings from "./Settings";



export default class BookStore
    extends Component {


    render() {

        return (
            <Router>
                <div>
                    <Route path="/books"
                           component={BookList}>
                    </Route>
                    <Route path="/login"
                           component={Login}>
                    </Route>
                    <Route path="/register"
                           component={Register}>
                    </Route>
                    <Route path="/bookDetails/:id"
                           component={BookDetails}>
                    </Route>
                    <Route path="/bookPreview/:id"
                           component={BookPreview}>
                    </Route>
                    <Route path="/error"
                           component={ErrorPage}>
                    </Route>
                    <Route path="/profile/:userId"
                           component={Profile}>
                    </Route>
                    <Route path="/settings"
                           component={Settings}>
                    </Route>
                </div>
            </Router>
        )
    }
}