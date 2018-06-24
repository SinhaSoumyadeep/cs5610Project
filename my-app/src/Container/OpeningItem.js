import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

 class OpeningItem extends React.Component{
  
  static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };



  constructor(props) {
    super(props);
    this.state = {
      profile : ''

    }
  }

  componentDidMount(){
    const { cookies } = this.props;
    console.log(cookies.get('profile'));
    this.setState({profile: cookies.get('profile')})
    console.log(this.state.profile)
  }

  

  render() {
  	return(
  			<li className = "list-group-item">
  			 <a ><i className="fa fa-get-pocket"></i>&nbsp;&nbsp;{this.props.topic.topicName}</a>        
          {this.state.profile != undefined &&
            this.state.profile.role == 'admin' &&
          <span className="float-right">
           <i className="fa fa-times" style={{cursor: "pointer"}} 
           onClick = {()=> {this.props.deleteTopic(this.props.topic.id)}}>
           </i>
        </span>}    

        </li>        
  		);
  }

}

export default withCookies(OpeningItem);