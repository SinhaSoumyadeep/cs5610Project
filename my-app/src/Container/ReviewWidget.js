import React, {Component} from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import ReviewService from "../Services/ReviewService";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import UserService from "../Services/UserService";



class ReviewWidget
    extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props)
    {
        super(props);
        this.state = {
            coverPic: 'http://res.cloudinary.com/youpickone/image/upload/v1494829085/user-placeholder-image.png',
            profile: {imageUrl: '', picture: {data: {url: ''}}}
        }
        this.userService = UserService.instance;
        this.reviewService = ReviewService.instance;

    }

    componentWillMount() {
        const { cookies } = this.props;


        if(cookies.get('isReader')!= undefined){
            //alert("is reader"+cookies.get('isReader'))
            this.setState({isReader: cookies.get('isReader')})
        }
        if(cookies.get('isReviewer')!= undefined)
        {
            //alert("is reviewer"+cookies.get('isReviewer'))
            this.setState({isReviewer: cookies.get('isReviewer')})
        }

        if(cookies.get('profile')!= undefined) {
            if (cookies.get('loggedInFrom') == 'NU') {
                this.userService.findUserById(cookies.get('profile').id).then((profile) => {

                    console.log(profile)
                    this.setState({profile: profile})
                    if (profile.coverPic != null) {
                        this.setState({coverPic: "https://s3.amazonaws.com/bookwormstest/" + profile.coverPic})
                    }

                })
            }
        }





    }


    postReview(isbn, reviewerId)
    {

        var reviewTxt = this.refs.reviewText.value;
        //console.log(this.props.books.title)
        var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.props.imgUrl)
        //console.log(img)
        if(this.state.profile!= undefined) {
           // alert(reviewerId)

            var review = {
                isbn: String(isbn),
                bookName: this.props.books.title,
                bookImg: img,
                reviewerId: String(reviewerId),
                reviewerName: this.state.profile.firstName + " " + this.state.profile.lastName,
                reviewerImageUrl: this.state.coverPic,
                review: reviewTxt
            }


            this.reviewService.createReview(review, isbn).then((response) => {
                window.location.reload()
            })
        }


    }


    render() {

        return(


            <div className="reviewBox container-fluid">

                <textarea id="myInput" className="form-control"  placeholder="Write Reviews" ref="reviewText" />
                <button className="btn btn-success btn-block" onClick={()=>{this.postReview(this.props.isbn, this.props.reviewerId)}}>Post</button>

            </div>

        )
    }
}
export default withCookies(ReviewWidget);