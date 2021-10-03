import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Col, Form, Modal, Row, Table} from "react-bootstrap";
import axios from "axios";
import AuthenticationService from "../Login/AuthenticationService";
import ProductDataService from "./ProductDataService";
import {config} from "@fortawesome/fontawesome-svg-core";
import Swal from "sweetalert2";
import CartDataService from "./CartDataService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faCross, faEdit, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import DeliveryDetails from "./DeliveryDetails";

class ViewCart extends Component{

    constructor(props){
        super(props);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);

        this.state = {
            vendorId: props.classId,
            productName:'',
            productPrice:'',
            availability:'',
            quantity:'',
            cartId:'C00',
            total:0,
            show:false,
            pop:false,
            // item:'',
            items:[]
            // vendorId: AuthenticationService.loggedUserId()



        }
    }
    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {

        this.retrieveById();

    }

    refreshTable = () =>{
        axios.get('http://localhost:8080/product/')
            .then(response => {
                this.setState({products: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    retrieveById = () => {

        axios.get(`http://localhost:8080/cart/`+this.state.vendorId)
            .then(response => {
                console.log("hiiii "+response.data)
                console.log("Object will display soon..")
                console.log(response)
                this.setState({
                    vendorId:response.data.vendorId,
                    cartId:response.data.cartId,
                    items:response.data.item,
                    total:response.data.total
                    // productPrice:response.data.productPrice,
                    // availability:response.data.availability

                })

                console.log(response.data.vendorId)
                console.log(response.data.items)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    showModalBox = () => {
        this.setState({show: true,pop:false})
    }
    //Modal box
    closeModalBox = () => {
        this.setState({show: false})
        this.refreshTable();
    }

    showCart = () => {
        this.setState({pop: true})
    }
    //Modal box
    closeCart = () => {
        this.setState({pop: false})
        this.refreshTable();
    }


    onChangeQuantity(e){
        this.setState({
            quantity : e.target.value
        });
        console.log(this.state.quantity);
    }

    handleAddToCart = (e) => {
        e.preventDefault();

        const vendorId = this.state.vendorId;
        const cartId = this.state.cartId;
        // const productId = this.state.productId;
        // const productName = this.state.productName;

        const item = {
            itemId: this.state.productId,
            itemName: this.state.productName,
            quantity: this.state.quantity,
            itemPrice: this.state.productPrice}

        const array = [];
        array.push(item);
        console.log(array)
        // const availability = this.state.availability;
        // const quantity = this.state.quantity;
        // const productPrice = this.state.productPrice;

        const total = this.state.total;
        // update all including files
        console.log("UPDATING FILE...");

        let cart = {
            vendorId: vendorId,
            cartId: cartId,
            item: array,
            total: total
        }

        // const formData = new FormData();
        // formData.append('vendorId',vendorId)
        // formData.append('cartId', cartId)
        // formData.append('item',array)
        // formData.append('total',total)
        // formData.append('productId', productId)
        // formData.append('productName', productName)

        // formData.append('availability', availability)
        // formData.append('quantity', quantity)
        // formData.append('productPrice', productPrice)

        console.log(cart);
        CartDataService.addToCart(cart)
            .then(res => {
                console.log(res);

                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Added to cart successfully!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })

                    this.props.close();
                    this.refreshTable();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#e00404'
                    })
                }
            })

        this.refreshTable();

    }

    gotoDeliveryDetails(vendorId) {
        // this.props.close();
        this.setState(
            {
                vendorId: vendorId,
                // pop:false,
                show:true
            }
        )
    }

    render(){

        const {items,total,vendorId} = this.state;
        return(

            <div className={"wrapper-div"}>
                {/*<Form onSubmit={this.handleAddToCart}>*/}

                {/*    <div className={"detail-box-section"}>*/}
                {/*        <div className={"detail-group-left-title"}><label>Vendor ID </label></div>*/}
                {/*        <div className={"detail-group-right-text"}><input type = "text"*/}
                {/*                                                          required*/}
                {/*                                                          disabled*/}
                {/*                                                          className = "form-control"*/}
                {/*                                                          value = {vendorId}*/}
                {/*                                                          placeholder={"Enter Product ID"}*/}
                {/*        /></div>*/}
                {/*    </div>*/}

                {/*    <div className={"detail-box-section"}>*/}
                {/*        <div className={"detail-group-left-title"}><label>Cart ID </label></div>*/}
                {/*        <div className={"detail-group-right-text"}><input type = "text"*/}
                {/*                                                          required*/}
                {/*                                                          disabled*/}
                {/*                                                          className = "form-control"*/}
                {/*                                                          value = {cartId}*/}
                {/*                                                          placeholder={"Enter Product ID"}*/}
                {/*        /></div>*/}
                {/*    </div>*/}
                    <Table striped responsive hover bordered >
                        <thead>
                        <tr>

                            <th className={"text-center"}>Item Name</th>
                            <th className={"text-center"}>Quantity</th>
                            <th className={"text-center"}>Action</th>

                        </tr>
                        </thead>
                        <tbody>
                             {items.map (item =>
                                    <tr key={items.vendorId}>

                                        <td style={{verticalAlign: 'middle'}}>{item.itemName}</td>
                                        <td style={{verticalAlign: 'middle'}}>{item.quantity}</td>
                                        <td style={{verticalAlign: 'middle'}}>
                                            <ButtonGroup>
                                                <Button variant={"danger"} type={"submit"}><FontAwesomeIcon icon={faTimes}/></Button>
                                            </ButtonGroup>

                                        </td>


                                    </tr>
                                )

                    }

                        </tbody>
                    </Table>

                {/*<div className={"detail-box-section"}>*/}
                    {/*    <div className={"detail-group-left-title"}><label>Product Price </label></div>*/}
                    {/*    <div className={"detail-group-right-text"}><input type = "text"*/}
                    {/*                                                      required*/}
                    {/*                                                      className = "form-control"*/}
                    {/*                                                      disabled*/}
                    {/*                                                      value = {itemName}*/}

                    {/*                                                      placeholder={"Enter Product Price"}*/}
                    {/*    /></div>*/}
                    {/*</div>*/}

                    {/*<div className={"detail-box-section"}>*/}
                    {/*    <div className={"detail-group-left-title"}><label>Product Availability </label></div>*/}
                    {/*    <div className={"detail-group-right-text"}> <input type = "text"*/}
                    {/*                                                       required*/}
                    {/*                                                       className = "form-control"*/}
                    {/*                                                       disabled*/}
                    {/*                                                       value = {availability}*/}

                    {/*                                                       placeholder={"Enter Product Availability"}*/}
                    {/*    /></div>*/}
                    {/*</div>*/}
                    {/*<div className={"detail-box-section"}>*/}
                    {/*    <div className={"detail-group-left-title"}><label>Enter Quantity </label></div>*/}
                    {/*    <div className={"detail-group-right-text"}> <input type = "text"*/}
                    {/*                                                       required*/}
                    {/*                                                       className = "form-control"*/}

                    {/*                                                       value = {this.state.quantity}*/}
                    {/*                                                       onChange = {this.onChangeQuantity}*/}
                    {/*                                                       placeholder={"Enter Product Quantity"}*/}
                    {/*    /></div>*/}
                    {/*</div>*/}

                    {/*<div className={"total-price"}>Total Amount -  <Badge bg="primary" className={"px-3 py-2"} key={"0"}>Rs.{total}.00</Badge></div>*/}
                    {/*<div className={"cnfrm-order-btn-corner"}><button className={"cnfrm-order-btn"} type={"submit"} >Add Product</button></div>*/}

                <Row>
                    <Col  md={4} >Total Amount - <Badge bg="success" className={"px-3 py-2"} key={"0"}>Rs.{total}.00</Badge></Col>

                    <Col md={{ span: 4, offset: 4 }}>
                        <button className={"cnfrm-order-btn"} type={"submit"} key={this.state.vendorId}
                                onClick={() => this.gotoDeliveryDetails(this.state.vendorId)}>Confirm Order</button>
                    </Col>

                </Row>


                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                {/*<Modal show={this.state.show}  onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>Delivery Details</Modal.Title>*/}
                {/*    </Modal.Header >*/}
                {/*    <Modal.Body className={"custom-modal-body-login p-0"}>*/}
                {/*        <DeliveryDetails classId={this.state.vendorId} close={this.closeModalBox} />*/}
                {/*    </Modal.Body>*/}
                {/*</Modal>*/}
                {/*------------------------------------------------------------------------------*/}

                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                {/*<Modal show={this.state.pop} onHide={this.closeCart} centered fullscreen={"sm-down"} size={"lg"}>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>Your Cart</Modal.Title>*/}
                {/*    </Modal.Header >*/}
                {/*    <Modal.Body className={"custom-modal-body-login p-0"}>*/}
                {/*        <ViewCart classId={this.state.vendorId} close={this.closeCart} />*/}
                {/*    </Modal.Body>*/}
                {/*</Modal>*/}
                {/*------------------------------------------------------------------------------*/}

                {/*</Form>*/}
            </div>
        )
    }


}
export default ViewCart;