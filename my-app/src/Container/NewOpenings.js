import React, {Component} from 'react'
import UserService from '../Services/UserService';
import OpeningItem from './OpeningItem';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


export default class NewOpenings
    extends Component {


        constructor(props) {
            super(props);
            this.state = {
                topics : []
            }
            this.userService = UserService.instance;
            this.findAlltopics = this.findAlltopics.bind(this);
            this.setTopics = this.setTopics.bind(this);
            this.deleteTopic = this.deleteTopic.bind(this);
        }

        componentWillMount() {

        this.findAlltopics();
        
    }

    setTopics(topics){
        this.setState({topics: topics})

    }

    findAlltopics(){
        this.userService.findAlltopics().then((response)=>{
            this.setState({topics: response})
        });
    }

    deleteTopic(topicId){
    this.userService.deleteTopic(topicId).then(() => { this.findAlltopics(); });
  }

    renderListOfPicks() {
    let topics = this.state.topics.map(
      (topic) => {
     return (<OpeningItem deleteTopic={this.deleteTopic} key={topic.id} topic={topic} />)
    });
    return topics;
  }


    render() {
        return (
            <div className="newopenings">

            <ul className="list-group">
          {this.renderListOfPicks()}
        </ul>

        </div>
        )
    }
}