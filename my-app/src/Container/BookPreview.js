import React from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import $ from "jquery";
import DummyTitle from "./DummyTitle";
import bufferImg from "../Style/tenor.gif"




export default class BookPreview extends React.Component {



    componentDidMount() {
        var id = this.props.match.params.id;
        window.google.books.load();
        function initialize() {
            var viewer = new window.google.books.DefaultViewer(document.getElementById('viewerCanvas'));
            viewer.load('ISBN:'+id);
        }
        window.google.books.setOnLoadCallback(initialize);



    }






    render() {

        return(


            <div className="pageView">

                <div>
                    <DummyTitle/>
                </div>




                <div>

                    <div className="row" style={{marginTop: "81px"}}>
                        <div className="col-sm-8 mainSec">
                            <div id="nopreview"><img src={bufferImg} /></div>

                            <div id="viewerCanvas" style={{width: "600px", height: "800px"}}></div>

                        </div>

                        <div className="col-sm-4 asideSec">
                            <Advertisement/>
                        </div>

                    </div>
                </div>

            </div>



        );
    }

}




