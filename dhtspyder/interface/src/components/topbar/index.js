import React, {Component} from 'react'
import styles from './index.less'
import {Button} from 'antd';

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };
    }

    render() {
        return (
            <div className="topbar">
                <div className="content">
                    <div className="icon">
                        <a href="javascript:;"></a>
                    </div>
                    <div className="btn-group ">
                        <Button className="btn signIn">登录</Button>
                        <Button className="btn signUp">注册</Button>
                    </div>

                </div>

            </div>
        )
    }
}

export default TopBar