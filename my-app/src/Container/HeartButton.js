import React from 'react'
import "../CSS/heart.css"
import $ from 'jquery'
import ReviewService from "../Services/ReviewService";

export default class HeartButton extends React.Component {

    constructor(props)
    {
        super(props)
        this.reviewService = ReviewService.instance;
        this.state = {
            likedBooks: [],
            likeId: ''
        }
    }

    componentDidMount()
    {
        if(this.props.userId != undefined)
        {
            this.reviewService.findAllLikedBookForUser(this.props.userId).then((response)=> {

                response.map((books)=>{

                    if(books.isbn == this.props.bookId)
                    {
                        this.setState({likeId: books.id})
                        $(".fa-heart").css('color','#DAA520')
                        $(".fa-heart").text("Liked");
                        $(".btn-secondary").css('background','white')
                        $(this).children('.fa-heart').addClass('animate-like');
                    }

                })

            })



        }


    }

    liked(userId, isbn, imgUrl)
    {



        if($(".fa-heart").text() == "Like")
        {
            //alert(userId+" likes "+isbn)
            var book = {userId: userId, isbn: isbn, imgUrl: imgUrl }
            this.reviewService.likedBook(book).then((response)=>{ console.log(response)})
            $(".fa-heart").css('color','#DAA520')
            $(".fa-heart").text("Liked");
            $(".btn-secondary").css('background','white')
            $(this).children('.fa-heart').addClass('animate-like');
        }
        else
        {
            //alert(userId+" unliked "+isbn)
            //alert(this.state.likeId)
            this.reviewService.deleteLikedBook(this.state.likeId).then((response)=>{ console.log(response)})
            $(".fa-heart").css('color','rgb(255, 255, 255)')
            $(".btn-secondary").css('background','#DAA520')
            $(".fa-heart").text("Like");
            $(this).children('.fa-heart').addClass('animate-like');
        }




    }

    render()
    {
        return(
            <div class="like-content">
                <button className="btn-secondary like-review" onClick={()=>{this.liked(this.props.userId,this.props.bookId, this.props.ImgUrl)}}>
                    <i className="fa fa-heart" aria-hidden="true"  style={{cursor: "pointer",fontSize: "19px"}}>Like</i>
                </button>


            </div>

            )
    }
}

