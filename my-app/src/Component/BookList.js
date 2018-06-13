import React from 'react'
import BookCard from "./BookCard";
import SearchContainer from "../Container/SearchContainer";
import Advertisement from "../Container/Advertisement";
import $ from 'jquery'


export default class BookList extends React.Component
{




    constructor() {
        super()


        this.state = {
            ficthumb:[],
            nonficthumb:[],
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
            this.find_nonfictionpreview(books)
            this.setState({nonFiction: books.results});

        });


    }



    fetchAllFictionBooks()
    {

        fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=8e08852c66f845fbae14cb660487234e', {
            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {
            this.find_fictionpreview(books)
            this.setState({fictionBooks: books.results});

        });


    }




    find_fictionpreview(books)
    {

            books.results.slice(0, 3).map((book)=>{


                console.log(book)

                var isbn = book.isbns[1].isbn10

                $.ajax({
                    async: false,
                    type:"GET",
                    url: "https://www.googleapis.com/books/v1/volumes?q="+isbn,
                    success: (result)=>{

                        console.log(result)
                        var joined = this.state.ficthumb.concat(result.items[0].id);
                        this.setState({ ficthumb: joined })

                    }


                })




            })


    }
    find_nonfictionpreview(books)
    {

        books.results.slice(0, 3).map((book)=>{


            var isbn = book.isbns[1].isbn10
            $.ajax({
                async: false,
                type:"GET",
                url: "https://www.googleapis.com/books/v1/volumes?q="+isbn,
                success: (result)=>{

                    console.log(result)
                    var joined = this.state.nonficthumb.concat(result.items[0].id);
                    this.setState({ nonficthumb: joined })

                }


            })

        })


    }

    displayFictionBooks()
    {




        var grid = this.state.fictionBooks.slice(0, 3).map((book,index)=>{

            var isbn = book.isbns[1].isbn10

            var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.state.ficthumb[index])





            return(

                <div>

                    <BookCard key={index} isbn={isbn} book={book} id={img}  title={book.book_details[0].title} description={book.book_details[0].description}/>
                </div>


            )









        })
        return (
            grid
        )


    }

    displayNonFictionBooks()
    {


        var grid = this.state.nonFiction.slice(0, 3).map((book,index)=>{
            var isbn = book.isbns[1].isbn10
            console.log(book.isbns[1].isbn10)
            var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.state.nonficthumb[index])




            return(

                <div>
                    <BookCard key={index} isbn={isbn} id={img} title={book.book_details[0].title} description={book.book_details[0].description}/>
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

                    <div className="row" style={{marginTop: "81px"}}>
                        <div className="col-sm-8 mainSec">
                            <div className="featuredBooks">
                                <div id="SectionHeading">
                                    <h6> FICTION FEATURED BOOKS</h6>
                                </div>

                                <div className="card-deck" style={{paddingLeft: "31px"}}>
                                    {this.displayFictionBooks()}
                                </div>

                            </div>
                            <div className="featuredBooks">
                                <div id="SectionHeading">
                                    <h6>NON FICTION FEATURED BOOKS</h6>
                                </div>

                                <div className="card-deck" style={{paddingLeft: "31px"}}>
                                    {this.displayNonFictionBooks()}
                                </div>

                            </div>
                            
                            

                        </div>

                        <div className="col-sm-4 asideSec">
                            <Advertisement/>
                        </div>

                    </div>
                </div>

            </div>



        )



    }




}