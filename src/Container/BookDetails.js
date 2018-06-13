import React from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import { Link } from 'react-router-dom'
import $ from "jquery";




export default class BookDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isbn: '',
            imgthumb: ''
        };

    }

    componentDidMount() {
        var id = this.props.match.params.id;
        this.setState({isbn: id})
        this.find_preview(id)

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
            var link = '/bookPreview/'+this.state.isbn
        return(
            <div style={{margin: "12px"}}>
                <a href={link} style={{textDecoration: "none"}}>
                <img id="prviewImg" src={this.state.imgthumb} style={{width: "220px", height: "300px"}} onClick={this.displayPreview}/>
                </a>
            </div>
        )
    }



    render() {

        return(


            <div className="pageView">


                <div className="container-fluid">
                    <SearchContainer/>
                </div>

                <div>

                    <div className="row" style={{marginTop: "81px"}}>
                        <div className="col-sm-8 mainSec">

                            {this.displayImage()}

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




