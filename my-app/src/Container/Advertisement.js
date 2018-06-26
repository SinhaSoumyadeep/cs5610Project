import React, {Component} from 'react';
import { UncontrolledCarousel } from 'reactstrap';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import EventService from "../Services/EventService";
import "../CSS/blog.css"


export default class Advertisement extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            profile: '',
            events: []
        }
        this.eventService = EventService.instance;
    }

    componentDidMount() {
        this.eventService.findAllEvents()
            .then((response) => {
                this.setState({events: response})
            });
    }

    EventList() {
        var eventList = this.state.events.map((event) => {
            return (
                <img src={"https://s3.amazonaws.com/bookwormstest/" + event.event_imgURL} height="286rem" width="315px"/>
            )
        });
        return (eventList);
    }

    render() {
        return(
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    {this.EventList()}
                </div>
            </div>
        </div>
        )
    }
}



