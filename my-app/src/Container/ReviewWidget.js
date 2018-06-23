import React, {Component} from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import ReviewService from "../Services/ReviewService";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';



class ReviewWidget
    extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props)
    {
        super(props);

        this.reviewService = ReviewService.instance;

    }

    componentDidMount() {
        const { cookies } = this.props;

        this.setState({profile: cookies.get('profile')||{imageUrl: '', picture: {data: {url: ''}}}})
        if(cookies.get('isReader')!= undefined){
            //alert("is reader"+cookies.get('isReader'))
            this.setState({isReader: cookies.get('isReader')})
        }
        if(cookies.get('isReviewer')!= undefined)
        {
            //alert("is reviewer"+cookies.get('isReviewer'))
            this.setState({isReviewer: cookies.get('isReviewer')})
        }





    }


    postReview(isbn, reviewerId)
    {

        var reviewTxt = this.refs.reviewText.value;
        //console.log(this.props.books.title)
        var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.props.imgUrl)
        //console.log(img)

        var review = {isbn: String(isbn), bookName: this.props.books.title, bookImg: img, reviewerId: String(this.state.profile.id), reviewerName: this.state.profile.first_name+" "+this.state.profile.last_name, reviewerImageUrl: this.state.profile.imageURL+'?sz=550',review: reviewTxt }


        this.reviewService.createReview(review,isbn).then((response)=>{window.location.reload()})


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