import React from 'react'

let _singleton = Symbol();
const EVENT_URL = 'https://book-worms-server.herokuapp.com/api/event';

export default class EventService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EventService(_singleton);
        return this[_singleton]
    }


    createEvent(event) {
        return fetch(EVENT_URL, {
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }
}