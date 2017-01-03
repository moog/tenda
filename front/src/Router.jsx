import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';

import Main from './Main.jsx';
import ProductList from './products/ProductList.jsx';
import ProductCreate from './products/ProductCreate.jsx';
import ProductEdit from './products/ProductEdit.jsx';

render(
    <LocaleProvider locale={ptBR}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <Route path="/products" component={ProductList} />
                <Route path="/products/new" component={ProductCreate} />
                <Route path="/products/:productId" component={ProductEdit} />
            </Route>
        </Router>
    </LocaleProvider>

    , document.getElementById('App')
)
