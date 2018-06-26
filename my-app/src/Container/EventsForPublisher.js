import React from 'react';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import EventService from "../Services/EventService";
import "../CSS/blog.css"
import UserService from "../Services/UserService";

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
        this.userService = UserService.instance;
        this.eventService = EventService.instance;

    }

    componentDidMount(){
        const { cookies } = this.props;

        console.log(cookies.get('profile'))
        console.log(cookies.get('profile').id)

        this.userService.findUserById(this.props.userId).then((profile)=>{

            console.log(profile)
            this.setState({profile: profile})


        })

        this.eventService
            .findAllEventsForPublisher(this.props.userId)
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
        const { cookies } = this.props;
        var eventList = this.state.events.map((event) => {
            return (
                <div>

                    <div><p>
                    <img src={event.publisher_imgURL} style={{height: "61px", width: "61px", borderRadius: "91px"}}/>
                        <h5>{event.publisherName} </h5></p>
                    </div>
                    {cookies.get('profile').id == this.props.userId && <span>
                        <button className="btn btn-danger" onClick = {()=> {this.deleteEvent(event.id)}}>
                            <i className="fa fa-times"></i>
                        </button>

        			</span>}


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