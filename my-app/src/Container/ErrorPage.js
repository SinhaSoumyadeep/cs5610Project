import React from 'react'
import error from '../Style/404.gif'






export default class ErrorPage extends React.Component {



    render() {

        return(



            <div className="error">

                <img src={error}/>
            </div>



        );
    }

}





