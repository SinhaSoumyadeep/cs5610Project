import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import  '../node_modules/font-awesome/css/font-awesome.min.css'
import RegisterContainer from "./Container/RegisterContainer";


ReactDOM.render(

    <div className="container-fluid">
        <RegisterContainer/>
    </div>
    ,
    document.getElementById('root')
);
