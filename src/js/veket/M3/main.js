/**
 * Created by Veket on 2016/11/10.
 */
import React, { Component,PropTypes} from 'react';

class M3 extends Component {
    constructor(props, content) {
        super(props, content);
        this.clickHandle = this.clickHandle.bind(this);
    }
    clickHandle(){
        PubSub.publish( 'MY_TOPIC', 'hello world!' );
    }
    render() {
        return (
            <div id="M3">
                <span>this is m3</span>
                <button onClick={this.clickHandle}>btn</button>
            </div>
        );
    }
}

export default M3;