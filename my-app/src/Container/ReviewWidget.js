import React, {Component} from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'



export default class ReviewWidget
    extends Component {




    render() {

        return(


            <div className="reviewBox container-fluid">

                <textarea className="form-control" ref="reviewInput" placeholder="Write reviews" />
                <button className="btn btn-success btn-block">Post</button>

            </div>

        )
    }
}