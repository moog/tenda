import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

import './Sidebar.styl';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedKeys: [props.location.pathname]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedKeys: [nextProps.location.pathname]})
    }

    render() {
        return (
            <div className="sidebar">
                <Menu selectedKeys={this.state.selectedKeys}>
                    <Menu.Item key="/">
                        <Link to="/">Vendas</Link>
                    </Menu.Item>
                    <Menu.Item key="/products">
                        <Link to="/products">Produtos</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
