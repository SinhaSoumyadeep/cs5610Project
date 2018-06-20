import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery';
import SearchRow from "./SearchRow";
import logo from "../Style/BookWorm_Logo_2016_small.png"
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

            books: [],
            err: false,
            profile: '',
            isLoggedIn: false,
            picture:'',
            loggedInFrom: 'BW'


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






    render() {
        return (
            <div className="titleBar">
                <div className="logo">
                    <a href="/books">
                    <img src={logo} height="45px" width="121px"
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


export default withCookies(DummyTitle);

