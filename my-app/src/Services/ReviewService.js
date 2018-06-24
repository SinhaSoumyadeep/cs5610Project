import React from 'react'

let _singleton = Symbol();
const User_URL = 'http://localhost8080:/api/user';

export default class ReviewService{
    constructor(singletonToken){
        if(_singleton!==singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance(){
        if(!this[_singleton])
            this[_singleton] = new ReviewService(_singleton);
        return this[_singleton]
    }



    createReview(review,name) {
        return fetch("http://localhost:8080/api/review/" + name, {
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    findAllReviewsForABook(isbn) {
        return fetch("http://localhost:8080/api/review/" + isbn).then(function(response) {return response.json()})
    }

    likedBook(book) {
        return fetch("http://localhost:8080/api/like", {
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    findAllLikedBookForUser(userId) {
        return fetch("http://localhost:8080/api/findBooks/" + userId).then(function(response) {return response.json()})
    }

    deleteLikedBook(likedId) {

        return fetch("http://localhost:8080/api/like/"+likedId,
            {
                body: JSON.stringify({id: likedId}),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }
        )

    }

    fetchAllReviewsForReviewer(userId)
    {
        return fetch("http://localhost:8080/api/reviewedBooks/" + userId).then(function(response) {return response.json()})
    }


}