import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery';
import SearchRow from "./SearchRow";
import logo from "../Style/logo.png"


export default class SearchContainer
    extends Component {


    constructor() {
        super()
        this.hidesearch = this.hidesearch.bind(this);
        this.Search = this.Search.bind(this);
        this.state = {

            books: []

        };
    }

    hidesearch(event)
    {
        var key = event.target.value
        console.log(key)
        if(key == '')
        {
            $('#searchResults').css('display','none')
        }
    }




    Search()
    {


        var srchKey = this.refs.searchKey.value;
        console.log(srchKey);
        if($('#searchResults').css('display') == 'none')
        {
            $('#searchResults').css('display','')

        }

        $("tbody").empty();
        $.get("https://www.googleapis.com/books/v1/volumes?q="+srchKey,function (response) {

            console.log(response)
            response.items.slice(0, 20).map((item,index)=>{


                //console.log(item.volumeInfo.industryIdentifiers[0].identifier)
                //console.log(item.volumeInfo.industryIdentifiers[0].identifier)
                var keys = Object.keys(item.volumeInfo);
                //console.log(keys)

                if(keys.indexOf("imageLinks")<0||keys.indexOf("industryIdentifiers")<0)
                {

                }
                else
                {

                    var $row = $('<tr class="wbdv-template wbdv-user wbdv-hidden" id="trow['+item.index+']">'+

                        '<div style="height: 12px"></div>'+
                        '<td style="padding: 20px" id="thumbnail['+item.index+']"><a href="/bookDetails/'+item.volumeInfo.industryIdentifiers[0].identifier+'" style="color: black"><img src='+item.volumeInfo.imageLinks.thumbnail+' height="82"/></a></td>'+
                        '<td style="padding: 20px" id="title['+item.index+']"><a href="/bookDetails/'+item.volumeInfo.industryIdentifiers[0].identifier+'" style="color: black">'+item.volumeInfo.title+'</a></td>'+
                        '</tr>');

                    $('table> tbody:last').append($row);

                }





            })

        })




    }










    render() {
        return (
            <div className="titleBar">
                <div className="logo">
                    <a href="/books">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                    height="45px" width="121px"
                    />
                    </a>

                </div>
                <div className="searchBar">

                    <input id="myInput" className="form-control" ref="searchInput" placeholder="Find Books" ref="searchKey" onChange={this.hidesearch}/>

                    <div id="searchResults" style={{display: "none"}}>
                        <table className="table">
                            <tbody>

                            </tbody>
                        </table>


                    </div>

                </div>
                <div className="searchBtn">
                    <button className="btn btn-warning btn-block" id="myBtn" onClick={this.Search}>
                        <i className="fa fa-search"></i>
                    </button>
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

