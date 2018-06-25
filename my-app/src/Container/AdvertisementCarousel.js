import React, {Component} from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import EventService from "../Services/EventService";





export default class Example extends React.Component{

    constructor()
    {
        super();
        this.eventService = EventService.instance;

        this.state = {
            items : []
        }
    }

    componentDidMount() {

        this.eventService.findAllEvents()
            .then((response) => {
                response.map((event)=>{


                    var item = {src: "https://s3.amazonaws.com/bookwormstest/"+event.event_imgURL}
                    this.state.items.push(item);



                })
            });
    }



    render(){

    return(

        <div className="AdContainer">
            <h5>Advertisement</h5>
            <UncontrolledCarousel items={this.state.items} />
        </div>



    )
    }



};

