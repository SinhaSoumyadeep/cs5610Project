import React from 'react';
import EventCard from "../Component/EventCard";
import EventCardService from "../Services/EventCardServices";
import {Cookies} from "react-cookie";
import { instanceOf } from 'prop-types';

class EventCardList extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor() {
        super();
        this.eventCardService = EventCardService.instance;
        this.deleteEventCard = this.deleteEventCard.bind(this);
        this.createEventCard = this.createEventCard.bind(this);
        this.state = {eventCards : []};

    }

    deleteEventCard(eventCardId){
        this.eventCardService.deleteEventCard(eventCardId).then(() => { this.findAllEventCards(); });
    }

    componentDidMount() {
        this.findAllEventCards();
    }
    findAllEventCards() {
        this.eventCardService
            .findAllEventCards()
            .then((response) => {
                console.log(response);
                this.setState({eventCards: response});
            })
    }
    renderEventCards() {
        let eventCards = null;

        console.log("Rendering Event cards")
        console.log(this.state)
        if(this.state) {
            eventCards = this.state.eventCards.map(
                (eventCard) => {
                    return(
                            <EventCard eventCard={eventCard}
                                       key={eventCard.id}
                                       delete={this.deleteEventCard}
                            />

                    )
                }
            )
        }
        return (
            eventCards
        )
    }

    createEventCard() {
        this.state.eventCard = {
            title: this.refs.title.value,
            dateOfEvent: this.refs.dateOfEvent.value
        }
        this.eventCardService
            .createEventCard(this.state.eventCard)
            .then(() => { this.findAllEventCards(); });
    }
    render() {
        return (
            <div class = "eventCardList">
                <br/><h3>Add Event Reminders:</h3>
                        <p>DATE:<input onChange={this.dateChanged}
                               className="form-control col-7" id="dateFld"
                                       type="date" ref="dateOfEvent"/></p>
                        <p>NAME:<input onChange={this.titleChanged}
                                   className="form-control col-7" id="titleFld"
                                   placeholder="Enter Event Details" ref="title"/>
                    <button onClick={this.createEventCard}
                                    className="btn btn-primary"
                                    align="right">
                        Add Event</button></p>
                <hr/>
                <div className="eventcardContainer">
                <div className = "card-deck">

                    {this.renderEventCards()}
                </div>
                </div>
            </div>
        )
    }
}
export default EventCardList;
