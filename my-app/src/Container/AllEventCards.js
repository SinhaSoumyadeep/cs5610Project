import React, {Component} from 'react';
import EventCardServices from "../Services/EventCardServices";


export default class AllEventCards extends Component {
    constructor()
    {
        super()
        this.state = {
            eventCards: []
        }
        this.eventCardServices = EventCardServices.instance;
    }

    componentDidMount() {
        this.eventCardServices.findAllEventCards()
            .then((response)=>
            {
                console.log( response)
                this.setState({eventCards: response});
            })
    }


    showEventCards()
    {
        var cards = this.state.eventCards.map((eventCard) => {

            return (
                <div>
                    <div className="card text-white bg-dark mb-3" style={{width: "18rem"}}>
                        <div className="card-header"><i className="fa fa-calendar-check-o" aria-hidden="true"></i><h5 style={{textAlign: "center"}}>{eventCard.dateOfEvent}</h5></div>
                        <div className="card-body">
                            <h5 className="card-title">{eventCard.title}</h5>

                        </div>
                    </div>
                </div>


            )
        });
        return cards
    }


    render() {
        return (
            <div className="scrollHide">
                <div className="eventCard">
                    {this.showEventCards()}
                </div>
            </div>
        )
    }
}
