import React from 'react';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import ReviewService from "../Services/ReviewService";

import UserService from "../Services/UserService";

class FollowerContainer extends React.Component {



    constructor(props)
    {
        super(props);

        this.state = {
            follower:[]
        }
        this.userService = UserService.instance;


    }

    componentDidMount(){

        this.userService.findFollower(this.props.userId).then((follower)=>{

            this.setState({follower: follower})
        })

    }

    findFollower()
    {
        var rows = this.state.follower.map((follower) => {

            return (

                <div style={{float: "left",textAlign: "center",margin: "5px"}}>
                    <div>
                        <a href={"/profile/"+follower.id}>
                            <img src={"https://s3.amazonaws.com/bookwormstest/"+follower.coverPic} style={{height: "61px", width: "61px",borderRadius: "91px"}}/></a>
                        <h6>{follower.firstName+" "+follower.lastName} </h6>
                    </div>

                </div>

            )

        });
        return (
            rows
        )
    }



    render(){


        return(

            <div className="form-control followerContainer">
                <h5>Follower</h5>
                {this.findFollower()}
            </div>
        )





    }
}
export default FollowerContainer;

