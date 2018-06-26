import React from 'react';
import ReviewService from "../Services/ReviewService";

export default class LikedBooksContainer extends React.Component {

    constructor()
    {
        super();
        this.reviewService = ReviewService.instance;
        this.state = {
            likedBooks: []
        }
    }

    componentDidMount() {

        if(this.props.userId != undefined)
        {

           this.reviewService.findAllLikedBookForUser(this.props.userId).then((response)=>{
               this.setState({likedBooks: response})})
        }
    }

    showLikedBooks()
    {
        if(this.state.likedBooks.length == 0)
        {
            return
        }
        else {
            var rows = this.state.likedBooks.map((books) => {

                var link = "/bookDetails/"+books.isbn

                return (

                    <div className="col-md-4">
                        <a href={link}> <img src={books.imgUrl} height="45px"/></a>
                    </div>

                )

            });
            return (
                rows
            )
        }


    }

    render()
    {
        return(
            <div>
                <div className="row gallery">

                    {this.showLikedBooks()}


                </div>
            </div>
        )
    }
}