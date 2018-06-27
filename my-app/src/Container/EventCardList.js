import React, {Component} from 'react'
import EventCard from "../Component/EventCard";
import EventCardService from "../Services/EventCardServices";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class EventCardList extends Component {


    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.eventCardService = EventCardService.instance;
        this.deleteEventCard = this.deleteEventCard.bind(this);
        this.createEventCard = this.createEventCard.bind(this);
        this.state = {
            eventCards : [],
            profile: ''};

    }

    componentDidMount() {
        const { cookies } = this.props;
        this.setState({profile: cookies.get('profile')})
        console.log(cookies.get('profile'))
        if(cookies.get('isPublisher')!= undefined)
        {
            this.setState({isPublisher: cookies.get('isPublisher')})
        }

        this.eventCardService
            .findAllEventCardForPublisher(this.props.userId)
            .then((response)=>{
                this.setState({eventCards: response})
            });
    }

    findAllEventCardForPublisher(){



        this.eventCardService.findAllEventCardForPublisher(this.props.userId).then((response)=>
        {
            this.setState({eventCards: response})
        })
    }
    createEventCard() {
        this.state.eventCard = {
            title: this.refs.title.value,
            publisherId: String(this.state.profile.id),
            dateOfEvent: this.refs.dateOfEvent.value
    }
        this.eventCardService
            .createEventCard(this.state.eventCard)
            .then(() => { this.findAllEventCardForPublisher(); });

        this.refs.title.value='';
        this.refs.dateOfEvent.value = '';

    }

    renderEventCards() {
        
       
          var  eventCards = this.state.eventCards.map(
                (eventCard) => {
                    return(
                            <EventCard eventCard={eventCard}
                                       key={eventCard.id}
                                       delete={this.deleteEventCard}
                                       userId={this.props.userId}
                            />

                    )
                }
            )
        
        return (
            eventCards
        )
    }

    deleteEventCard(eventCardId){
        this.eventCardService.deleteEventCard(eventCardId).then(() => { this.findAllEventCardForPublisher(); });
    }



    render() {
        const { cookies } = this.props;
        return (
            <div class = "eventCardList">
                {cookies.get('profile').id == this.props.userId &&
                    <div>
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
                    </div>}
                <div className="eventcardContainer">
                <div className = "card-deck">

                    {this.renderEventCards()}
                </div>
                </div>
            </div>
        )
    }
}
export default  withCookies(EventCardList);