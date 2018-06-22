import React from 'react'
import BookCard from "./BookCard";
import SearchContainer from "../Container/SearchContainer";
import Advertisement from "../Container/Advertisement";
import $ from 'jquery'
import NewOpenings from "../Container/NewOpenings";
import FooterPage from "../Container/FooterPage";
import { Redirect } from 'react-router-dom';
import UserProfile from '../Container/UserProfile';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class BookList extends React.Component
{



    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props)


        this.state = {
            ficthumb:[],
            nonficthumb:[],
            fictionBooks: [],
            nonFiction:[],
            paperback:[],
            err: false,
            count: 0,
            profile: ''

        };

    }

    componentWillMount() {
        const { cookies } = this.props;
        this.setState({profile: cookies.get('profile')})
        this.fetchAllFictionBooks();

        this.fetchAllNonFictionBooks();




    }

    fetchAllNonFictionBooks()
    {

        fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-nonfiction&api-key=8e08852c66f845fbae14cb660487234e', {
            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {

            try {
                this.find_nonfictionpreview(books)
                this.setState({nonFiction: books.results});
            }
            catch(err) {
                alert("error1")
                this.setState({ err: true })
            }


        });


    }



    fetchAllFictionBooks()
    {

        fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=8e08852c66f845fbae14cb660487234e', {
            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {

            try {
                this.find_fictionpreview(books)
                this.setState({fictionBooks: books.results});
            }
            catch(err) {
                alert("error2")
                this.setState({ err: true })
            }


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
                    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn+"&key=AIzaSyCnVTtFc33VOdg7DFgq0jNPGIdAmnTdIeM",
                    success: (result)=>{

                        try {
                            console.log(result)
                            var joined = this.state.ficthumb.concat(result.items[0].id);
                            this.setState({ ficthumb: joined })
                        }
                        catch(err) {
                            alert("error3")
                            this.setState({ err: true })
                        }


                    },
                    error:(XMLHttpRequest, textStatus, errorThrown) =>{

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
                url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn+"&key=AIzaSyCnVTtFc33VOdg7DFgq0jNPGIdAmnTdIeM",
                success: (result)=>{

                    try {
                        console.log(result)
                        var joined = this.state.nonficthumb.concat(result.items[0].id);
                        this.setState({ nonficthumb: joined })
                    }
                    catch(err) {
                        alert("error4")
                        this.setState({ err: true })
                    }



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
        if (this.state.err) {
            return <Redirect to='/error'/>;
        }

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
                                    <h6>FICTION FEATURED BOOKS</h6>
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
                            <hr width="300px"/>
                            <div id="topPicks">
                                <h5>Our Top Picks </h5>
                                <NewOpenings/>
                            </div>

                        </div>

                    </div>
                </div>

                <div>
                    <FooterPage/>
                </div>
                <div style={{height: "126px"}}></div>

            </div>



        )



    }




}
export default withCookies(BookList);