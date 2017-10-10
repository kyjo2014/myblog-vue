import React, {Component} from 'react'
import styles from './app.less'

import TopBar from './topbar/index'
import MainContent from './maincontent/index'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };
    }
   
    render() {
        return (
            <div className="app">
                <TopBar></TopBar>
                <MainContent></MainContent>
            </div>
        )
    }
}

export default App