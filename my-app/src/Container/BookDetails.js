import React from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import $ from "jquery";




export default class BookDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            imgthumb: ''
        };

    }

    componentDidMount() {
        var id = this.props.match.params.id;
        this.find_preview(id)
        window.google.books.load();
        function initialize() {
            var viewer = new window.google.books.DefaultViewer(document.getElementById('viewerCanvas'));
            viewer.load('ISBN:'+id);
        }
        window.google.books.setOnLoadCallback(initialize);


    }




    find_preview(id)
    {
        var isbn = id
        fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn, {
            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {

            this.setState({imgthumb: books.items[0].volumeInfo.imageLinks.thumbnail});


        });




    }



    displayImage()
    {

        return(
            <div style={{margin: "12px"}}>
                <img id="prviewImg" src={this.state.imgthumb} style={{width: "220px", height: "300px"}} onClick={this.displayPreview}/>

            </div>
        )
    }



    render() {

        return(


            <div className="pageView">


                <div>
                    <SearchContainer/>
                </div>

                <div>

                    <div className="row" style={{marginTop: "81px"}}>
                        <div className="col-sm-8 mainSec">

                            {this.displayImage()}

                                <div id="viewerCanvas" style={{width: "300px", height: "400px"}}></div>



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




