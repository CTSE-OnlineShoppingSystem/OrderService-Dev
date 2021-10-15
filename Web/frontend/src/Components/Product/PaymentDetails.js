import React, {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import moment from 'moment';
import "./Product.css"
import PaymentDataService from "./PaymentDataService";
import OrderDataService from "../Order/OrderDataService";
import * as Swal from "sweetalert2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCartPlus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../Login/AuthenticationService";
import CartDataService from "./CartDataService";
import Navbar1 from "../Navbar1";
import './Delivery.css'

class PaymentDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orderId: this.props.match.params.id,
            order: '',
            vendorId: AuthenticationService.loggedUserId(),
            vendorName: AuthenticationService.loggedUserName(),
            cardNo: '',
            enteredCvv: '',
            cardPin: '',
            expMonth: '',
            expYear: '',
            cardBalance: '',
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            paymentId: '',
            date: moment(new Date()).format('YYYY-MM-DD'),
        }
    }

    componentDidMount() {
        this.getOrderById();
        this.getPaymentId();
    }

    // get card details
    getPaymentId = () => {
        axios.get('http://localhost:8080/payment/id')
            .then(response => {
                this.setState({
                    paymentId: response.data,
                })
            })
    }

    //changes handler
    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //get order details
    getOrderById = () => {
        axios.get(`http://localhost:8080/order/` + this.state.orderId)
            .then(response => {
                this.setState({
                     order: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //payment handler
    handlePayment = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:8080/paymentDummy/` + this.state.cardNo)
            .then(res => {
                if (res.status === 200) {
                    console.log(this.state.year)
                    console.log(this.state.month)
                    if(this.state.expYear >= this.state.year){
                        if(this.state.expMonth >= this.state.month){
                            if (res.data.secretNo == this.state.enteredCvv) {
                                if (this.state.order.total < res.data.balance) {
                                    const payment = {
                                        paymentId: this.state.paymentId,
                                        orderId: this.state.order.orderId,
                                        date: this.state.date,
                                        vendorId: this.state.order.vendorId,
                                        vendorName: this.state.order.vendorName,
                                        totalAmount: this.state.order.total,
                                    }

                                    console.log(payment);
                                    axios.post(`http://localhost:8080/payment/`, payment)
                                        .then(res => {
                                            if (res.status === 200) {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Successful',
                                                    html: '<p>Delivery Details Successfully Added</p>',
                                                    background: '#fff',
                                                    confirmButtonColor: '#1836d2',
                                                    iconColor: '#60e004'
                                                })

                                            }
                                            else {
                                                Swal.fire({
                                                    icon: 'warning',
                                                    title: 'Error!',
                                                    html: '<p>Error in adding delivery details</p>',
                                                    background: '#fff',
                                                    confirmButtonColor: '#1836d2',
                                                    iconColor: '#cc1919'
                                                })
                                            }
                                        })
                                }
                                else {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Error!',
                                        html: '<p>Insufficient Balance</p>',
                                        background: '#fff',
                                        confirmButtonColor: '#1836d2',
                                        iconColor: '#cc1919'
                                    })
                                }
                            }
                            else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Error!',
                                    html: '<p>Invalid Card Number</p>',
                                    background: '#fff',
                                    confirmButtonColor: '#1836d2',
                                    iconColor: '#cc1919'
                                })
                            }
                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Error',
                                html: '<p>Entered Card was Expired</p>',
                                background: '#fff',
                                confirmButtonColor: '#1836d2',
                                iconColor: '#cc1919'
                            })
                        }
                    }
                    else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Error',
                            html: '<p>Entered Card was Expired</p>',
                            background: '#fff',
                            confirmButtonColor: '#1836d2',
                            iconColor: '#cc1919'
                        })
                    }
                }
                else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        html: '<p>Error in receiving dummy data</p>',
                        background: '#fff',
                        confirmButtonColor: '#1836d2',
                        iconColor: '#cc1919'
                    })
                }
            })
    }

    render() {

        const {orderId} = this.state;

        return (
            <div className={"background"}>
                <div>
                    <Navbar1/>
                </div>
                <Card className={"crd-product-tb"}>
                    <Card.Body>
                        <div className={"main-div"}>
                            <Form onSubmit={this.handlePayment}>
                                <div className={"crd-product-title"}>Payment Information</div>
                                <Row>
                                    <Col>
                                        <Form.Group controlId={"formAmount"} className={"delivery-grp"}>
                                            <Form.Label className={"delivery-lbl"}>Order ID</Form.Label>
                                            <Form.Control type={"text"}
                                                          className={"delivery-input"}
                                                          disabled
                                                          value={this.state.order.orderId}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={"formAmount"} className={"delivery-grp"}>
                                            <Form.Label className={"delivery-lbl"}>Amount</Form.Label>
                                            <Form.Control type={"text"} name={"cardNo"}
                                                          className={"delivery-input"}
                                                          disabled
                                                          value={this.state.order.total}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId={"formCardName"} className={"delivery-grp"}>
                                            <Form.Label className={"delivery-lbl"}>Card Number</Form.Label>
                                            <Form.Control type={"text"} name={"cardNo"}
                                                          className={"delivery-input"}
                                                          required
                                                          placeholder={"Card Number"}
                                                          value={this.state.cardNo}
                                                          onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId={"formCardMonth"} className={"delivery-grp"}>
                                            <Form.Label className={"delivery-lbl"}>Month</Form.Label>
                                            <Form.Control type={"text"} name={"expMonth"} className={"delivery-input"} required
                                                          maxLength="2" pattern="[0-9]{2}" placeholder={"MM"}
                                                          value={this.state.expMonth} onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={"formCardYear"} className={"delivery-grp"}>
                                            <Form.Label className={"delivery-lbl"}>Year</Form.Label>
                                            <Form.Control type={"text"} name={"expYear"} className={"delivery-input"} required
                                                          maxLength="4" pattern="[0-9]{4}" placeholder={"YYYY"}
                                                          value={this.state.expYear} onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId={"formCardNo"} className={"delivery-grp"}>
                                            <Form.Label className={"delivery-lbl"}>CVV</Form.Label>
                                            <Form.Control type={"text"} name={"enteredCvv"} className={"delivery-input"}required
                                                          placeholder={"CVV"}
                                                          value={this.state.enteredCvv}
                                                          onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId={"formSubmitBtn"} className={"text-center"}>
                                    <button type={"submit"} className={"delivery-btn"}>Confirm Your Order</button>
                                </Form.Group>
                            </Form>



                        </div>


                    </Card.Body>


                </Card>

            </div>

        )
    }

}

export default PaymentDetails;
