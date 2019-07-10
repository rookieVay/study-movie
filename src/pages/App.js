import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './Home'
import Classify from './Classify'
import Details from './Details'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Home}></Route>
                <Route path="/classify/:classifyId" component={Classify}></Route>
                <Route path="/details/:classifyId/:detailsId" component={Details}></Route>
            </BrowserRouter>
        )
    }
}

export default App;