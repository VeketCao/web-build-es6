/**
 * Created by Veket on 2016/11/10.
 */
import React, { Component,PropTypes} from 'react';
import './main.css';

class M1 extends Component {
    constructor(props, content) {
        super(props, content);
        this.state = {
            pubsub_param:''
        }
    }
    componentWillMount(){
        this.pubsub_token = ps.subscribe('MY_TOPIC', function(topic, param) {
            this.setState({pubsub_param:param});
        }.bind(this));
    }
    componentWillUnmount(){
        ps.unsubscribe(this.pubsub_token);
    }
    render() {
        const titleStyle = {
            height: this.props.height||'60px'
        };
        //url传参，?name=aa,获取方法
        //console.log(this.props.location.query.name);
        return (
            <div id="M1" style={titleStyle}>
                <i className="m1-img-test"></i>
                <span>this is m1</span>
                <div>
                    <label>pubsub test :</label>
                    <span>{this.state.pubsub_param}</span>
                </div>
                <div>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

M1.propTypes = {
    children: PropTypes.any,
};

export default M1;