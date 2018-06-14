import React,{Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styles from '../Style/Register.css';
import UserService from '../Services/UserService'

export default class Register
    extends Component{
    constructor(props){
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
        this.createUser = this.createUser.bind(this);
        this.handleChange = this.handleChange.bind(this);

        /*this.onChangeValue = this.onChangeValue.bind(this);*/

    }


    handleChange(event){
        const { name, value} = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]:value
            }
        });
    }



    createUser(){

        var firstName1= this.refs.firstName.value
        var lastName1 = this.refs.lastName.value;
        var userName1 = this.refs.userName.value;
        var password1 = this.refs.password.value;
        var email1 = this.refs.email.value;
        var gender1 = this.refs.gender.value;
        var verify1Password = this.refs.verifyPassword.value;
        var role1 = this.refs.role.value;
        var dob1 = this.refs.dob.value;

        this.state.user = {firstName:firstName1,
                            lastName:lastName1,
                            username:userName1,
                            password:password1,
                            email:email1,
                            gender:gender1,
                            role:role1,
                            dateOfBirth:dob1}



        return fetch("http://book-worms-server.herokuapp.com/api/user", {
            body: JSON.stringify(this.state.user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response){return response.json()})
    }

    render(){
    return(
        <div className="container-fluid">
            <h4 className="display-4" align="center">Welcome to BOOKWORMS</h4>
            <hr/>
            <br/>
            <form className="form-horizontal" role="form">
                <h3 className="display-5" align="center">Register</h3><hr/>
                <div className="form-row">
                    <div className="col form-group">
                        <label><b>FIRST NAME</b> </label>
                        <input type = "text" className="form-control" placeholder="First Name" ref="firstName"/>
                    </div>
                    <div className="col form-group">
                        <label><b>LAST NAME</b></label>
                        <input className="form-control" placeholder="Last Name"
                               ref="lastName"
                               />
                    </div>
                </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>USERNAME</b></label>
            <div className="col-sm-9">
                <input className = "form-control" placeholder = "Username" ref="userName"/>
            </div></div>
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
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>CONFIRM PASSWORD</b></label>
                <div className="col-sm-9">
                    <input className = "form-control"  type="password" placeholder = "Retype Password" ref="verifyPassword"/>
                </div></div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"><b>GENDER</b></label>
                    <div className="col-sm-9" >
                        <select className="custom-select" className="form-control" id="genderFld" ref="gender">
                            <option selected="selected" value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select></div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>DATE OF BIRTH</b></label>
                <div className="col-sm-9">
                    <input type="date" id="dob" id="dobFld" className ="form-control" placeholder = "Date of Birth" ref="dob"/>
                </div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>ROLE</b></label>
                <div className="col-sm-9" >
                    <select className="custom-select" className="form-control" id="roleFld" ref="role">
                        <option selected="selected" value="Reader">Reader</option>
                        <option value="Author">Author</option>
                        <option value="Reviewer">Reviewer</option>
                        <option value="Publisher">Publisher</option>
                    </select>
                </div></div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <button className="btn btn-primary btn-block"
                        onClick={this.createUser}>REGISTER</button>
                    </div>
                </div>
            </form>
            <br/>
        <hr/>
        </div>
    )
    }
}
