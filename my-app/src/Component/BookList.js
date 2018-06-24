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
import UserService from '../Services/UserService';
class BookList extends React.Component
{



    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props)


        this.state = {
            topics : [],
            ficthumb:[],
            nonficthumb:[],
            fictionBooks: [],
            nonFiction:[],
            paperback:[],
            err: false,
            count: 0,
            isAdmin: false,
            topic: "",
            profile: ''

        };
        this.userService = UserService.instance;
        this.changePick = this.changePick.bind(this);
        this.addPicks = this.addPicks.bind(this);
        this.findAlltopics = this.findAlltopics.bind(this);
        this.setTopics = this.setTopics.bind(this);

    }

    componentWillMount() {
        const { cookies } = this.props;
        this.setState({profile: cookies.get('profile')})
        this.fetchAllFictionBooks();

        this.fetchAllNonFictionBooks();
        
    }


    fetchAllNonFictionBooks()
    {

        fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-nonfiction&api-key=700226a42e4f48859f6c2f69b23ff4c4', {
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

    findAlltopics(){
        this.userService.findAlltopics().then((response)=>{
            this.setTopics(response)
        });
    }

    setTopics(topics){
        this.setState({topics: topics})

    }



    fetchAllFictionBooks()
    {

        fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=700226a42e4f48859f6c2f69b23ff4c4', {
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
                    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn+"&key=AIzaSyCENykRNLz0l6Cv5GrW_ooixur15w5QrG0",
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
                url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn+"&key=AIzaSyCENykRNLz0l6Cv5GrW_ooixur15w5QrG0",
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

    changePick(event){
        this.setState({
            topic:event.target.value
        })
    }

    addPicks(topic){
        console.log(topic)
        this.userService.addTopic(topic).then(()=>{
            window.location.reload();
        })
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
                            {this.state.profile != undefined &&
                                 this.state.profile.role == 'admin' &&
                            <div>
                                <span style={{float: "left"}}>
                                <input style={{width: "281px"}} id = "topicInput" onChange = {this.changePick}
                                className = "form-control"
                                placeholder = "Picks">
                                </input>
                                </span>
                                <span style={{float: "left"}}>
                                <button className="btn btn-success">
                                <i className="fa fa-plus" onClick = {() => this.addPicks(this.state.topic)}>  </i>
                                </button>
                                </span>

                            </div>
                            }
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