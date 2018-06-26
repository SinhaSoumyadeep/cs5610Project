import React from 'react';
import FollowerContainer from "./FollowerContainer";
import FollowingContainer from "./FollowingContainer";

export default class WishListContainer extends React.Component {

    render()
    {
        return(
            <div>
                <div  >
                     <FollowingContainer userId={this.props.userId}/>
                </div>
                <div >
                     <FollowerContainer userId={this.props.userId}/>
                </div>

            </div>
        )
    }
}