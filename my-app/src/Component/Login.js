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

          else if(profile.role == 'Author'){
            //alert("Here I am")
            cookies.set('isAuthor',true,{path: '/', maxAge: (1800)});
          }

          else if(profile.role == 'admin'){
            cookies.set('isAdmin',true,{path: '/', maxAge: (1800)})
          }

          // else if(profile.role == 'Publisher'){
          //   cookies.set('isPublisher',true,{path: '/', maxAge: (1800)});
          // }




        }

        if(loggedInFrom == 'GL')
        {
            cookies.set('loggedInFrom','GL', { path: '/',maxAge: (1800) });
            cookies.set('isReader',true, { path: '/',maxAge: (1800) });
        }
        
        if (loggedInFrom == 'FB')
        {
            cookies.set('isReviewer',true, { path: '/',maxAge: (1800) });
            cookies.set('loggedInFrom','FB', { path: '/',maxAge: (1800) });
        }

        this.setState({ profile });
    }



  responseFacebook = (facebookUser)=>{
    console.log(facebookUser);
      this.handleNameChange(facebookUser, "FB")
      console.log({accessToken: facebookUser.accessToken});
      window.location.reload()

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
    this.state.user = {
      email: userEmail,
      password: userPassword   

    }
    console.log("Handle Login")
    console.log("Email: " + userEmail)
    console.log("Password: " + userPassword)
    this.userService.loginUser(this.state.user).then((response)=>{
      if(response.id == 0){
        alert("Invalid Credentials.")

      }
      else{

        var user = {
          date_of_birth: response.dateOfBirth,
          email: response.email,
          first_name: response.firstName,
          last_name: response.lastName,
          password: response.password,
          role: response.role,
          username: response.username,
          gender: response.gender,
          imageURL: 'http://res.cloudinary.com/youpickone/image/upload/v1494829085/user-placeholder-image.png'
         }

        console.log(user);

      
      this.handleNameChange(user, "NU")
      window.location.reload()

      
        }
      });

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

  render() {

      const { name } = this.state;
    return (

      <div>
      <form>
      <label>
      Email
      </label>
      <input onChange={this.emailChanged}
                         className="form-control" 
                         id="emailFld"
                         placeholder="Email"/>
      <label>
      Password
      </label>
      <input onChange = {this.passwordChanged}
             className = "form-control"
             id= "passwordFld"
             type = "password"
             placeholder =  "Password"/>
          <br/>
          <Button
            className = "btn btn-block btn-primary"
            onClick = {()=> {this.handleLogin(this.state.email,this.state.password)}}>
            Login
          </Button>
          <div>

           <GoogleLogin
    clientId="82907325524-jfg57300vs7m0300cs7uk6pvekjckq39.apps.googleusercontent.com"
    button className = "btn btn-block btn-danger"
    buttonText="Login With Gmail"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
  />
          </div>

          <br/>
          <div>
           <FacebookLogin
    appId="202947930333909"
    autoLoad={false}
    button className = "btn btn-block btn-primary"
    buttonText="Login With Facebook"
    fields="name,email,picture"
    callback={this.responseFacebook}
  />
          </div>
            </form>
            </div>

    );
  }




}
export default withCookies(Login);