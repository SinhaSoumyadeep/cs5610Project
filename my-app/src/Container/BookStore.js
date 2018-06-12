import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import BookList from '../Component/BookList'
import Login from '../Component/Login'
import Register from '../Component/Register'
import BookDetails from './BookDetails'



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

                </div>
            </Router>
        )
    }
}