/**
 * Created by Veket on 2016/11/10.
 */
import React, { Component,PropTypes} from 'react';
import './main.css';

class HelloWorld extends Component {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        const titleStyle = {
            height: this.props.height||'60px'
        };
        return (
            <div id="HelloWorld" style={titleStyle}>
                <i className="img_test"></i>
                <span>Hello World</span>
                { this.props.children }
            </div>
        );
    }
}

HelloWorld.propTypes = {
    children: PropTypes.any,
};

export default HelloWorld;