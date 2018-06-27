import React,{Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styles from '../Style/Register.css';
import UserService from '../Services/UserService'
import  $ from "jquery";

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
        this.userService = UserService.instance;
        this.checkUsername = this.checkUsername.bind(this);
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

    checkUsername(username,callback){
        var result1;
        this.userService.findByUsername(username)
            .then((response)=>{
                var result = response.exists;
                if(result == " true" ) {
                    this.infoMsgs("Username Unavailable")
                    result1 = "true"
                } else {
                    callback();
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
        var verifyPassword1 = this.refs.verifyPassword.value;
        var role1 = this.refs.role.value;
        var dob1 = this.refs.dob.value;

        //var results = this.checkUsername(this.refs.userName.value)

        //console.log(results);
        if(this.refs.password.value == ''){
            this.infoMsgs("Password cannot be blank")
            return
        }

        if(password1 == verifyPassword1 ) {

            this.state.user = {
                firstName: firstName1,
                lastName: lastName1,
                username: userName1,
                password: password1,
                email: email1,
                gender: gender1,
                role: role1,
                dateOfBirth: dob1
            }


        return fetch("https://book-worms-server.herokuapp.com/api/user", {
            body: JSON.stringify(this.state.user),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(function (response) {
                return response.json()
            }).then(() => {window.location.reload()});
        }
        else {
            this.infoMsgs('Check Password and Confirm Password')
         }    
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

    render(){
    return(
        <div className="container-fluid">
            <form className="form-horizontal" role="form">
                <h3 className="display-5" align="center">Register</h3><hr/>
                <div className="form-row">
                    <div className="col form-group">
                        <label><b>FIRST NAME</b> </label>
                        <input type = "text" className="form-control" placeholder="First Name" ref="firstName" required={true}
                        />
                    </div>
                    <div className="col form-group">
                        <label><b>LAST NAME</b></label>
                        <input className="form-control" placeholder="Last Name" required={true}
                               ref="lastName"
                               />
                    </div>
                </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>USERNAME</b></label>
            <div className="col-sm-9">
                <input className = "form-control" placeholder = "Username" ref="userName" required={true}/>
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
                    <input className = "form-control" type="password" placeholder = "Password" ref="password" required={true}/>
                </div></div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label"><b>CONFIRM PASSWORD</b></label>
                <div className="col-sm-9">
                    <input className = "form-control"  type="password" placeholder = "Retype Password" ref="verifyPassword" required={true}/>
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
                    <select className="custom-select" className="form-control" id="roleFld" ref="role" required={true}>
                        <option selected="selected" value="Reader">Reader</option>
                        <option value="Author">Author</option>
                        <option value="Reviewer">Reviewer</option>
                        <option value="Publisher">Publisher</option>
                    </select>
                </div></div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <button id = "registrationButton" className="btn btn-primary btn-block"
                                onClick = {() => this.checkUsername(this.refs.userName.value,this.createUser)}>REGISTER</button>
                    </div>
                </div>
            </form>
            <br/>

        </div>
    )

}
}
