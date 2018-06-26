import React from 'react'
import "../CSS/heart.css"
import $ from 'jquery'
import ReviewService from "../Services/ReviewService";
import UserService from "../Services/UserService";

export default class FollowsButton extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            following:[]
        }
        this.userService = UserService.instance;

    }

    componentDidMount()
    {
        if(this.props.follower != undefined)
        {
            this.userService.findFollowing(this.props.follower).then((following)=>{

               following.map((user)=>{
                   if(user.id == this.props.following)
                   {
                       $(".follow-review").text("Following");
                   }
               })

            })
        }

    }

    follow(follower,following)
    {

        //alert(follower +" is following "+following)

        if($(".follow-review").text() == "Follow")
        {
           this.userService.follow(follower,following)

            $(".follow-review").text("Following");


        }
        else
        {
            this.userService.unfollow(follower,following)
            $(".follow-review").text("Follow");

        }




    }

    render()
    {
        return(
            <div class="follow-content">
                <button className="follow follow-review" onClick={()=>{this.follow(this.props.follower,this.props.following)}}>Follow</button>


            </div>

        )
    }
}

