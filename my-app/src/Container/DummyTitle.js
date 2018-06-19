import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery';
import SearchRow from "./SearchRow";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class DummyTitle
    extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props)

        this.state = {

            profile: '',
            isLoggedIn: false


        };
    }

    componentWillMount() {
        const { cookies } = this.props;
        this.setState({profile: cookies.get('profile')||{imageUrl: ''}})
        this.setState({isLoggedIn: cookies.get('isLoggedIn')})
    }





    render() {
        return (
            <div className="titleBar">
                <div className="logo">
                    <a href="/books">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" height="45px" width="121px"
                         onClick={this.goBack}/>
                    </a>

                </div>
                <div className="searchBar" id="dummysearch" style={{color: "white"}}>
                    <h1 style={{paddingLeft: "245px"}}>Preview</h1>

                </div>
                <div className="searchBtn" id="dummysearch" style={{color: "black"}}>

                </div>
                <div className="login">
                    <a href="/books" hidden={!this.state.isLoggedIn} onClick={()=>{

                        const { cookies } = this.props;
                        cookies.remove('profile',{ path: '/' });
                        cookies.remove('isLoggedIn',{ path: '/' });
                        cookies.remove('isReader',{ path: '/' });


                    }}>LogOut</a>
                    <Link to={`/login`}>
                        <a hidden={this.state.isLoggedIn}>Login</a>

                    </Link>
                    &nbsp;&nbsp;
                    <Link to={`/register`}>
                        <a hidden={this.state.isLoggedIn}>SignUp</a>
                    </Link>
                    <Link to={`/profile`}>
                        <img className="loggedInUsr" src={this.state.profile.imageUrl}
                             height="40px"
                             hidden={!this.state.isLoggedIn}
                        />
                    </Link>


                </div>
                <div className="extra">


                    <div className="socialFace">
                        <button className="btn btn-warning btn-block social">
                            <i className="fa fa-facebook"></i>
                        </button>
                    </div>
                    <div className="socialTwitter">
                        <button className="btn btn-warning btn-block social">
                            <i className="fa fa-twitter"></i>
                        </button>
                    </div>
                    <div className="socialInsta">
                        <button className="btn btn-warning btn-block social">
                            <i className="fa fa-instagram"></i>
                        </button>
                    </div>





                </div>
            </div>
        )
    }
}

$(document).ready(function () {




    $("body > *").not("body > .titleBar").click(function(e) {

        $("#searchResults").css('display','none')

    });


    var input = document.getElementById("myInput");

    if(input!=null){
        input.addEventListener("keyup", function(event) {

            event.preventDefault();
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Trigger the button element with a click
                document.getElementById("myBtn").click();
            }

        })

    }




})
export default withCookies(DummyTitle);

