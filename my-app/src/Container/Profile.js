import React from 'react'
import SearchContainer from './SearchContainer'
import { Redirect } from 'react-router-dom'
import $ from "jquery";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import '../CSS/profile.css'
import LikedBooksContainer from "./LikedBooksContainer";
import ReadBooksContainer from "./ReadBooksContainer";
import WishListContainer from "./WishListContainer";
import ReviewedBooksContainer from "./ReviewedBooksContainer";
import {Link} from 'react-router-dom'
import Trigger from "./Trigger";
import Settings from "./Settings";
import Reviews from "./ReviewsContainer.js"
import BlogContainer from "./BlogContainer.js"
import UserService from "../Services/UserService";
import ReviewsContainer from "./ReviewsContainer";
import AllBlogContainer from "./AllBlogContainer";
import PublisherWidget from "./PublisherWidget";
import FooterPage from "./FooterPage";






class Profile extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.userService = UserService.instance;
        this.state = {
            isbn: '',
            imgthumb: '',
            books:'',
            err: false,
            redirectToLogin: false,

            isReader: false,
            isReviewer: false,
            isAuthor: false,
            isPublisher: false,
            isAdmin: false,

            likedBooks: false,
            wishlist: false,
            reviewedBooks: false,

            blogcontainer: false,
            adcontainer: false,
            reviewscontainer: false,
            allblogscontainer: false,



            userId:'',
            coverPicSet: false,
            coverPic: 'https://image.noelshack.com/fichiers/2017/38/2/1505775648-annapurnafocus.jpg',
            loggedInFrom: 'NU',
            profile: {imageUrl: '', picture: {data: {url: ''}}},
            profilePic: '',
            restrictedView: false



        };

    }

    componentDidMount() {
        const { cookies } = this.props;

        var LoggedinUserId;



        if(cookies.get('loggedInFrom') == 'GL')
        {

            this.setState({loggedInFrom: 'GL'})
            LoggedinUserId = cookies.get('profile').googleId;
        }
        if(cookies.get('loggedInFrom') == 'FB')
        {
            this.setState({loggedInFrom: 'FB'})
            LoggedinUserId = cookies.get('profile').id;

        }
        if (cookies.get('loggedInFrom') == 'NU'){
            this.setState({loggedInFrom: 'NU'})
            LoggedinUserId = cookies.get('profile').id;
        }

        var id = this.props.match.params.userId;



       if(id != LoggedinUserId)
       {
            //alert("viewing someone elses profile")
           this.setState({restrictedView: true})

           this.setState({loggedInFrom: 'NU'})
           this.state.userId = id;
           this.userService.findUserById(id).then((user)=>{
               console.log(user)
               this.setState({profile: user||{imageUrl: '', picture: {data: {url: ''}}}})
               this.setState({isLoggedIn: true})


               this.setState({profilePic: 'http://res.cloudinary.com/youpickone/image/upload/v1494829085/user-placeholder-image.png'})
               if(this.state.profile!= undefined)
               {
                   if(this.state.profile.coverPic != null)
                   {
                       this.setState({coverPic: "https://s3.amazonaws.com/book-worms/"+this.state.profile.coverPic})
                   }
                   if(this.state.profile.role == 'Reader'){

                       this.setState({isReader: true,likedBooks: true})

                   }
                   if(this.state.profile.role == 'Reviewer')
                   {
                       this.setState({isReviewer: true, reviewedBook: true})


                   }

                   if(this.state.profile.role == 'Publisher')
                   {
                       this.setState({isPublisher: true, adcontainer: true})
                   }
                   if(this.state.profile.role == 'admin')
                   {
                       this.setState({isAdmin: true,allblogscontainer: true})
                   }
                   if(this.state.profile.role == 'Author')
                   {
                       this.setState({isAuthor: true,blogcontainer: true})
                   }

               }
           })

       }
       else
       {
           //alert("viewing his own profile")
           console.log(cookies.get('profile'))
           this.setState({profilePic: cookies.get('profile').imageURL})

           if(cookies.get('isReader')!= undefined){
               //alert("is reader"+cookies.get('isReader'))
               this.setState({isReader: cookies.get('isReader'),likedBooks: true})

           }

           if(cookies.get('isReviewer')!= undefined)
           {
               //alert("is reviewer"+cookies.get('isReviewer'))
               this.setState({isReviewer: cookies.get('isReviewer'),reviewedBooks: true})
           }

           if(cookies.get('profile')!= undefined)
           {
               if(cookies.get('profile').coverPic != null)
               {
                   this.setState({coverPic: "https://s3.amazonaws.com/book-worms/"+cookies.get('profile').coverPic})
               }

               if(cookies.get('profile').role == 'Publisher')
               {
                   this.setState({isPublisher: true,adcontainer: true})
               }
               if(cookies.get('profile').role == 'admin')
               {
                   this.setState({isAdmin: true,allblogscontainer: true})
               }
               if(cookies.get('profile').role == 'Author')
               {
                   this.setState({isAuthor: true,blogcontainer: true})
               }

           }

           if(cookies.get('isAdmin')!= undefined)
           {
               alert("here admin")
               this.setState({isAuthor: true})
               //alert("is reviewer"+cookies.get('isReviewer'))
               this.setState({isAdmin: cookies.get('isAdmin')})
           }

           if(cookies.get('isAuthor')!= undefined)
           {
               this.setState({isAdmin: false})
               //alert("is reviewer"+cookies.get('isReviewer'))
               this.setState({isAuthor: cookies.get('isAuthor')})
           }


           // if(cookies.get('isPublisher')!= undefined)
           // {
           //     //alert("is reviewer"+cookies.get('isReviewer'))
           //     this.setState({isPublisher: cookies.get('isPublisher')})
           // }

           this.setState({profile: cookies.get('profile')||{imageUrl: '', picture: {data: {url: ''}}}})
           this.setState({isLoggedIn: cookies.get('isLoggedIn')})
           if(cookies.get('loggedInFrom') == 'GL')
           {

               this.setState({userId: cookies.get('profile').googleId})
           }
           if(cookies.get('loggedInFrom') == 'FB')
           {
               this.setState({userId: cookies.get('profile').id})
           }
           if (cookies.get('loggedInFrom') == 'NU'){
               this.setState({userId: cookies.get('profile').id})
           }

       }


        if(cookies.get('isPublisher')!= undefined){
            //alert("is reader"+cookies.get('isReader'))
            this.setState({isPublisher: cookies.get('isPublisher')})

        }






    }


    componentWillReceiveProps(newProps){

        this.setCoverPic(newProps.coverPic);
        const { cookies } = newProps;


    }

    setCoverPic(coverPic){
        this.setState({coverPic: coverPic});
        console.log(coverPic)
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


                                    <img className="header" src={this.state.coverPic}></img>






                                    <div className="row" style={{paddingBottom: "285px"}}>

                                        <div className="left col-lg-4">
                                            <div className="photo-left">
                                                {this.state.loggedInFrom == 'GL' &&
                                                <img className="photo" src={this.state.profile.imageUrl+'?sz=550'}
                                                />
                                                }
                                                {this.state.loggedInFrom == 'FB' &&
                                                <img className="photo" src={'http://graph.facebook.com/'+this.state.profile.id+'/picture?type=large'}
                                                     hidden={!this.state.isLoggedIn}
                                                />
                                                }

                                                {this.state.loggedInFrom == 'NU' &&
                                                <img className="photo" src={this.state.profilePic}
                                                     hidden={!this.state.isLoggedIn}
                                                />
                                                }
                                                <div className="profileActive"></div>


                                                {this.state.loggedInFrom == 'NU'&& this.state.restrictedView == false &&
                                                <Trigger color={"black"} buttonLabel={<i className="fa fa-cog">Edit Profile</i>} type={"settings"} profileURL={this.state.profile}></Trigger>
                                                }



                                            </div>
                                            {this.state.loggedInFrom == 'FB' &&
                                            <h4 className="name">{this.state.profile.name}</h4>
                                            }
                                            {this.state.loggedInFrom == 'GL'&&
                                            <h4 className="name">{this.state.profile.name}</h4>
                                            }
                                            {this.state.loggedInFrom == 'NU'&&
                                            <h4 className="name">{this.state.profile.firstName}</h4>
                                            }
                                            <div></div>

                                            <p className="info" hidden={!this.state.isReader}>Reader</p>
                                            <p className="info" hidden={!this.state.isReviewer}>Reviewer</p>
                                            <p className="info" hidden={!this.state.isPublisher}>Publisher</p>
                                            <p className="info" hidden={!this.state.isAdmin}>Admin</p>
                                            <p className="info" hidden={!this.state.isAuthor}>Author</p>


                                            {this.state.loggedInFrom == 'FB' &&
                                            <p className="info">{this.state.profile.email}</p>
                                            }
                                            {this.state.loggedInFrom == 'GL'&&
                                            <p className="info">{this.state.profile.email}</p>
                                            }
                                            {this.state.loggedInFrom == 'NU'&&
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


                                            {this.state.loggedInFrom == 'NU' &&
                                            <p className="desc">{this.state.profile.bio}</p>
                                            }

                                            <div className="social">
                                                <i className="fa fa-facebook-square" aria-hidden="true"></i>
                                                <i className="fa fa-twitter-square" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div className="right col-lg-8">
                                            <ul className="nav">






                                                 <li hidden={!this.state.isReader} onClick={()=>{$(".nav li:nth-child(1)").css("border-bottom", "2px solid #999");
                                                        $(".nav li:nth-child(2)").css("border-bottom", "none");
                                                        $(".nav li:nth-child(3)").css("border-bottom", "none");
                                                        $(".nav li:nth-child(4)").css("border-bottom", "none");
                                                        $(".nav li:nth-child(5)").css("border-bottom", "none");
                                                        $(".nav li:nth-child(6)").css("border-bottom", "none");
                                                        $(".nav li:nth-child(7)").css("border-bottom", "none");
                                                        this.setState({likedBooks: true,reviewedBooks: false, wishlist: false, blogcontainer: false, adcontainer: false, reviewscontainer: false, allblogscontainer:false })}}>Liked Books</li>




                                                     <li hidden={!this.state.isReviewer} onClick={()=>{$(".nav li:nth-child(2)").css("border-bottom", "2px solid #999");
                                                      $(".nav li:nth-child(1)").css("border-bottom", "none");
                                                      $(".nav li:nth-child(3)").css("border-bottom", "none");
                                                      $(".nav li:nth-child(4)").css("border-bottom", "none");
                                                         $(".nav li:nth-child(5)").css("border-bottom", "none");
                                                         $(".nav li:nth-child(6)").css("border-bottom", "none");
                                                         $(".nav li:nth-child(7)").css("border-bottom", "none");
                                                         this.setState({likedBooks: false,reviewedBooks: true, wishlist: false, blogcontainer: false, adcontainer: false, reviewscontainer: false, allblogscontainer:false })}}>Reviewed Books</li>


                                                         <li hidden={!this.state.isAdmin} onClick={()=>{$(".nav li:nth-child(3)").css("border-bottom", "2px solid #999");
                                                        $(".nav li:nth-child(1)").css("border-bottom", "none");
                                                        $(".nav li:nth-child(2)").css("border-bottom", "none");
                                                        $(".nav li:nth-child(4)").css("border-bottom", "none");
                                                         $(".nav li:nth-child(5)").css("border-bottom", "none");
                                                         $(".nav li:nth-child(6)").css("border-bottom", "none");
                                                         $(".nav li:nth-child(7)").css("border-bottom", "none");
                                                         this.setState({likedBooks: false,reviewedBooks: false, wishlist: false, blogcontainer: false, adcontainer: false, reviewscontainer: false, allblogscontainer:true })}}>AllBlogs</li>




                                            <li hidden={!this.state.isAuthor}  onClick={()=>{$(".nav li:nth-child(4)").css("border-bottom", "2px solid #999");
                                                $(".nav li:nth-child(1)").css("border-bottom", "none");
                                                $(".nav li:nth-child(2)").css("border-bottom", "none");
                                                $(".nav li:nth-child(3)").css("border-bottom", "none");
                                                $(".nav li:nth-child(5)").css("border-bottom", "none");
                                                $(".nav li:nth-child(6)").css("border-bottom", "none");
                                                $(".nav li:nth-child(7)").css("border-bottom", "none");
                                                this.setState({likedBooks: false,reviewedBooks: false, wishlist: false, blogcontainer: true, adcontainer: false, reviewscontainer: false, allblogscontainer:false })}}>Blog</li>

                                                <li hidden={!this.state.isPublisher} onClick={()=>{$(".nav li:nth-child(5)").css("border-bottom", "2px solid #999");
                                                    $(".nav li:nth-child(1)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(2)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(3)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(4)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(6)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(7)").css("border-bottom", "none");
                                                    this.setState({likedBooks: false,reviewedBooks: false, wishlist: false, blogcontainer: false, adcontainer: true, reviewscontainer: false, allblogscontainer:false })}}>Ad</li>

                                                <li hidden={!this.state.isAdmin}  onClick={()=>{$(".nav li:nth-child(6)").css("border-bottom", "2px solid #999");
                                                    $(".nav li:nth-child(1)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(2)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(3)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(4)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(5)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(7)").css("border-bottom", "none");
                                                    this.setState({likedBooks: false,reviewedBooks: false, wishlist: false, blogcontainer: false, adcontainer: false, reviewscontainer: true, allblogscontainer:false })}}>AllReviews</li>


                                                <li onClick={()=>{$(".nav li:nth-child(7)").css("border-bottom", "2px solid #999");
                                                    $(".nav li:nth-child(1)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(2)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(3)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(4)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(5)").css("border-bottom", "none");
                                                    $(".nav li:nth-child(6)").css("border-bottom", "none");
                                                    this.setState({likedBooks: false,reviewedBooks: false, wishlist: true, blogcontainer: false, adcontainer: false, reviewscontainer: false, allblogscontainer:false })}}>Wish List</li>







                                            </ul>
                                            <span className="follow">Follow</span>
                                            <div className="hideScroll">

                                                {this.state.likedBooks == true &&  (this.state.loggedInFrom == 'NU'||this.state.loggedInFrom == 'GL'||this.state.loggedInFrom == 'FB') && <LikedBooksContainer userId={this.state.userId}/>}
                                                {this.state.reviewedBooks == true && this.state.loggedInFrom == 'NU' && <ReviewedBooksContainer userId={this.state.userId}/>}
                                                {this.state.wishlist == true && <WishListContainer/>}
                                                {this.state.blogcontainer == true && this.state.loggedInFrom == 'NU' && <BlogContainer/>}
                                                {this.state.adcontainer == true && this.state.loggedInFrom == 'NU' && <PublisherWidget/>}
                                                {this.state.reviewscontainer == true && this.state.loggedInFrom == 'NU' && <ReviewsContainer/>}
                                                {this.state.allblogscontainer == true && this.state.loggedInFrom == 'NU' && <AllBlogContainer/>}



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FooterPage/>
                    </div>
                    <div style={{height: "126px"}}></div>
                </div>


            </div>
        )
    }

}
export default withCookies(Profile);



