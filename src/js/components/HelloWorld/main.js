/**
 * Created by Veket on 2016/11/10.
 */
import React, { Component,PropTypes} from 'react';

class HelloWorld extends Component {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        return (
            <div>
                { this.props.children }
                <span>Hello World</span>
            </div>
        );
    }
}

HelloWorld.propTypes = {
    children: PropTypes.any,
};

export default HelloWorld;