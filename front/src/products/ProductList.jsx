import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, Table, Icon, Popconfirm, message } from 'antd';
import axios from 'axios';

export default class ProductList extends Component {
    constructor() {
        super();

        this.state = {
            products: []
        };

        this.handleList = this.handleList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.handleList();
    }

    handleList() {
        axios.get('/api/products')
            .then((payload) => {
                if(payload.data.errors.length == 0) {
                    let products = payload.data.products;

                    if(payload.data.products && payload.data.products.length > 0) {
                        products = products.map((e, i) => {
                            e.key = i;
                            return e;
                        })
                    }

                    this.state.products = products;
                    this.forceUpdate();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleDelete(productId) {
        let data = { _method: "DELETE" };
        message.loading('Excluindo...', 10);
        axios.post('/api/products/' + productId, data)
            .then((payload) => {
                message.destroy();
                message.success('Produto excluído!', 2);
                this.handleList();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const columns = [{
            title: 'Nome',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price'
        }, {
            title: 'Quantidade',
            dataIndex: 'amountMeasured',
            key: 'amount',
        }, {
            title: '',
            render: (text, record, index) => {
                return (
                    <span>
                        <Link to={"/products/" + record._id}>
                            Editar
                        </Link>
                        <span className="ant-divider" />
                        <Popconfirm
                            title="Tem certeza disso?"
                            onConfirm={() => this.handleDelete(record._id)}
                            okText="Sim"
                            cancelText="Cancelar"
                        >
                            <a>Excluir</a>
                        </Popconfirm>
                    </span>
                )
            }
        }];

        const ButtonNewProduct = (
            <Link to="/products/new">
                <Icon type="plus" /> novo produto
            </Link>
        )

        return (
            <Card title="Produtos" extra={ButtonNewProduct}>
                <Table dataSource={this.state.products} columns={columns} />
            </Card>
        )
    }
}
