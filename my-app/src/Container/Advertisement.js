import React, {Component} from 'react'


export default class Advertisement
    extends Component {


    render() {
        return (
            <div>
                <div className="card Advert" style={{width: "20rem",height: "18rem"}}>
                    <div className="card-img Adimg">
                        <img className="card-img-top" src="https://media1.popsugar-assets.com/files/thumbor/V-1rDJbC63aHrpO4TB7K9FlRsbs/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/06/17/817/n/1922195/7793f7b8a384ad2d_url-9/i/Snickers.jpeg" alt="Card image cap" height="286rem"/>
                    </div>
                    <div className="card-body Adbdy" style={{paddingLeft: "85px",margin: "auto"}}>
                        <h6>Advertisement</h6>

                    </div>
                    <div className="card-body Adbtn" style={{paddingLeft: "85px"}}>
                        <button className="btn btn-primary">
                           More Info
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}