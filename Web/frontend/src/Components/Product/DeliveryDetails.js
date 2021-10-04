import React, {Component} from "react";
// import '../../AdminDashboard/AdminNav.css';
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

class DeliveryDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vendorId: AuthenticationService.loggedUserId(),
            total: 0,
            cartId: '',
            items: [],
            address: '',
            cardHolderName: '',
            cardNo: '',
            enteredCvv: '',
            expMonth: '',
            expYear: '',
            cardPin: '',
            amount: '',
            cardBalance: '',
            vendorName: AuthenticationService.loggedUserName(),
            paymentStatus: '',
            approvalStatus: '',
            deliveryStatus: '',
            deliveryDetails: '',
            modifiedDate: moment(new Date()).format('YYYY-MM-DD'),
            month: new Date().getMonth() + 1,
            today: moment(new Date()).format('YYYY-MM-DD'),
        }
    }

    componentDidMount() {
        this.loadPaymentDetails();
    }

    // get card details
    loadPaymentDetails = () => {

        PaymentDataService.getDummyDetails(this.state.cardNo)
            .then(response => {
                console.log(response.data)
                this.setState({
                    cardNo: response.data.cardNo,
                    cvv: response.data.cvv,
                    amount: response.data.amount
                })
            })
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getCartById = () => {

        console.log(this.state.vendorId)
        axios.get(`http://localhost:8080/cart/` + this.state.vendorId)
            .then(response => {
                console.log("hiiii " + response.data)
                console.log("Object will display soon..")
                console.log(response)
                this.setState({
                    vendorId: response.data.vendorId,
                    cartId: response.data.cartId,
                    items: response.data.item,
                    total: response.data.total

                })

                console.log("Retireved From Cart")
                console.log(response.data.vendorId)
                console.log(response.data.items)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    getOrderId = () => {
        axios.get(`http://localhost:8080/order/id`)
            .then(response => {
                console.log(response)
                this.setState({
                    orderId: response.data,

                })
                console.log("Order id is")
                console.log(this.state.orderId)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handlePayment = (e) => {
        e.preventDefault();

        console.log(this.state.deliveryDetails)
        console.log(this.state.cardNo)
        console.log(this.state.enteredCvv)
        //check for card validity

        PaymentDataService.getDummyDetails(this.state.cardNo)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    console.log("entered CVV:" +this.state.enteredCvv)
                    console.log("response CVV:" +res.data.secretNo)

                    if (123 === 123) {
                        console.log("secret numbers are same")
                        this.getCartById()

                        if (this.state.total < res.data.balance) {

                            this.getOrderId()
                            const order = {
                                orderId: this.state.orderId,
                                modifiedDate: this.state.modifiedDate,
                                vendorId: this.state.vendorId,
                                vendorName: this.state.vendorName,
                                paymentStatus: "",
                                approvalStatus: "",
                                deliveryStatus: "",
                                deliveryDetails: this.state.deliveryDetails,
                                item: this.state.items,
                                total: 0
                            }

                            console.log(order);
                            OrderDataService.addOrder(order)
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
                        title: 'error',
                        html: '<p>Error in receiving dummy data</p>',
                        background: '#fff',
                        confirmButtonColor: '#1836d2',
                        iconColor: '#cc1919'
                    })
                }

            })


    }

    render() {

        const {
            orderId

        } = this.state;

        return (
            <div className={"background"}>

                <div>


                    <Navbar1/>
                </div>


                <Card className={"crd-product-tb"}>
                    <Card.Body>


                            <Row>
                                <Col  md={4} ><div className={"crd-product-title"}>Delivery Details</div></Col>

                                <Col md={{ span: 4, offset: 4 }}>

                                    {this.state.userRole === "Site Manager" &&
                                    <Button  varient={"primary"} type={"submit"} >
                                        <FontAwesomeIcon icon={faCartPlus}/>{this.state.orderId}</Button>
                                    }
                                </Col>

                            </Row>


                        <div className={"main-div"}>

                            <Form onSubmit={this.handlePayment}>

                                <Form.Group controlId={"formCardName"} className={"delivery-grp"}>
                                    <Form.Label className={"delivery-lbl"}>Enter the delivery address</Form.Label>
                                    <Form.Control type={"text"} name={"deliveryDetails"}
                                                  className={"delivery-input"} required
                                                  placeholder={"Delivery Details"}
                                                  value={this.state.deliveryDetails}
                                                  onChange={this.handleChange}/>
                                </Form.Group>

                                <div className={"crd-product-title"}>Payment Information</div>

<Row>
    <Col>
                                <Form.Group controlId={"formCardName"} className={"delivery-grp"}>
                                    <Form.Label className={"delivery-lbl"}>Card Number</Form.Label>
                                    <Form.Control type={"text"} name={"cardNo"}
                                                  className={"delivery-input"}
                                        // maxLength="16" pattern="[0-9]{16}"
                                                  required
                                                  placeholder={"Card Number"}
                                                  value={this.state.cardNo}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
    </Col>
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
                                {/*<Row>*/}
                                {/*    <Col>*/}
                                {/*        <Form.Group controlId={"formCardMonth"} className={"pay-form-content"}>*/}
                                {/*            <Form.Label className={"pay-form-label"}>Month</Form.Label>*/}
                                {/*            <Form.Control type={"text"} name={"expMonth"} className={"pay-input"} required*/}
                                {/*                          maxLength="2" pattern="[0-9]{2}" placeholder={"MM"}*/}
                                {/*                          value={expMonth} onChange={this.handleChange}/>*/}
                                {/*        </Form.Group>*/}
                                {/*    </Col>*/}
                                {/*    <Col>*/}
                                {/*        <Form.Group controlId={"formCardYear"} className={"pay-form-content"}>*/}
                                {/*            <Form.Label className={"pay-form-label"}>Year</Form.Label>*/}
                                {/*            <Form.Control type={"text"} name={"expYear"} className={"pay-input"} required*/}
                                {/*                          maxLength="4" pattern="[0-9]{4}" placeholder={"YYYY"}*/}
                                {/*                          value={expYear} onChange={this.handleChange}/>*/}
                                {/*        </Form.Group>*/}
                                {/*    </Col>*/}
                                {/*    <Col>*/}
                                {/*        <Form.Group controlId={"formCardCVV"} className={"pay-form-content"}>*/}
                                {/*            <Form.Label className={"pay-form-label"}>CVV</Form.Label>*/}
                                {/*            <Form.Control type={"password"} name={"cvv"} className={"pay-input"} required*/}
                                {/*                          maxLength="3" pattern="[0-9]{3}" placeholder={"CVV"}*/}
                                {/*                          value={cvv} onChange={this.handleChange}/>*/}
                                {/*        </Form.Group>*/}
                                {/*    </Col>*/}
                                {/*</Row>*/}
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

export default DeliveryDetails;