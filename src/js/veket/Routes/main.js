/**
 * Created by Veket on 2016/11/10.
 */
import React, { Component,PropTypes} from 'react';
import {Router,Route,hashHistory,IndexRedirect} from 'react-router';
import App from '../App/main';
import M1 from '../M1/main';
import M2 from '../M2/main';
import M3 from '../M3/main';

class Routes extends Component {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}><
                    IndexRedirect to='/m1'/>
                    <Route path='/m1' component={M1}>
                        <Route path='/m1/m3' component={M3}/>
                    </Route>
                    <Route path='/m2' component={M2}/>
                </Route>

            </Router>
        );
    }
}

export default Routes;