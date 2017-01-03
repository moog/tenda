import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Checkbox, Select, Form, Row, Col, Icon, Input, InputNumber, Card, message } from 'antd';
import axios from 'axios';

class ProductCreate extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = { product: this.props.form.getFieldsValue() };
        message.loading('Salvando...')
        axios.post('/api/products', data)
            .then((product) => {
                message.destroy()
                message.success('Produto salvo!');
                this.props.router.push('/products');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Card title="Criar Produto">
                <Form vertical onSubmit={this.handleSubmit}>
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

export default Form.create({})(ProductCreate)
