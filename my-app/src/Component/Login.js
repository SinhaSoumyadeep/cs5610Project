import React from 'react'
import { Component } from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
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

    handleNameChange(profile, loggedInFrom) {
        const { cookies } = this.props;

        console.log(profile);
        cookies.set('profile', profile, { path: '/',maxAge: (1800)});
        cookies.set('isLoggedIn', true, { path: '/',maxAge: (1800) });

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


  handleSubmit = event => {
    alert("In submit function")
    var email = "Hello"
    var password = this.refs.password.value
    alert(email)
    alert(" " + password)
  }

  render() {

      const { name } = this.state;
    return (

      <div>

            <form   onSubmit={this.handleSubmit}>
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