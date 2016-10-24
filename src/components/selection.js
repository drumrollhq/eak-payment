import React from 'react';
import {Link, IndexLink} from 'react-router'

import './selection.scss';

export default class Selection extends React.Component
{
    render ()
    {
        return(
            <div className="selection">

                <div className="col-md-6 selection__item">
                    <IndexLink to="/" activeClassName="active">Home</IndexLink>
                </div>

                <div className="col-md-6 selection__item">
                    <Link to="/schools" activeClassName="active">Schools</Link>
                </div>

            </div>
        );
    }
}
