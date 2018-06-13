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

                    <img src="data:image/jpeg;base64,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"
                         height="45px" width="121px"
                    />

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

