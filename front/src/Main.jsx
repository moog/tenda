import React, { Component } from 'react';
import Sidebar from './components/Sidebar.jsx';
import { Row, Col } from 'antd';
import './Main.styl';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.location
        }
    }

    componentWillReceiveProps() {
        this.setState({location: this.props.location})
    }

    render() {
        return (
            <div className="main">
                <Row type="flex" className="header">
                    <Col span={24}>
                        <h1 className="mainTitle">Tenda Santa Rita</h1>
                    </Col>
                </Row>
                <Row type="flex" className="body">
                    <Col span={3}>
                        <Sidebar location={this.state.location} />
                    </Col>
                    <Col span={19} offset={1} className="content">
                        { this.props.children }
                    </Col>
                </Row>
            </div>
        )
    }
}
