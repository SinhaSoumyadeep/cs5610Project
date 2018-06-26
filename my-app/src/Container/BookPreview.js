import React from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import $ from "jquery";
import DummyTitle from "./DummyTitle";
import bufferImg from "../Style/tenor.gif"
import FooterPage from "./FooterPage";
import Example from "./AdvertisementCarousel";





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
                            <div id="nopreview"><img id="buffer" src={bufferImg} height="320px" width="480px"/></div>

                            <div id="viewerCanvas" style={{width: "600px", height: "800px"}}></div>

                        </div>

                        <div className="col-sm-4 asideSec">
                            <Example/>
                        </div>

                    </div>
                </div>
                <div>
                    <FooterPage/>
                </div>
                <div style={{height: "126px"}}></div>

            </div>



        );
    }

}

$(document).ready(function () {

    setTimeout(function() {


        $("#buffer").attr("src","http://2016.foodhawkers.co.uk/img/not_available.jpg")
        }, 5000);

})




