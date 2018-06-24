import React from 'react';
import ReviewService from "../Services/ReviewService";
import StarRatings from 'react-star-ratings';

export default class ReviewedBooksContainer extends React.Component {

    constructor()
    {
        super();
        this.reviewService = ReviewService.instance;
        this.state = {
            reviewedBooks: []
        }
    }

    componentDidMount() {



        if(this.props.userId != undefined)
        {


            this.reviewService.fetchAllReviewsForReviewer(this.props.userId).then((response)=>{
                this.setState({reviewedBooks: response})})
        }
    }





    showLikedBooks()
    {
        var rows = this.state.reviewedBooks.map((review) => {



            return (

                <div  className="reviewBoxProfile">

                    <div style={{float: "left"}}>
                        <a href={"/bookDetails/"+review.isbn} > <img src={review.bookImg} style={{height: "107px", width: "71px",borderRadius: "6px"}}/></a>

                    </div>
                    <div style={{float: "left", marginLeft: "15px"}}>
                        <h5 style={{color: "black"}}>{review.bookName}</h5>
                    {review.rating == null && <StarRatings starDimension="20px" starSpacing="1px" rating={0} starRatedColor="#DAA520" numberOfStars={5} />}
                    {review.rating != null && <StarRatings starDimension="20px" starSpacing="1px" rating={parseFloat(review.rating)} starRatedColor="#DAA520" numberOfStars={5} />}

                    <div className="reviewBoxText">
                        <h6>{review.review}</h6>

                    </div>


                </div>
                    <div style={{marginTop: "127px"}}>
                    <hr />
                    </div>


                </div>

            )

        });
        return (
            rows
        )
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