import React from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import { Link } from 'react-router-dom'
import $ from "jquery";
import StarRatings from 'react-star-ratings';
import bookmark from '../Style/bookmark-icon.png'




export default class BookDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isbn: '',
            imgthumb: '',
            books:''
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

            console.log(books)
            this.setState({books: books.items[0].volumeInfo})
            this.setState({imgthumb: books.items[0].id});


        });




    }



    displayImage()
    {
            var link = '/bookPreview/'+this.state.isbn
            var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.state.imgthumb)
        return(
            <div style={{margin: "12px"}}>
                <a href={link} style={{textDecoration: "none"}}>

                    <div className="parent">
                        <img className="image1" id="prviewImg" src={img} style={{width: "220px", height: "300px"}} onClick={this.displayPreview}/>
                        <img className="image2" src="https://media.giphy.com/media/puRciSJdfGCd2/giphy.gif"/>
                    </div>

                </a>
            </div>
        )
    }



    render() {

        console.log(this.state.books.averageRating)
        let des = String(this.state.books.description);

        return(


            <div className="pageView">


                <div className="container-fluid">
                    <SearchContainer/>
                </div>

                <div>

                    <div className="row" style={{marginTop: "81px"}}>
                        <div className="col-sm-8 mainSec">


                            <div className="BooksContainer">
                                    <div className="bookBar container-fluid">
                                        <div className="bookName">
                                            <div style={{float: "left"}}>
                                            <img height="90px" width="120px" style={{marginTop: "-32px", marginRight: "-23px"}} src={bookmark}/>
                                            </div>
                                            <div className="wordwrap" style={{float: "left", marginRight: "-32px"}}>
                                                <h2>&nbsp;&nbsp;&nbsp;{this.state.books.title}</h2>
                                            </div>
                                        </div>
                                        <div className="bookRating">
                                            <StarRatings starDimension="30px" starSpacing="2px" rating={this.state.books.averageRating} starRatedColor="#DAA520" changeRating={4} numberOfStars={5} name='rating' />
                                        </div>
                                    </div>


                                <div className="bookBody">
                                    <div className="bookPreview">
                                        {this.displayImage()}

                                    </div>
                                    <div className="bookDescription form-control" >
                                        <h4 >Description</h4>
                                        <p >{des.substring(0,550)}...</p>
                                    </div>
                                    <div className="bookInfor">
                                        <b>Book Information</b><br/>
                                        <b>Page Count:</b>&nbsp;{this.state.books.pageCount}<br/>
                                        <b>Published Date:</b>&nbsp;{this.state.books.publishedDate}

                                    </div>

                                    <div className="bookInfo form-control" >

                                            <h4>Author</h4>
                                            <p>{this.state.books.authors}</p>

                                    </div>



                                </div>



                            </div>



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




