import React from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import { Redirect } from 'react-router-dom'
import $ from "jquery";
import StarRatings from 'react-star-ratings';
import bookmark from '../Style/bookmark-icon.png'
import ErrorPage from "./ErrorPage";
import ReviewWidget from "./ReviewWidget";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Trigger from "./Trigger";
import HeartButton from "./HeartButton";
import ReviewContainer from "./ReviewContainer"
import FooterPage from "./FooterPage"
import ReviewService from "../Services/ReviewService";
import Example from "./AdvertisementCarousel";
import UserService from "../Services/UserService";




class BookDetails extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.changeRating = this.changeRating.bind(this);
        this.userService = UserService.instance;
        this.reviewService = ReviewService.instance;
        this.state = {
            isbn: '',
            imgthumb: '',
            books:'',
            isReader: false,
            isReviewer: false,
            isAdmin: false,
            isAuthor: false,
            isPublisher: false,
            err: false,
            redirectToLogin: false,
            coverPic: 'http://res.cloudinary.com/youpickone/image/upload/v1494829085/user-placeholder-image.png',
            profile: {imageUrl: '', picture: {data: {url: ''}}},
            userId:''
        };

    }

    componentDidMount() {
        const { cookies } = this.props;
        var id = this.props.match.params.id;

        console.log(cookies.get('profile'));
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
        if(cookies.get('profile')!= undefined)
        {

            if(cookies.get('profile').role == 'Publisher')
            {
                this.setState({isPublisher: true})
            }
            if(cookies.get('profile').role == 'admin')
            {
                this.setState({isAdmin: true})
            }
            if(cookies.get('profile').role == 'Author')
            {
                this.setState({isAuthor: true})
            }

        }


        this.setState({isbn: id})
        this.find_preview(id)
        if(cookies.get('loggedInFrom') == 'GL')
        {

            this.setState({loggedInFrom: 'GL',userId: cookies.get('profile').googleId})
        }
        if(cookies.get('loggedInFrom') == 'FB')
        {
            console.log(cookies.get('profile'))
            this.setState({loggedInFrom: 'FB',userId: cookies.get('profile').id})
        }


        if (cookies.get('loggedInFrom') == 'NU'){


            this.setState({loggedInFrom: 'NU',userId: cookies.get('profile').id})
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




    find_preview(id)
    {
        var isbn = id

        fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn+"&key=AIzaSyCnVTtFc33VOdg7DFgq0jNPGIdAmnTdIeM", {

            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {

            console.log(books)
            try {
                this.setState({books: books.items[0].volumeInfo})
                this.setState({imgthumb: books.items[0].id});
                }
            catch(err) {
                this.setState({ err: true })

            }


        });




    }

    changeRating( newRating, name ) {

        var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.state.imgthumb);
        var bookTitle = this.state.books.title;

        var review = {isbn: String(name), bookName: bookTitle, bookImg: img, reviewerId: String(this.state.profile.id), reviewerName: this.state.profile.firstName+" "+this.state.profile.lastName, reviewerImageUrl: this.state.coverPic, rating: newRating }

        this.reviewService.createReview(review,name).then((response)=>{window.location.reload()})
    }




    displayImage()
    {
            var link = '/bookPreview/'+this.state.isbn
            var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.state.imgthumb)
        return(
            <div style={{margin: "12px"}}>


                    <div className="parent">

                        <img className="image1" id="prviewImg" src={img} style={{width: "220px", height: "300px", cursor: "pointer"}} onClick={()=>{


                            if(this.state.isReader||this.state.isReviewer|| this.state.isAuthor|| this.state.isAdmin || this.state.isPublisher)
                            {
                                window.location.replace(link)
                                return

                            }

                            else
                            {

                                this.infoMsgs("Log In To Read Books ")
                                this.setState({redirectToLogin: true })
                            }

                        }
                        }/>
                        <img className="image2" src="https://media.giphy.com/media/puRciSJdfGCd2/giphy.gif"/>

                    </div>


            </div>
        )
    }

    infoMsgs(msg)
    {
        var x = document.getElementById("info")
        x.className = "show";

        if(!msg.startsWith("SUCCESSFULLY")){
            x.style.backgroundColor = "rgb(217, 56, 26)";
        }
        else
        {
            x.style.backgroundColor = "rgba(113, 217, 41, 1)";
        }
        x.innerHTML=msg;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2600);
    }



    render() {

        console.log(this.state.books.averageRating)
        let des = String(this.state.books.description);
        console.log(this.state.redirectToLogin)

        if (this.state.err) {
            return <Redirect to='/error'/>;
        }

        return(


            <div className="pageView">


                <div className="container-fluid">
                    <SearchContainer/>
                </div>

                <div>

                    <div className="row" style={{marginTop: "81px"}}>
                        <div className="col-sm-8 mainSec">


                            <div className="BooksContainer">
                                    <div className="bookBar container-fluid">
                                        <div className="bookName">
                                            <div style={{float: "left"}}>
                                            <img height="90px" width="120px" style={{marginTop: "-32px", marginRight: "-23px"}} src={bookmark}/>
                                            </div>
                                            <div className="wordwrap" style={{float: "left", marginRight: "-32px"}}>
                                                <h2>&nbsp;&nbsp;&nbsp;{this.state.books.title}</h2>
                                            </div>
                                        </div>
                                        <div className="bookRating">
                                            <div hidden={this.state.isReviewer}>
                                                <StarRatings starDimension="30px" starSpacing="2px" rating={this.state.books.averageRating} starRatedColor="#DAA520"  numberOfStars={5} name={this.state.isbn}/>
                                            </div>
                                            <div hidden={!this.state.isReviewer}>
                                                <StarRatings starDimension="30px" starSpacing="2px" rating={this.state.books.averageRating} starRatedColor="#DAA520" changeRating={this.changeRating} numberOfStars={5} name={this.state.isbn}/>
                                            </div>
                                            </div>
                                    </div>


                                <div className="bookBody">
                                    <div className="bookPreview">
                                        {this.displayImage()}

                                    </div>
                                    <div className="bookDescription form-control" >
                                        <h4 >Description</h4>
                                        <p >{des.substring(0,550)}...</p>
                                    </div>
                                    <div className="bookInfor">
                                        {this.state.isReader && <HeartButton userId={this.state.userId} bookId={this.state.isbn} ImgUrl={'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.state.imgthumb)}/>}
                                        <b>Book Information</b><br/>
                                        <b>Page Count:</b>&nbsp;{this.state.books.pageCount}<br/>
                                        <b>Published Date:</b>&nbsp;{this.state.books.publishedDate}


                                    </div>


                                    <div className="bookInfo form-control" >

                                            <h4>Author</h4>
                                            <p>{this.state.books.authors}</p>

                                    </div>

                                </div>
                                <div className="reviewWidget" hidden={!this.state.isReviewer}>
                                    <ReviewWidget imgUrl={this.state.imgthumb} isbn={this.state.isbn} books={this.state.books} reviewerId={this.state.profile.id}/>
                                </div>
                                <div>
                                    <ReviewContainer isbn={this.state.isbn}/>
                                </div>





                            </div>



                        </div>

                        <div className="col-sm-4 asideSec">
                            <Example/>
                        </div>
x
                    </div>
                </div>
                <div style={{margin: "-24px auto -34px"}}>
                    <FooterPage/>
                </div>
                <div style={{height: "126px"}}></div>


            </div>



        );
    }

}
export default withCookies(BookDetails);



