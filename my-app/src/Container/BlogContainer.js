import React from 'react';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import ReviewService from "../Services/ReviewService";

import UserService from "../Services/UserService";

 class BlogContainer extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props)
    {
        super(props);

        this.state = {
            blogs:[],
            coverPic: 'http://res.cloudinary.com/youpickone/image/upload/v1494829085/user-placeholder-image.png',
            profile: {imageUrl: '', picture: {data: {url: ''}}},
            updateForm: false,
            currentBlog: ''
        }
        this.userService = UserService.instance;
        this.reviewService = ReviewService.instance;

    }

    componentDidMount(){
    const { cookies } = this.props;
    console.log(cookies.get('profile'));
    //this.setState({profile: cookies.get('profile')})
        this.userService.findUserById(this.props.userId).then((profile)=>{

            console.log(profile)
            this.setState({profile: profile})
            if (profile.coverPic != null) {
                this.setState({coverPic: "https://s3.amazonaws.com/bookwormstest/" + profile.coverPic})
            }


        })
    console.log(this.state.profile)
    this.reviewService.findBlogsforUser(this.props.userId).then((response)=>{
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
                      bloggerImageUrl: this.state.coverPic,blog: blogTxt }


        this.reviewService.createBlog(blog,bloggerId).then(() =>{
            this.findBlogsforUser(bloggerId)
            });
        //.then((response)=>{window.location.reload()})
    }

    updateBlog(blogid,blog){
        console.log(blogid)
        this.setState({updateForm: true})
        this.setState({currentBlog: blog})
    }

    updateBlogContent(blogID){

        var blogTxt = this.state.currentBlog.blog;
        //alert(this.state.coverPic)
        var blog = {
            bloggerId: String(this.state.profile.id),
            blogger: this.state.profile.firstName+" "+this.state.profile.lastName,
            bloggerImageUrl: this.state.coverPic,
            blog: blogTxt,
            id: blogID
        }

        this.reviewService.updateBlog(blogID,blog).then(()=>{
                    window.location.reload();

        })


    }



        showBlogs()
    {
        var rows = this.state.blogs.map((blog) => {

            const { cookies } = this.props;

            return (

                <div className="alert alert-success" role="alert" style={{width: "541px"}}>
                {blog.blog}
                    {cookies.get('profile').id == this.props.userId &&<span className="float-right">
                        <i className="fa fa-times" style={{cursor: "pointer"}} 
                            onClick = {()=> {this.deleteBlog(blog.id)}}>
                        </i>
                        <i className="fa fa-pencil" style={{cursor: "pointer"}} 
                            onClick = {()=>{this.updateBlog(blog.id, blog)}}>
                        </i>
                    </span>}
                </div>

            )

        });
        return (
            rows
        )
    }

    render(){
        const { cookies } = this.props;
        return(
                <div>
                    <div className="gallery">

                            {this.showBlogs()}

                    </div>

                    {cookies.get('profile').id == this.props.userId && <div className="reviewBox container-fluid">
                        {this.state.profile.role == "Author" && this.state.updateForm == false &&
                        <div>
                        <textarea id="myInput" style = {{width:"75%"}}className="form-control"  
                         placeholder="Blogs" ref="blogText" />
                        <button style = {{width:"75%"}} className="btn btn-success btn-block"
                        onClick={()=>{this.postBlog(this.state.profile.id)}}>
                            Add Blogs
                        </button>
                        </div>  }

                        {
                            this.state.updateForm == true && 
                            <div>
                        <textarea id="myInput" style = {{width:"75%" , height: "120px"}}className="form-control" 
                        value =  {this.state.currentBlog.blog} onChange = {(e)=>{ 

                            var currentBlog = this.state.currentBlog
                            currentBlog.blog = e.target.value

                            this.setState({currentBlog: currentBlog}) 
                        } }
                         placeholder= {this.state.currentBlog.blog} ref="blogText" />
                        <button style = {{width:"75%"}} className="btn btn-success btn-block"
                        onClick={()=>{this.updateBlogContent(this.state.currentBlog.id)}}>
                           UpdateBlog
                        </button>
                        </div>
                        }
                    </div>
                }

                </div>
            )
    }
}
export default withCookies(BlogContainer);

