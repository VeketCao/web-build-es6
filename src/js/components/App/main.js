/**
 * Created by Veket on 2016/11/10.
 */
import React, { Component,PropTypes} from 'react';
import Header from '../Header/main';
import Footer from '../Footer/main';
import './main.css';

class App extends Component {
    constructor(props, content) {
        super(props, content);
    }
    render() {
        return (
            <div id="App" className="app-container">
                <Header/>
                <div className="app-content-container">{ this.props.children }</div>
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.any,
};

export default App;