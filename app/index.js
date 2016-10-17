import React from 'react';
import {render} from 'react-dom';
const Form = require('./components/form');

class App extends React.Component {
    render () {
        return (
            <Form />
        );
    }
}

render(<App/>, document.getElementById('app'));
