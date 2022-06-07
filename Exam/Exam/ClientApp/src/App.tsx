import * as React from 'react';
import {Route} from 'react-router-dom';

import './custom.css'
import {Home} from "./components/Home";

export function App() {
    return (
            <Route exact path='/' component={Home}/>
    )
}