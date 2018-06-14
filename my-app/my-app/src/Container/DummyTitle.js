import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery';
import SearchRow from "./SearchRow";


export default class DummyTitle
    extends Component {






    render() {
        return (
            <div className="titleBar">
                <div className="logo">
                    <a href="/books">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" height="45px" width="121px"
                         onClick={this.goBack}/>
                    </a>

                </div>
                <div className="searchBar" id="dummysearch" style={{color: "black"}}>

                <h1>hsjdfkdshfkshfkhbjbjhgjhgjhggjgjgj</h1>
                </div>
                <div className="searchBtn" id="dummysearch" style={{color: "black"}}>
                        <h1>dsjhgfjsdh</h1>
                </div>
                <div className="login">
                    <Link to={`/login`}>
                        <a>Login</a>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to={`/register`}>
                        <a>SignUp</a>
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

