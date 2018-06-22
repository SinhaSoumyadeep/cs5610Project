import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import $ from 'jquery';
import SearchRow from "./SearchRow";
import logo from "../Style/BookWorm_Logo_2016_small.png"
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Trigger from "./Trigger";



class SearchContainer
    extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props)
        this.hidesearch = this.hidesearch.bind(this);
        this.Search = this.Search.bind(this);
        this.state = {

            books: [],
            err: false,
            profile: '',
            isLoggedIn: false,
            picture:'',
            loggedInFrom: 'BW',
            picture: {data: {url: ''}}


        };
    }

    componentWillMount() {
        const { cookies } = this.props;

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


            try {
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
            }
            catch(err) {
                alert("error4")
                this.setState({ err: true })
            }


        })




    }










    render() {

        if (this.state.err) {
            return <Redirect to='/error'/>;
        }
        return (
            <div className="titleBar">
                <div className="logo">
                    <a href="/books">
                    <img src={logo}
                    height="45px" width="121px"
                    />

                    </a>

                </div>
                <div className="searchBar">

                    <input id="myInput" className="form-control"  placeholder="Find Books" ref="searchKey" onChange={this.hidesearch}/>

                    <div id="searchResults" style={{display: "none"}}>
                        <table className="table">
                            <tbody>

                            </tbody>
                        </table>


                    </div>

                </div>
                <div className="searchBtn">
                    <button className="btn btn-warning btn-block" id="srchBtnhit" onClick={this.Search}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
                <div className="login">
                    <a href="/books" hidden={!this.state.isLoggedIn} onClick={()=>{

                        const { cookies } = this.props;
                        cookies.remove('profile',{ path: '/' });
                        cookies.remove('isLoggedIn',{ path: '/' });
                        cookies.remove('loggedInFrom',{ path: '/' });
                        cookies.remove('isReviewer',{ path: '/' });
                        cookies.remove('isReader',{ path: '/' });

                    }}>LogOut</a>

                       <span style={{float: "left", marginRight: "5px"}} hidden={this.state.isLoggedIn}><Trigger buttonLabel={"Login"} type={"login"}/></span>
                    <span style={{float: "left"}} hidden={this.state.isLoggedIn}><Trigger buttonLabel={"SignUp"} type={"register"}/></span>

                    <Link to={`/profile`}>


                        {this.state.loggedInFrom == 'GL'&&
                            <img className="loggedInUsr" src={this.state.profile.imageUrl}
                            height="40px"
                            hidden={!this.state.isLoggedIn}
                            />
                        }
                        {this.state.loggedInFrom == 'FB'&&
                        <img className="loggedInUsr" src={this.state.profile.picture.data.url}
                             height="40px"
                             hidden={!this.state.isLoggedIn}
                        />
                        }





                    </Link>


                </div>
                <div className="extra">


                    <div className="socialFace">
                        <button className="btn btn-warning btn-block social">
                            <i style={{color: "black"}} className="fa fa-facebook"></i>
                        </button>
                    </div>
                    <div className="socialTwitter">
                        <button className="btn btn-warning btn-block social">
                            <i style={{color: "black"}} className="fa fa-twitter"></i>
                        </button>
                    </div>
                    <div className="socialInsta">
                        <button className="btn btn-warning btn-block social">
                            <i style={{color: "black"}} className="fa fa-instagram"></i>
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
                document.getElementById("srchBtnhit").click();
            }

        })

    }




})
export default withCookies(SearchContainer);

