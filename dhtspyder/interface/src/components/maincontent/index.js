import React, {Component} from 'react'
import styles from './index.less'
import {Button, Input} from 'antd';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchStr: ''
        };
    }
    getHotLabel() {
        var items = []
        for (var i = 0; i < 90; i++){
            items[i] = (<Button className="label" onClick={this.autoComplete.bind(this,i)} key={i} type="primary">{i}</Button>)
        }
       
        return items
    }
    autoComplete(i) {
        this.setState({
            searchStr: i
        })
    }
    render() {
        return (
            <div className="mainContent">
                <div className="wrapper">
                    <h1 className="title">
                        DHT爬虫工具
                    </h1>
                    <div className="user-input">
                        <Input value={this.state.searchStr}></Input>
                        <Button type="primary" className="search">搜索</Button>
                    </div>
                    <div className="frequent-label">
                        {
                            this.getHotLabel(10)
                       }
                    </div>
                </div>

            </div>
        )
    }
}

export default MainContent