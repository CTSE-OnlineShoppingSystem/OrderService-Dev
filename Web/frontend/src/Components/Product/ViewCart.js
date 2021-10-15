import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Col, Form, Modal, Row, Table} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";
import AuthenticationService from "../Login/AuthenticationService";

class ViewCart extends Component{

    constructor(props){
        super(props);

        this.state = {
            vendorId: AuthenticationService.loggedUserId(),
            productName:'',
            productPrice:'',
            availability:'',
            quantity:'',
            cartId:'',
            total:0,
            show:false,
            pop:false,
            items:[]
        }
    }

    componentDidMount() {
        this.retrieveById();
    }

    retrieveById = () => {
        axios.get(`http://localhost:8080/cart/`+this.state.vendorId)
            .then(response => {
                console.log(response.data)
                this.setState({
                    vendorId:response.data.vendorId,
                    cartId:response.data.cartId,
                    items:response.data.item,
                    total:response.data.total
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    showModalBox = () => {
        this.setState({show: true,pop:false})
    }


    showCart = () => {
        this.setState({pop: true})
    }
    //Modal box
    closeCart = () => {
        this.setState({pop: false})
        this.refreshTable();
    }

    gotoDeliveryDetails() {
        this.props.history.push("/deliveryDetails/");
    }

    deleteItem = (itemId) => {

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
                axios.put('http://localhost:8080/cart/' +this.state.vendorId+'/'+itemId)
                    .then(res => {

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
                                    <tr key={item.itemId}>
                                        <td style={{verticalAlign: 'middle'}}>{item.itemName}</td>
                                        <td style={{verticalAlign: 'middle'}}>{item.quantity}</td>
                                        <td style={{verticalAlign: 'middle'}}>
                                            <ButtonGroup>
                                                <Button variant={"danger"} type={"submit"} key={item.itemId} onClick={() => this.deleteItem(item.itemId)}><FontAwesomeIcon icon={faTimes}/></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                <Row>
                    <Col  md={4} >Total Amount -
                        <Badge bg="success" className={"px-3 py-2"} key={"0"}>Rs.{total}.00</Badge>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        {items.length == 0 &&
                        <button className={"cnfrm-order-disabled-btn"}
                                type={"submit"}
                                disabled
                                key={this.state.vendorId}
                                onClick={() => this.gotoDeliveryDetails()}>
                            Confirm Order
                        </button>
                        }
                        {items.length != 0 &&
                        <button className={"cnfrm-order-btn"}
                                type={"submit"}
                                key={this.state.vendorId}
                                onClick={() => this.gotoDeliveryDetails()}>
                            Confirm Order
                        </button>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(ViewCart);
