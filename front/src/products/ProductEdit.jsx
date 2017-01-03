import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Select, Form, Row, Col, Input, InputNumber, Card, message } from 'antd';
import axios from 'axios';
//import './Products.styl';

class ProductEdit extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            product: {
                title: '',
                price: '',
                amount: '',
                measure: ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        axios.get('/api/products/' + this.props.params.productId)
            .then((payload) => {
                if(payload && payload.data.errors.length == 0) {
                    this.props.form.setFieldsValue(payload.data.product);
                    console.log(this.state.product);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = { _method: 'PUT', product: this.props.form.getFieldsValue() };
        message.loading('Salvando...', 10)
        axios.post('/api/products', data)
            .then((product) => {
                message.destroy();
                message.success('Produto salvo!', 2);
                this.props.router.push('/products');
            })
            .catch((error) => {
                message.error('Ocorreu um erro, tente novamente.', 2);
                console.log(error);
            })
    }

    handleInputChange(event) {
        const id = event.target.id;
        const value = event.target.value;
        this.state.product[id] = value;
        this.forceUpdate();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Card title="Editar produto">
                <Form vertical onSubmit={this.handleSubmit}>
                    {
                        getFieldDecorator('_id', {})(
                            <Input type="hidden" />
                        )
                    }
                    <Form.Item label="Nome" hasFeedback>
                        {
                            getFieldDecorator('title', {
                                rules: [{required: true, message: 'Informe o nome.'}]
                            })(
                                <Input autoFocus />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="Preço" hasFeedback>
                        {
                            getFieldDecorator('price', {
                                rules: [{required: true, message: 'Informe o preço.'}]
                            })(
                                <Input />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="Quantidade" hasFeedback>
                        {
                            getFieldDecorator('amount', {
                                rules: [{required: true, message: 'Informe a quantidade.'}]
                            })(
                                <Input />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="Unidade de medida" hasFeedback>
                        {
                            getFieldDecorator('measure', {
                                rules: [{required: true, message: 'Informe a unidade de medida.'}]
                            })(
                                <Select>
                                    <Select.Option value="g">(g) Gramas</Select.Option>
                                    <Select.Option value="kg">(kg) Quiloramas</Select.Option>
                                    <Select.Option value="ml">(mL) Mililitros</Select.Option>
                                    <Select.Option value="l">(L) Litros</Select.Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large">Salvar</Button>
                    <span className="ant-divider" />
                    <Link to="/products">Cancelar</Link>
                </Form>
            </Card>


        )
    }
}

export default Form.create({
    onFieldsChange: ProductEdit.handleInputChange
})(ProductEdit);
