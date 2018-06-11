import React,{Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styles from '../Style/Register.css';


export default class Register
    extends Component{
    render(){
    return(
        <div className="container-fluid">
            <h4 className="display-4" align="center" style="color:white;">Welcome to BOOKWORMS</h4>
            <hr/>
            <br/>
            <form className="form-horizontal" role="form">
                <h3 className="display-5" align="center">Register</h3><hr/>
                <div className="form-row">
                    <div className="col form-group">
                        <label><b>FIRST NAME</b> </label>
                        <input type="text" id="firstNameFld" className="form-control" placeholder="First Name"/>
                    </div>
                    <div className="col form-group">
                        <label><b>LAST NAME</b></label>
                        <input type="text" id="lastNameFld" className="form-control" placeholder="Last Name"/>
                    </div>
                </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>USERNAME</b></label>
            <div className="col-sm-9">
                <input className = "form-control" id="userNameFld" placeholder = "Username"/>
            </div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>EMAIL</b></label>
                <div className="col-sm-9">
                    <input className = "form-control" id="emailFld" placeholder = "Email"/>
                </div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>PASSWORD</b></label>
                <div className="col-sm-9">
                    <input className = "form-control" id="passwordFld" type="password" placeholder = "Password"/>
                </div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>CONFIRM PASSWORD</b></label>
                <div className="col-sm-9">
                    <input className = "form-control" id="confirmPasswordFld" type="password" placeholder = "Retype Password"/>
                </div></div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"><b>GENDER</b></label>
                <div className="form-group">
                    <label className="form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value="Male"/>
                            <span className="form-check-label"> Male </span>
                    </label>
                    <label className="form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value="Female"/>
                            <span className="form-check-label"> Female </span>
                    </label>
                </div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>DATE OF BIRTH</b></label>
                <div className="col-sm-9">
                    <input type="date" id="dob" id="dobFld" className ="form-control" placeholder = "Date of Birth"/>
                </div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>ROLE</b></label>
                <div className="col-sm-9" >
                    <select className="custom-select" className="form-control" id="roleFld">
                        <option selected="selected" value="Reader">Reader</option>
                        <option value="Author">Author</option>
                        <option value="Reviewer">Reviewer</option>
                        <option value="Publisher">Publisher</option>
                    </select>
                </div></div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary btn-block">REGISTER</button>
                    </div>
                </div>
            </form>
            <br/>
        <hr/>
        </div>



            )}
}
