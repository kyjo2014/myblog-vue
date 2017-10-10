import React, {Component} from 'react'
import styles from './index.less'
import { Button,Input } from 'antd';


class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };
    }

    render() {
        return (
            <div className="mainContent">
                <div className="wrapper">
                mainContent
                <Input></Input>
                </div>
              
            </div>
        )
    }
}

export default MainContent