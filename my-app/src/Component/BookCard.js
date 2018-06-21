
import React from 'react'




export default class BookCard extends React.Component
{

    constructor(props){

        super(props)


    }




    render(){


        return (


            <div className="card" style={{width: "13rem",height: "18rem",margin: "5px"}}>
                <div className="card-img booksimg">
                    <a href={"/bookDetails/"+this.props.isbn} className="card-title">
                <img id="image12" className="card-img-top" src={this.props.id} alt="Card image cap" height="286rem"/>
                    </a>
                </div>
                    <div className="card-body booksbdy" id="infoi">
                        <a href={"/bookDetails/"+this.props.isbn} className="card-title">{this.props.title}</a>



                    </div>
            </div>







        )




    }


}