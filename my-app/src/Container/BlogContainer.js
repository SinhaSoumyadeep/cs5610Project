import React from 'react';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import ReviewService from "../Services/ReviewService";
import "../CSS/blog.css"

 class BlogContainer extends React.Component {

	static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props)
    {
        super(props);

        this.state = {
        	profile: '',
        	blogs: []
        }

        this.reviewService = ReviewService.instance;

    }

    componentDidMount(){
    const { cookies } = this.props;
    console.log(cookies.get('profile'));
    this.setState({profile: cookies.get('profile')})
    console.log(this.state.profile)
    this.reviewService.findBlogsforUser(cookies.get('profile').id).then((response)=>{
    	this.setState({blogs: response})
    });
  }

  findBlogsforUser(userid){
    this.reviewService.findBlogsforUser(userid).then((response)=>{
        this.setState({blogs: response})
    })
  }


  deleteBlog(blogId){
     this.reviewService.deleteBlog(blogId).then(()=>{
        this.findBlogsforUser(this.state.profile.id);
     });
  }

   postBlog(bloggerId)
    {

        var blogTxt = this.refs.blogText.value;
        //console.log(this.props.books.title)
        var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.props.imgUrl)
        //console.log(img)


        var blog = { bloggerId: String(this.state.profile.id), blogger: this.state.profile.firstName+" "+this.state.profile.lastName, 
        			  bloggerImageUrl: this.state.profile.imageURL+'?sz=550',blog: blogTxt }


        this.reviewService.createBlog(blog,bloggerId).then(() =>{
            this.findBlogsforUser(bloggerId)
            });
        //.then((response)=>{window.location.reload()})
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

	render(){
		return(
				<div>
					<div className="gallery">

                            {this.showBlogs()}

					</div>

				 	<div className="reviewBox container-fluid">
                		{this.state.profile.role == "Author" &&
                		<div>
                		<textarea id="myInput" style = {{width:"75%"}}className="form-control"  
                		 placeholder="Blogs" ref="blogText" />
                		<button style = {{width:"75%"}} className="btn btn-success btn-block"
                		onClick={()=>{this.postBlog(this.state.profile.id)}}>
                			Add Blogs
                		</button>
                		</div>	}
            		</div>

				</div>
			)
	}
}
export default withCookies(BlogContainer);

