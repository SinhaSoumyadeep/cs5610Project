import React, {Component} from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'

import EventService from "../Services/EventService";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from "axios/index";
import EventsForPublisher from "./EventsForPublisher"



class PublisherWidget
    extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props)
    {
        super(props);
        this.eventService = EventService.instance;
        this.state = {
            file: "", imagePreviewUrl: " ",
            profile: " "
        }}

    componentDidMount() {
        const { cookies } = this.props;

        this.setState({profile: cookies.get('profile')||{imageUrl: '', picture: {data: {url: ''}}}})
        if(cookies.get('isReader')!= undefined){
            //alert("is reader"+cookies.get('isReader'))
            this.setState({isReader: cookies.get('isReader')})
        }
        if(cookies.get('isReviewer')!= undefined)
        {
            //alert("is reviewer"+cookies.get('isReviewer'))
            this.setState({isReviewer: cookies.get('isReviewer')})
        }
        if(cookies.get('isPublisher')!= undefined)
        {
            //alert("is reviewer"+cookies.get('isReviewer'))
            this.setState({isPublisher: cookies.get('isPublisher')})
        }
    }

    UploadImage(e){
        e.preventDefault();
        console.log("UPLOAD", this.state.file);
        this.createEvent(this.state.file.name)

        let file = this.state.file;
        console.log(file);

        let data = new FormData();
        data.append("file0", file);

        console.log(data);
        const config = {
            headers: { 'content-type': 'multipart/form-data'}
        };
        return axios.post('https://book-worms-server.herokuapp.com/api/user/'+ this.state.profile.id +'/event',data,config).then(()=>{
                window.location.reload();
        }

        )


    }
    ImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        console.log(file);

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

   createEvent(filename){

        var eventinfo= this.refs.eventInfo.value;

           var event = {
                event_info: eventinfo,
                publisherId: String(this.state.profile.id),
                publisherName: this.state.profile.firstName + " " + this.state.profile.lastName,
                publisher_imgURL: String(this.state.profile.imageURL + '?sz=550'),
                event_imgURL: filename
            }
            console.log(event);

        this.eventService.createEvent(event)
   }


    render(){
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <div align="center" className="container-fluid">
                <img src={imagePreviewUrl} width="250px" height="250px" /></div>;
        } else {
            $imagePreview = (
                <div className="previewText">Please select an Image for Preview</div>
            );
        }



        return(


            <div className="container-fluid hideScroll">

                <div className="reviewBoxSection "><br/>
                    <h3> ADD EVENTS </h3>
                        <textarea id="myInput" className="form-control" rows="4"  placeholder="Say something about the event..." ref="eventInfo" style={{width: "95%"}}/><br/>
                        <div className="previewComponent">
                            <form>
                                <input
                                    className="fileInput"
                                    type="file"
                                    onChange={e => this.ImageChange(e)}/>
                                <button
                                    className="btn btn-outline-primary float-right"
                                    type="submit"
                                    onClick={e => this.UploadImage(e)}>
                                    Add Event
                                </button>
                            </form>
                            <div className="imgPreview">{$imagePreview}</div>
                        </div><hr/>
                    <EventsForPublisher userId={this.props.userId}/>

                </div>

            </div>

        )
    }
}
export default withCookies(PublisherWidget);