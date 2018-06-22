import React from 'react';
import '../CSS/profile.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Settings extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            file: "", imagePreviewUrl: "" };
    }
    componentDidMount() {

        const { cookies } = this.props;

    }
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log("handle uploading-", this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    updateProfile(){
        var email1= this.refs.email.value
        var dob1 = this.refs.dob.value;
        var bio1 = this.refs.bio.value;
        var category1 = this.refs.category.value;

        this.state.user = {
            email:email1,
            bio:bio1,
            category:category1,
            dateOfBirth:dob1}


            return fetch('https://book-worms-server.herokuapp.com/api/user', {
                method: 'put',
                body: JSON.stringify(this.state.user),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(function(response){return response.json()})
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} width="400px" height="350px" />;
        } else {
            $imagePreview = (
                <div className="previewText">Please select an Image for Preview</div>
            );
        }
        return (

            <div className="container-fluid">
                <h4 align="center">Settings</h4>

                <ul className="nav nav-tabs">
                    <li className="">
                        <a data-toggle="tab" href="#personal" style={{color: "black", fontFamily:"Cormorant Unicase"}}>Personal</a></li>
                    <li><a data-toggle="tab" href="#photo" style={{color: "black",fontFamily:"Cormorant Unicase"}}>Photo</a></li>
                    <li><a data-toggle="tab" href="#about" style={{color: "black",fontFamily:"Cormorant Unicase"}}>About Yourself</a></li>
                </ul>

                <div className="tab-content active">
                    <div id="personal" className="tab-pane"><br/>
                        EMAIL
                        <input type ="text" className="form-control" placeholder="Email" ref="email"/><br/>
                        DATE OF BIRTH
                        <input type ="date" className="form-control" ref="dob"/>
                    </div>

                    <div id="photo" className="tab-pane"><br/>COVER PICTURE
                        <div className="previewComponent">
                            <form onSubmit={e => this._handleSubmit(e)}>
                                <input
                                    className="fileInput"
                                    type="file"
                                    onChange={e => this._handleImageChange(e)}/>
                                <button
                                    className="submitButton"
                                    type="submit"
                                    onClick={e => this._handleSubmit(e)}>
                                    Upload Image
                                </button>
                            </form>
                            <div className="imgPreview">{$imagePreview}</div>
                        </div>
                    </div>

                    <div id="about" className="tab-pane">
                        <br/>BIO
                        <textarea className="form-control" rows="5"  placeholder="Tell others something about yourself" ref="bio"></textarea>
                        <br/>
                        What are your favorite categories?
                        <form>
                            <div className="checkbox" ref="category">
                                <label><input type="checkbox" value="fiction"/>Fiction</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="nonFiction"/>Non-Fiction</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="thriller"/>Thriller</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="adventure"/>Adventure</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="romance"/>Romance</label>
                            </div>
                        </form>
                    </div>
                </div>
                <hr/>
                <button className="btn btn-outline-primary float-right">UPDATE</button>
            </div>
        );
    }
}

export default Settings;