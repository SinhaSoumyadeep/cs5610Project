import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import BookList from '../Component/BookList'




export default class BookStore
    extends Component {


    render() {
        return (
            <Router>
                <div>

                    <Route path="/books"
                           component={BookList}>
                    </Route>

                </div>
            </Router>
        )
    }
}