import React from 'react'

let _singleton = Symbol();
const User_URL = 'https://book-worms-server.herokuapp.com/api/user';

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

    deleteReview(reviewId){
        //alert("Here" + reviewId)
    return fetch("https://book-worms-server.herokuapp.com/api/review/" + reviewId , {
      method: 'Delete'
     })
    }

    deleteBlog(blogId){
    return fetch("https://book-worms-server.herokuapp.com/api/bloger/" + blogId , {
      method: 'Delete'
     })
    }

    findBlogsforUser(bloggerId){
        return fetch("https://book-worms-server.herokuapp.com/api/blogger/" + bloggerId)
        .then(function(response) {return response.json()})

    }

    createBlog(blog,name) {

        console.log(blog.bloggerId)
        console.log("name"+name)
        return fetch("https://book-worms-server.herokuapp.com/api/blog/" + name, {
             body: JSON.stringify(blog),
            headers: {
                 'Content-Type': 'application/json'
             },
             method: 'POST'
         }).then(function (response) {
             return response.json();
         })
    }

    createReview(review,name) {
        return fetch("https://book-worms-server.herokuapp.com/api/review/" + name, {
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
        return fetch("https://book-worms-server.herokuapp.com/api/review/" + isbn).then(function(response) {return response.json()})
    }

    findAllReviews(){
        return fetch("https://book-worms-server.herokuapp.com/api/reviews")
      .then(function(response){
        return response.json();
      });
    }

    findAllBlogs(){
        return fetch("https://book-worms-server.herokuapp.com/api/blog")
      .then(function(response){
        return response.json();
      });
    }

     findAllReviews(){
        return fetch("https://book-worms-server.herokuapp.com/api/reviews")
      .then(function(response){
        return response.json();
      });
    }

    likedBook(book) {
        return fetch("https://book-worms-server.herokuapp.com/api/like", {
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
        return fetch("https://book-worms-server.herokuapp.com/api/findBooks/" + userId).then(function(response) {return response.json()})
    }

    deleteLikedBook(likedId) {

        return fetch("https://book-worms-server.herokuapp.com/api/like/"+likedId,
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
        return fetch("https://book-worms-server.herokuapp.com/api/reviewedBooks/" + userId).then(function(response) {return response.json()})
    }

    updateBlog(blogId,blog){
            var postObject = {method: 'put',body: JSON.stringify(blog),headers: {'content-Type': 'application/json','dataType':'json'} }
    return fetch("https://book-worms-server.herokuapp.com/api/blog/"+blogId, postObject);
    }


}