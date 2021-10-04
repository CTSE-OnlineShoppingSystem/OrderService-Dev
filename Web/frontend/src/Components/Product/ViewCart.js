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
import {Link, withRouter} from "react-router-dom";
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
                        confirmButtonColor: '#1836d2',
                        iconColor: '#60e004'
                    })

                    this.props.close();
                    this.refreshTable();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding to cart!',
                        background: '#fff',
                        confirmButtonColor: '#1836d2',
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
                // show:true
            }
        )
        this.props.history.push("/deliveryDetails/");
    }

    deleteItem = (vendorId,itemId) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this record!",
            icon: 'warning',
            background: '#fff',
            confirmButtonColor: '#1836d2',
            iconColor: '#ffc200',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://localhost:8080/cart/' +vendorId+'/'+itemId)
                    .then(res => {

                        console.log(res.status);
                        if (res.status === 200) {



                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                text: "Item has been deleted!!",
                                background: '#fff',
                                confirmButtonColor: '#1836d2',
                                iconColor: '#60e004'
                            })

                            this.retrieveById();
                        }
                    });
            }
        })

    }

    render(){

        const {items,total,vendorId} = this.state;
        return(

            <div className={"wrapper-div"}>

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
                                                <Button variant={"danger"} type={"submit"} key={items.vendorId} onClick={() => this.deleteItem(items.vendorId,item.itemId)}><FontAwesomeIcon icon={faTimes}/></Button>
                                            </ButtonGroup>

                                        </td>


                                    </tr>
                                )

                    }

                        </tbody>
                    </Table>



                <Row>
                    <Col  md={4} >Total Amount - <Badge bg="success" className={"px-3 py-2"} key={"0"}>Rs.{total}.00</Badge></Col>

                    <Col md={{ span: 4, offset: 4 }}>
                        <button className={"cnfrm-order-btn"} type={"submit"} key={this.state.vendorId}
                                onClick={() => this.gotoDeliveryDetails(this.state.vendorId)}>Confirm Order</button>
                    </Col>

                </Row>



            </div>
        )
    }



}
export default withRouter(ViewCart);