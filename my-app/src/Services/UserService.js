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


    findAllUsers() {
        return fetch("https://book-worms-server.herokuapp.com/api/user")
            .then(function(response){
                return response.json();
            });
    }

    findUserById(userId) {
        return fetch("https://book-worms-server.herokuapp.com/api/user/"+userId)
            .then(function(response){
                return response.json();
            });
    }


    findByUsername(username){
        return fetch("https://book-worms-server.herokuapp.com/api/users/" + username)
        .then(function(response){
                return response.json();
            });
    
    }

    findBySrchKey(srchKey){
        return fetch("https://book-worms-server.herokuapp.com/api/searchuser", {
            body: JSON.stringify(srchKey),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function(response){return response.json()})
    }

    follow(followerId,followingId)
    {
        return fetch("https://book-worms-server.herokuapp.com/api/user/"+followerId+"/"+followingId)

    }

    unfollow(followerId,followingId)
    {
        return fetch("https://book-worms-server.herokuapp.com/api/unfollow/"+followerId+"/"+followingId)

    }

    findFollower(userId) {
        return fetch("https://book-worms-server.herokuapp.com/api/findfollowers/"+userId)
            .then(function(response){
                return response.json();
            });
    }

    findFollowing(userId) {
        return fetch("https://book-worms-server.herokuapp.com/api/findfollowing/"+userId)
            .then(function(response){
                return response.json();
            });
    }
}

