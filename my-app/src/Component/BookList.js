import React from 'react'
import BookCard from "./BookCard";
import SearchContainer from "../Container/SearchContainer";
import Advertisement from "../Container/Advertisement";


export default class BookList extends React.Component
{




    constructor() {
        super()


        this.state = {

            fictionBooks: [],
            nonFiction:[],
            paperback:[],

            count: 0

        };

    }

    componentWillMount() {

        this.fetchAllFictionBooks();
        this.fetchAllNonFictionBooks();




    }

    fetchAllNonFictionBooks()
    {
        fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-nonfiction&api-key=8e08852c66f845fbae14cb660487234e', {
            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {
            this.setState({nonFiction: books.results});

        });


    }



    fetchAllFictionBooks()
    {
        fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=8e08852c66f845fbae14cb660487234e', {
            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {
            this.setState({fictionBooks: books.results});

            this.state.fictionBooks.map((book)=>{
                console.log(book.isbns[1].isbn10)
            })


        });


    }




    find_preview(isbn)
    {

        fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn+"&key=AIzaSyCnVTtFc33VOdg7DFgq0jNPGIdAmnTdIeM", {
            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {


           console.log(books)


        });


    }

    displayFictionBooks()
    {


        var grid = this.state.fictionBooks.slice(0, 3).map((book)=>{



            return(

                    <div>
                        <BookCard title={book.book_details[0].title} description={book.book_details[0].description}/>
                    </div>


            )





        })
        return (
            grid
        )


    }

    displayNonFictionBooks()
    {


        var grid = this.state.nonFiction.slice(0, 3).map((book)=>{



            return(

                <div>
                    <BookCard title={book.book_details[0].title} description={book.book_details[0].description}/>
                </div>


            )





        })
        return (
            grid
        )


    }











    render(){

        return(

            <div className="pageView">


                    <div>
                        <SearchContainer/>
                    </div>

                <div>

                    <div className="row">
                        <div className="col-sm-8 mainSec">
                            <div className="featuredBooks">
                                <div id="SectionHeading">
                                    <h6> FICTION FEATURED BOOKS</h6>
                                </div>

                                <div className="card-deck" style={{margin: "0px"}}>
                                    {this.displayFictionBooks()}
                                </div>


                            </div>
                            <div className="featuredBooks">
                                <div id="SectionHeading">
                                    <h6>NON FICTION FEATURED BOOKS</h6>
                                </div>

                                <div className="card-deck" style={{margin: "0px"}}>
                                    {this.displayNonFictionBooks()}
                                </div>
                                

                            </div>

                        </div>

                        <div className="col-sm-4 asideSec">
                            <div className="adSection">
                                <Advertisement/>
                            </div>


                        </div>

                    </div>
                </div>

            </div>



        )



    }




}