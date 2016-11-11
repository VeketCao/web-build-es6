/**
 * Created by Veket on 2016/11/10.
 */
import React, { Component,PropTypes} from 'react';
import {Router,Route,Link} from 'react-router';
import './main.css';

class Header extends Component {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        return (
            <div id="Header" >
                <div className="g-wrap clear-fix">
                    <ul className="header-nav">
                        <li> <Link to="/m1">m1</Link></li>
                        <li><Link to="/m2">m2</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;