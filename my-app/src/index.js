import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import  '../node_modules/font-awesome/css/font-awesome.min.css'
import LoginContainer from "./Container/LoginContainer";








ReactDOM.render(

    <div className="container-fluid">
        <LoginContainer/>
    </div>
    ,
    document.getElementById('root')
);
