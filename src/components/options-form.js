import React from 'react';
import { browserHistory } from 'react-router';

export default class OptionsForm extends React.Component
{
    handleFormSubmit(event) {
        event.preventDefault();

        switch(event.target.name)
        {
            case 'play':
                window.top.location.href = '/en/play/';
                break;
            case 'buy':
            default:
                browserHistory.push('/buy');
                break;
        }

        browserHistory.push('/home');
    };

    render ()
    {
        return(

            <div>

                <div className="col-md-6 col-sm-6">
                    <h2>Benefits</h2>
                    <ul>
                        <li>Benefit 1</li>
                        <li>Benefit 2</li>
                        <li>Benefit 3</li>
                        <li>Benefit 4</li>
                    </ul>
                </div>

                <div className="col-md-6 col-sm-6">

                    <ul>
                        <li>
                            <button type="submit"
                                    className="cta"
                                    name="play"
                                    onClick={this.handleFormSubmit}>Play E.A.K
                            </button>
                        </li>
                        <li>
                            <button type="submit"
                                    className="cta"
                                    name="buy"
                                    onClick={this.handleFormSubmit}>Buy E.A.K
                            </button>
                        </li>
                    </ul>

                </div>

            </div>
        );
    }
}
