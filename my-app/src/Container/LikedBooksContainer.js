import React from 'react';

export default class LikedBooksContainer extends React.Component {

    render()
    {
        return(
            <div>
                <div className="row gallery">
                    <div className="col-md-4">
                        <img
                            src="https://image.noelshack.com/fichiers/2017/38/2/1505774817-photo1.jpg"/>
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://image.noelshack.com/fichiers/2017/38/2/1505774813-photo4.jpg"/>
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo5.jpg"/>
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo6.jpg"/>
                    </div>

                    <div className="col-md-4">
                        <img
                            src="https://image.noelshack.com/fichiers/2017/38/2/1505774815-photo2.jpg"/>
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://image.noelshack.com/fichiers/2017/38/2/1505774816-photo3.jpg"/>
                    </div>
                </div>
            </div>
        )
    }
}