import React from 'react'

let _singleton = Symbol();
const User_URL = 'https://book-worms-server.herokuapp.com/api/user';
//const User_URL = 'http://localhost:8080/api/user';

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

    loginUser(user){
        console.log(user.email)
        console.log("Inside Login")
        console.log(user.password);
        var postObject = {method: 'post',
            body: JSON.stringify(user),
            headers: {'content-Type': 'application/json',
                'dataType':'json'} }
         return fetch('https://book-worms-server.herokuapp.com/api/login', postObject).then(function (response) {return response.json();});
    }


    addTopic(topicName){
        console.log("Topic Name:" +topicName)
        var topic = {
            topicName: topicName
        }
        
    return fetch("https://book-worms-server.herokuapp.com/api/topic",
      {
        body: JSON.stringify(topic),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(function (response) {
      return response.json();
    })

    }

    deleteTopic(topicId){
    return fetch("https://book-worms-server.herokuapp.com/api/topic/" + topicId , {
      method: 'Delete'
    })
    }

    findAlltopics() {
    return fetch("https://book-worms-server.herokuapp.com/api/topic")
      .then(function(response){
        return response.json();
      });
  }


    findByUsername(username){
        return fetch("https://book-worms-server.herokuapp.com/api/profile/" + username, {
            body: JSON.stringify(username),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response){return response.json()})
    }
    }

