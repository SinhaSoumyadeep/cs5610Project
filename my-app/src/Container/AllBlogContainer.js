import React from 'react';
import ReviewService from "../Services/ReviewService";

export default class AllBlogContainer extends React.Component {

	constructor(props)
    {
        super(props);

        this.state = {
        	blogs: []
        }

        this.reviewService = ReviewService.instance;

    }

    componentDidMount(){
    this.reviewService.findAllBlogs().then((response)=>{
    	this.setState({blogs: response})
    });
  }

  findAllBlogs(){
  	this.reviewService.findAllBlogs().then((response)=>{
            console.log("Here"+response);
            this.setState({blogs: response})});
  }

	 

	 deleteBlog(blogId){
     this.reviewService.deleteBlog(blogId).then(()=>{
        this.findAllBlogs();
     });
  }





	showBlogs()
    {
        var rows = this.state.blogs.map((blog) => {
            return (
                <div className="alert alert-success" role="alert" style={{width: "541px"}}>
                {blog.blog}
                	<span className="float-right">
           				<i className="fa fa-times" style={{cursor: "pointer"}} 
           					onClick = {()=> {this.deleteBlog(blog.id)}}>
           				</i>
        			</span>
                </div>
            )
        });
        return (
            rows
        )
    }


    render()
    {


        	return(
				<div>
					<div className="gallery">

                            {this.showBlogs()}
					</div>
					</div>
			)
        
    }
}