import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import  '../node_modules/font-awesome/css/font-awesome.min.css'
import BookStore from "./Container/BookStore";
import './CSS/style.css'
import { CookiesProvider } from 'react-cookie';



ReactDOM.render(

    <div className="container-fluid">
        <CookiesProvider>
        <BookStore/>
        </CookiesProvider>

    </div>
    ,
    document.getElementById('root')
);
