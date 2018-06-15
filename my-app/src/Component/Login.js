import React from 'react'
import { Component } from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import '../Style/LoginStyle.css'
import UserProfile from '../Container/UserProfile';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Login extends React.Component
{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
        profile: '',
        name:''
    };
  }

    componentWillMount() {
        const { cookies } = this.props;

        this.setState({name: cookies.get('name') || 'Default user'})


    }

    handleNameChange(profile) {
        const { cookies } = this.props;

        cookies.set('profile', profile, { path: '/' });
        cookies.set('isLoggedIn', true, { path: '/' });
        cookies.set('isReader',true, { path: '/' });
        this.setState({ profile });
    }

  responseFacebook(facebookUser){
    console.log(facebookUser);
  }

  responseGoogle=(googleUser)=>{
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
    console.log(googleUser);
      this.handleNameChange(googleUser.profileObj)
    console.log({accessToken: id_token});
      window.location.replace("/books")
  }


  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {

      const { name } = this.state;
    return (
      <div className = 'container-fluid'>
      <div id = "login-header">
      <img className="loginProfileImage" src={this.state.profile.imageUrl}/>
      </div>
      <div id="loginPage">
            <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                 <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            className = "btn btn-block btn-primary"           
            disabled={!this.validateForm()}
            type="submit">
            Login
          </Button>

          <br/>

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
    autoLoad={true}
    button className = "btn btn-block btn-primary"
    buttonText="Login With Facebook"
    fields="name,email,picture"
    callback={this.responseFacebook}
  />
          </div>
            </form>
            </div>
      </div>
    );
  }




}
export default withCookies(Login);