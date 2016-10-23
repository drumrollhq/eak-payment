import React from 'react';
import {Link} from 'react-router'

import './selection.scss';

export default class Selection extends React.Component
{
    render ()
    {
        return(
            <div className="selection">

                <div className="col-md-6 selection__item">
                    <Link to="/home" activeClassName="active">Home</Link>
                </div>

                <div className="col-md-6 selection__item">
                    <Link to="/schools" activeClassName="active">Schools</Link>
                </div>

            </div>
        );
    }
}
