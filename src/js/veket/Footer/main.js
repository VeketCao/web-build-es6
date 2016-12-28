/**
 * Created by Veket on 2016/11/10.
 */
import React, { Component,PropTypes} from 'react'; 

class Footer extends Component {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        var bg = {
            background:'#eee',
            height:'100px'
        }
        return (
            <div id="Footer"  style={bg}>
                <span>this is Footer...</span>
            </div>
        );
    }
}

export default Footer;