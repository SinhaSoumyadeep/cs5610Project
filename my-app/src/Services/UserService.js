import React from 'react'

let _singleton = Symbol();
const User_URL = 'http://localhost8080:/api/user';

export default class UserService{
    constructor(singletonToken){
        if(_singleton!==singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }



    createUser(user){
        return fetch(User_URL, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response){
            return response.json();
        })}
}