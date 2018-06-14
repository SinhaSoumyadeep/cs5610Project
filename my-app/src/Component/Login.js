import React from 'react'
import { Component } from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import '../Style/LoginStyle.css'

export default class Login extends React.Component
{

  constructor(props) {
    super(props);

     this.state = {
            user : {
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                role: "",
                gender: "",
                dateOfBirth: "",
                email: ""
            }
        }
  }

  responseFacebook(facebookUser){
    console.log(facebookUser);
  }

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
    console.log(googleUser);
    console.log({accessToken: id_token});
  }


  handleSubmit = event => {
    alert("In submit function")
    var email = "Hello"
    var password = this.refs.password.value
    alert(email)
    alert(" " + password)
  }

  render() {
    return (
      <div className = 'container-fluid'>
      <div id = "login-header">
      <h1 align = "center">LOGIN</h1>
      </div>
      <div id="loginPage">
            <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
           <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>EMAIL</b></label>
                <div className="col-sm-9">
                    <input className = "form-control"  placeholder = "Email" ref="email"
                    />
                </div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>PASSWORD</b></label>
                <div className="col-sm-9">
                    <input className = "form-control" type="password" placeholder = "Password" ref="password"/>
                </div></div>      
          <Button
            className = "btn btn-block btn-primary"           
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