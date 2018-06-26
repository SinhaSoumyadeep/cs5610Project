import React from 'react';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import ReviewService from "../Services/ReviewService";

import UserService from "../Services/UserService";

class FollowingContainer extends React.Component {



    constructor(props)
    {
        super(props);

        this.state = {
           following:[]
        }
        this.userService = UserService.instance;


    }

    componentDidMount(){
        this.userService.findFollowing(this.props.userId).then((following)=>{

            this.setState({following: following})
        })

    }

    findFollowing()
    {
        var rows = this.state.following.map((following) => {

            return (

                <div style={{float: "left",textAlign: "center",margin: "5px"}}>
                    <div>
                        <a href={"/profile/"+following.id}>
                        <img src={"https://s3.amazonaws.com/bookwormstest/"+following.coverPic} style={{height: "61px", width: "61px",borderRadius: "91px"}}/></a>
                            <h6>{following.firstName+" "+following.lastName} </h6>
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

                <div className="form-control followingContainer">
                    <h5>Following</h5>
                    {this.findFollowing()}
                </div>
            )





    }
}
export default FollowingContainer;

