import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import OrderList from "./Order/OrderList";
import ProductList from "./Product/ProductList";
import AddProducts from "./Product/AddProducts";
import PaymentList from "./Payment/PaymentList";

class Frontend extends Component {

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        <Route path="/orders" exact component={OrderList}/>
                        <Route path="/products" exact component={ProductList}/>
                        <Route path="/addProduct" exact component={AddProducts}/>
                        <Route path="/paymentList" exact component={PaymentList}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Frontend;
