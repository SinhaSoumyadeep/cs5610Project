import React from 'react'
import StarRatings from 'react-star-ratings';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import ReviewService from "../Services/ReviewService";



class ReviewContainer extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.reviewService = ReviewService.instance;
        this.state = {
            isbn: '',
            imgthumb: '',
            books: '',
            isReader: false,
            isReviewer: false,
            err: false,
            redirectToLogin: false,
            likedBooks: true,
            readBooks: false,
            wishlist: false,
            reviewes: []
        };

    }
    componentDidMount() {



        const { cookies } = this.props;

        console.log(cookies.get('profile'))
        if(cookies.get('isReader')!= undefined){
            //alert("is reader"+cookies.get('isReader'))
            this.setState({isReader: cookies.get('isReader')})
        }
        if(cookies.get('isReviewer')!= undefined)
        {
            //alert("is reviewer"+cookies.get('isReviewer'))
            this.setState({isReviewer: cookies.get('isReviewer')})
        }
        this.setState({profile: cookies.get('profile')||{imageUrl: '', picture: {data: {url: ''}}}})
        this.setState({isLoggedIn: cookies.get('isLoggedIn')})

        if(cookies.get('loggedInFrom') == 'GL')
        {
            this.setState({loggedInFrom: 'GL'})
        }
        if(cookies.get('loggedInFrom') == 'FB')
        {
            this.setState({loggedInFrom: 'FB'})
        }




    }
    componentWillReceiveProps(newProps){
        console.log(newProps.isbn);
        this.reviewService.findAllReviewsForABook(newProps.isbn).then((response)=>{
            console.log(response);
            this.setState({reviewes: response})})
    }


    ReviewRows() {


        if(this.state.reviewes.length == 0)
        {
            if(this.state.isReviewer)
            {
                return(
                    <h5>Be the first to review!</h5>

                )
            }
            else
            {
                return(
                    <h5>Sorry! No Ratings Available</h5>

                )
            }

        }



        var rows = this.state.reviewes.map((review) => {

            return (


                <div >

                    <div>
                        <img src={review.reviewerImageUrl} style={{height: "61px", width: "61px",borderRadius: "91px"}}/>
                        <h5>{review.reviewerName} </h5>
                    </div>
                    <div className="">
                        {review.rating == null && <h6>no star ratings available</h6>}
                        {review.rating != null && <StarRatings starDimension="20px" starSpacing="1px" rating={parseFloat(review.rating)} starRatedColor="#DAA520" numberOfStars={5} />}
                    </div>

                    <h6 style={{textAlign: "justify"}}>{review.review}</h6>
                    <hr/>

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
            <div className="hideScroll">
                {!this.state.isReviewer && <div className="reviewBoxSection" style={{margin: "42px"}}>
                    {this.ReviewRows()}

                </div>}
                {this.state.isReviewer && <div className="reviewBoxSection" style={{marginLeft: "42px", marginTop: "5px", height: "240px"}}>
                    {this.ReviewRows()}

                </div>}



            </div>
        )
    }


}
export default withCookies(ReviewContainer);