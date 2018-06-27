
import React from 'react'

let _singleton = Symbol();
const EVENT_API_URL = 'https://book-worms-server.herokuapp.com/api/eventcard';

class EventCardService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new EventCardService(_singleton);
        return this[_singleton]
    }


    findAllEventCards() {
        return fetch(EVENT_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findEvenCardById(eventId){
        return fetch(EVENT_API_URL + '/' + eventId)
            .then(function (response) {return response.json();});

    }

    deleteEventCard(eventId){

        return fetch(EVENT_API_URL + '/' +eventId , {
            method: 'Delete'
        })
    }



    createEventCard(event) {
        return fetch(EVENT_API_URL, {
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}


        findAllEventCardForPublisher(publisherId)
        {
           return fetch(EVENT_API_URL + "/publisher/" + publisherId)
               .then(function(response) {
                   return response.json()})
        }

}
export default EventCardService;