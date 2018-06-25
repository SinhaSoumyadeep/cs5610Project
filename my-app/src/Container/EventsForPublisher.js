import React from 'react';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import EventService from "../Services/EventService";
import "../CSS/blog.css"

class EventsForPublisher extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props)

    {
        super(props);

        this.state = {
            profile: '',
            events: []
        }
        this.eventService = EventService.instance;

    }

    componentDidMount(){
        const { cookies } = this.props;
        this.setState({profile: cookies.get('profile')})
        console.log(cookies.get('profile'))
        console.log(cookies.get('profile').id)
        this.eventService
            .findAllEventsForPublisher(cookies.get('profile').id)
            .then((response)=>{
            this.setState({events: response})
        });
    }

    findAllEventsForPublisher(profileId){

        this.eventService.findAllEventsForPublisher(profileId).then((response)=>
        {
            this.setState({events: response})
        })
    }


    deleteEvent(eventId){

        this.eventService.deleteEvent(eventId)
            .then(() => {
                this.findAllEventsForPublisher(this.state.profile.id)});
    }

    EventList() {
        var eventList = this.state.events.map((event) => {
            return (
                <div>

                    <div><p>
                    <img src={event.publisher_imgURL} style={{height: "61px", width: "61px", borderRadius: "91px"}}/>
                        <h5>{event.publisherName} </h5></p>
                    </div>
                    <span className="float-right">
           				<i className="fa fa-times" style={{cursor: "pointer"}}
                           onClick = {()=> {this.deleteEvent(event.id)}}>
           				</i>
        			</span>


                    <div>
                        <h5>{event.event_info}</h5>
                        <div align="center"> <img src={"https://s3.amazonaws.com/bookwormstest/"+event.event_imgURL}
                                                  style={{height: "250px", width: "370px"}}></img></div>
                    </div><hr/></div>
                    )
        });
        return (eventList);
    }

    render(){
        return(
            <div>
                <div className="hideScroll">
                    {this.EventList()}
                </div></div>)}
}
export default withCookies(EventsForPublisher);