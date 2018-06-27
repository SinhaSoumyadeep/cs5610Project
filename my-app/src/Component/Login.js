import React from 'react'
import { Component } from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import UserProfile from '../Container/UserProfile';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import UserService from '../Services/UserService';


class Login extends React.Component
{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

  constructor(props) {
    super(props);

    this.state = {
      user: {
        email : "",
        password : ""
      },
      email: "",
      password: "",
        profile: '',
        name:''
    };
    this.userService = UserService.instance;
    this.emailChanged = this.emailChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);

  }

    componentWillMount() {
        const { cookies } = this.props;

        this.setState({name: cookies.get('name') || 'Default user'})


    }

    handleNameChange(profile, loggedInFrom) {
        const { cookies } = this.props;

        console.log(profile);
        cookies.set('profile', profile, { path: '/',maxAge: (1800)});
        cookies.set('isLoggedIn', true, { path: '/',maxAge: (1800) });

        if(loggedInFrom == 'NU'){
          console.log("Hello");
          cookies.set('loggedInFrom','NU', { path: '/',maxAge: (1800) });
          if(profile.role == 'Reader')
          {
            cookies.set('isReader',true,{path: '/', maxAge: (1800)});
          }

          else if (profile.role == 'Reviewer'){

            cookies.set('isReviewer',true,{path: '/', maxAge: (1800)});
          }
          /*else if (profile.role == 'Publisher'){

              cookies.set('isPublisher',true,{path: '/', maxAge: (1800)});
          }*/


        }

        if(loggedInFrom == 'GL')
        {
            cookies.set('loggedInFrom','GL', { path: '/',maxAge: (1800) });
            cookies.set('isReader',true, { path: '/',maxAge: (1800) });
        }
        
        if (loggedInFrom == 'FB')
        {
            cookies.set('isReader',true, { path: '/',maxAge: (1800) });
            cookies.set('loggedInFrom','FB', { path: '/',maxAge: (1800) });
        }

        this.setState({ profile });
    }



  responseFacebook = (facebookUser)=>{
    console.log(facebookUser);
    if(facebookUser.id == undefined)
    {
        return
    }else {
        this.handleNameChange(facebookUser, "FB")
        console.log({accessToken: facebookUser.accessToken});
        window.location.reload()
    }

  }

  responseGoogle=(googleUser)=>{
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
    console.log(googleUser);
      this.handleNameChange(googleUser.profileObj, "GL")
    console.log({accessToken: id_token});
      window.location.reload()
  }

  handleLogin(email,password){
    var userEmail = email
    var userPassword = password
    console.log(email)
    console.log(password)
    this.state.user = {
      username: userEmail,
      password: userPassword   

    }


    if(email == ' '){
        this.infoMsgs("Username cannot be blank")
    }

    if(password == null){
        this.infoMsgs("Password cannot be blank")
    }

    if(email != null  && password != null){
      this.userService.loginUser(this.state.user).then((response)=>{
      if(response.id == 0){
          this.infoMsgs("Invalid Credentials.")



      }
      else{

        var user = {
            id: response.id,

            dateOfBirth: response.dateOfBirth,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            password: response.password,
            role: response.role,
            username: response.username,
            gender: response.gender,
            imageURL:'http://res.cloudinary.com/youpickone/image/upload/v1494829085/user-placeholder-image.png',
            bio: response.bio,
            category: response.category,
            coverPic: 'http://res.cloudinary.com/youpickone/image/upload/v1494829085/user-placeholder-image.png'
        }

        console.log(user);

      
      this.handleNameChange(user, "NU")
      window.location.reload()

      
        }
      });
    }
    

  }

  emailChanged(event){
   this.setState({
      email: event.target.value
    });
  }

  passwordChanged(event){
    this.setState({
     password: event.target.value
    })
  }

    infoMsgs(msg)
    {
        var x = document.getElementById("info")
        x.className = "show";

        if(!msg.startsWith("SUCCESSFULLY")){
            x.style.backgroundColor = "rgb(217, 56, 26)";
        }
        else
        {
            x.style.backgroundColor = "rgba(113, 217, 41, 1)";
        }
        x.innerHTML=msg;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2600);
    }


  render() {

      const { name } = this.state;
    return (

      <div>
      <form>
          <h3>Login</h3>


      <label>
      Username
      </label>

      <input onChange={this.emailChanged}
                         className="form-control" 
                         id="emailFld"
                         placeholder="Username" required={true}/>

      <label>
      Password
      </label>

      <input onChange = {this.passwordChanged}
             className = "form-control"
             id= "passwordFld"
             type = "password"
             placeholder =  "Password" required={true}/>
          <br/>
          <Button
            className = "btn btn-block btn-primary"
            onClick = {()=> {this.handleLogin(this.state.email,this.state.password)}}>

            Login
          </Button>
          <div>

              <GoogleLogin
                  clientId="82907325524-jfg57300vs7m0300cs7uk6pvekjckq39.apps.googleusercontent.com"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  buttonText={<span
                      className="fa fa-google-plus ">&nbsp;&nbsp;&nbsp;&nbsp; Login with Google </span>}
                  style={{marginLeft: 0, marginRight: 5, width: 465, fontWeight: "bold"}}
                  icon="fa fa-google-plus-g"
                  className="btn btn-danger">
              </GoogleLogin>
              <FacebookLogin
                  appId="202947930333909"
                  fields="first_name,last_name,gender,birthday,email,picture"
                  textButton={<span> &nbsp;&nbsp;&nbsp;&nbsp; Login with Facebook </span>}
                  callback={this.responseFacebook}
                  cssClass="my-facebook-button-class btn btn-primary"
                  buttonStyle={{marginLeft: 0, marginRight: 5, width: 465, backgroundColor: "#3B5998"}}
                  icon="fa-facebook-square"
                  className="btn btn-primary"
              />

          </div>
            </form>
            </div>

    );
  }




}
export default withCookies(Login);