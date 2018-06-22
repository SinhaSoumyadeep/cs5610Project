import React from 'react'
import SearchContainer from './SearchContainer'
import { Redirect } from 'react-router-dom'
import $ from "jquery";
import StarRatings from 'react-star-ratings';
import bookmark from '../Style/bookmark-icon.png'
import ErrorPage from "./ErrorPage";
import ReviewWidget from "./ReviewWidget";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import '../CSS/profile.css'
import LikedBooksContainer from "./LikedBooksContainer";
import ReadBooksContainer from "./ReadBooksContainer";
import WishListContainer from "./WishListContainer";




class Profile extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.state = {
            isbn: '',
            imgthumb: '',
            books:'',
            isReader: false,
            isReviewer: false,
            err: false,
            redirectToLogin: false,
            likedBooks: true,
            readBooks: false,
            wishlist: false
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







    render() {

        return(

            <div>

                <div className="pageView">
                    <div className="container-fluid">
                        <SearchContainer/>
                    </div>
                    <div>

                        <div  style={{marginTop: "81px"}}>
                            <div className=" mainSec">


                                <div className="container">
                                    <img className="header" src="https://image.noelshack.com/fichiers/2017/38/2/1505775648-annapurnafocus.jpg"></img>
                                    <div className="row">
                                        <div className="left col-lg-4">
                                            <div className="photo-left">
                                                {this.state.loggedInFrom == 'GL'&&
                                                <img className="photo" src={this.state.profile.imageUrl+'?sz=550'}
                                                />
                                                }
                                                {this.state.loggedInFrom == 'FB' &&
                                                <img className="photo" src={'http://graph.facebook.com/'+this.state.profile.id+'/picture?type=large'}
                                                     hidden={!this.state.isLoggedIn}
                                                />
                                                }

                                                <div className="active"></div><a href="#" style={{color: "black"}}><i className="fa fa-cogs"></i></a>

                                            </div>
                                            {this.state.loggedInFrom == 'FB' &&
                                            <h4 className="name">{this.state.profile.name}</h4>
                                            }
                                            {this.state.loggedInFrom == 'GL'&&
                                            <h4 className="name">{this.state.profile.name}</h4>
                                            }
                                            <div></div>

                                             <p className="info" hidden={!this.state.isReader}>Reader</p>
                                            <p className="info" hidden={!this.state.isReviewer}>Reviewer</p>

                                            {this.state.loggedInFrom == 'FB' &&
                                            <p className="info">{this.state.profile.email}</p>
                                            }
                                            {this.state.loggedInFrom == 'GL'&&
                                            <p className="info">{this.state.profile.email}</p>
                                            }

                                            <div className="stats row">
                                                <div className="stat col-xs-4" style={{paddingRight: "50px"}}>
                                                    <p className="number-stat">3,619</p>
                                                    <p className="desc-stat">Followers</p>
                                                </div>
                                                <div className="stat col-xs-4">
                                                    <p className="number-stat">42</p>
                                                    <p className="desc-stat">Following</p>
                                                </div>
                                                <div className="stat col-xs-4" style={{paddingLeft: "50px"}}>
                                                    <p className="number-stat">38</p>
                                                    <p className="desc-stat">Uploads</p>
                                                </div>
                                            </div>
                                            <p className="desc">Hi ! My name is Jane Doe. I'm a UI/UX Designer from
                                                Paris, in France. I really enjoy photography and mountains.</p>
                                            <div className="social">
                                                <i className="fa fa-facebook-square" aria-hidden="true"></i>
                                                <i className="fa fa-twitter-square" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="right col-lg-8">
                                            <ul className="nav">
                                                <li onClick={()=>{$(".nav li:nth-child(1)").css("border-bottom", "2px solid #999");
                                                    $(".nav li:nth-child(2)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(3)").css("border-bottom", "none");
                                                    this.setState({likedBooks: true,readBooks: false, wishlist: false})}}>Liked Books</li>
                                                <li onClick={()=>{$(".nav li:nth-child(2)").css("border-bottom", "2px solid #999");
                                                    $(".nav li:nth-child(1)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(3)").css("border-bottom", "none");
                                                    this.setState({likedBooks: false,readBooks: true, wishlist: false})}}>Read Books</li>
                                                <li onClick={()=>{$(".nav li:nth-child(3)").css("border-bottom", "2px solid #999");
                                                    $(".nav li:nth-child(1)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(2)").css("border-bottom", "none");
                                                    this.setState({likedBooks: false,readBooks: false, wishlist: true})}}>Wish List</li>

                                            </ul>
                                            <span className="follow">Follow</span>
                                            <div className="hideScroll">

                                                {this.state.likedBooks == true && <LikedBooksContainer/>}
                                                {this.state.readBooks == true && <ReadBooksContainer/>}
                                                {this.state.wishlist == true && <WishListContainer/>}

                                            </div>
                                        </div>
                                    </div>

                                </div>

















                            </div>



                        </div>
                    </div>


                </div>
            </div>
        )
    }

}
export default withCookies(Profile);



