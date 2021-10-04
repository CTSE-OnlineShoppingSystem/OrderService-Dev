import {Component} from "react/cjs/react.production.min";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faExternalLinkAlt,
    faMoneyBill,
    faMoneyBillAlt, faMoneyBillWave, faMoneyBillWaveAlt,
    faMoneyCheck,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {Badge, Button, ButtonGroup, Card, Container, Modal, Nav, Navbar, NavDropdown, Table} from "react-bootstrap";
import './Order.css';
import '../../Stylesheets/Home.css'
import React from "react";
import AuthenticationService from "../Login/AuthenticationService";
import Swal from "sweetalert2";
import Navbar1 from '../Navbar1'

class OrderList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            userRole: AuthenticationService.loggedUserRole()

        }
    }

    componentDidMount(){
        this.refreshTable();
    }

    refreshTable = () =>{
        axios.get('http://localhost:8080/order/')
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    pendingOrders = () =>{
        axios.get('http://localhost:8080/order/pendingOrders')
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    approvedOrders = () =>{
        axios.get('http://localhost:8080/order/approvedOrders')
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    automaticallyApprovedOrders = () =>{
        axios.get('http://localhost:8080/order/automaticallyApprovedOrders')
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    rejectedOrders = () =>{
        axios.get('http://localhost:8080/order/rejectedOrders')
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    approveHandler = (id) =>{
        axios.put(`http://localhost:8080/order/approve/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Order approved successfully!!</p>',
                        background: '#fff',
                        confirmButtonColor: '#1836d2',
                        iconColor: '#60e004'
                    })
                    this.refreshTable();

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>There was an error approving the order!!</p>',
                        background: '#fff',
                        confirmButtonColor: '#1836d2',
                        iconColor: '#e00404'
                    })
                }
            });
        this.refreshTable();
    }

    rejectHandler = (id) =>{
        axios.put(`http://localhost:8080/order/reject/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Order rejected successfully!!</p>',
                        background: '#fff',
                        confirmButtonColor: '#1836d2',
                        iconColor: '#60e004'
                    })
                     this.refreshTable();

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>There was an error rejecting the order!!</p>',
                        background: '#fff',
                        confirmButtonColor: '#1836d2',
                        iconColor: '#e00404'
                    })
                }
            });
        this.refreshTable();
    }
    logout = () => {
        AuthenticationService.logout();
        this.props.history.push("/")
    }

    render() {
        const {orders} = this.state;
        return (
            <div>
            <div className={"background"}>
                <div>
                    {/*<Navbar expand="lg" className={"nav-main"}>*/}
                    {/*    <Container>*/}
                    {/*        <Navbar.Brand href="#home" className={"topic"}>Procurement System</Navbar.Brand>*/}
                    {/*        <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                    {/*        <Navbar.Collapse id="basic-navbar-nav">*/}
                    {/*            {this.state.userRole === "Site Manager" &&*/}
                    {/*            <Nav className="me-auto">*/}
                    {/*                /!*<Nav.Link href="/">Home</Nav.Link>*!/*/}
                    {/*                <Nav.Link href="/products" className={"topic-link"}>Products</Nav.Link>*/}
                    {/*                */}
                    {/*            </Nav>}*/}
                    {/*            {this.state.userRole === "Site Manager" &&*/}
                    {/*            <Nav>*/}
                    {/*                <Nav.Link ><button className={"btn-logout"} onClick={this.logout}>Log Out</button></Nav.Link>*/}


                    {/*            </Nav>*/}
                    {/*            }*/}
                    {/*        </Navbar.Collapse>*/}
                    {/*    </Container>*/}
                    {/*</Navbar>*/}
                    <Navbar1/>

                </div>
                <Card className={"crd-order-tb"}>
                    <Card.Body>
                        <Card.Title className={"crd-order-title"}>Orders List</Card.Title>
                    <div className={"main-div"}>

                        <div>
                            <ButtonGroup className={"order-btn-group"}>
                                <Button variant={"outline-primary"} type={"submit"} className={"btn-status"}
                                        onClick={this.refreshTable}>ALL ORDERS</Button>
                                <Button variant={"outline-success"} type={"submit"} className={"btn-status"}
                                        onClick={() => this.approvedOrders()}>APPROVED</Button>
                                <Button variant={"outline-danger"} type={"submit"} className={"btn-status"}
                                        onClick={() => this.rejectedOrders()}>REJECTED</Button>
                                <Button  variant={"outline-warning"} type={"submit"} className={"btn-status"}
                                        onClick={() => this.pendingOrders()}>PENDING</Button>
                                <Button variant={"outline-secondary"} type={"submit"} className={"btn-status"}
                                        onClick={() => this.automaticallyApprovedOrders()}>AUTOMATICALLY APPROVED</Button>
                            </ButtonGroup>
                        </div>

                        <Table striped responsive="xl" hover bordered className={"order-table"}>
                            <thead>
                            <tr>
                                <th className={"text-center"}>Order ID</th>
                                <th className={"text-center"}>Vendor ID</th>
                                <th className={"text-center"}>Vendor Name</th>
                                <th className={"text-center"}>Date</th>
                                <th className={"text-center"}>Approve Status</th>
                                <th className={"text-center"}>Payment Status</th>
                                <th className={"text-center"}>Delivery Status</th>
                                <th className={"text-center"}>Items</th>
                                <th className={"text-center"}>Delivery Details</th>
                                <th className={"text-center"}>Total Price</th>
                                <th className={"text-center"}>Action</th>
                                <th className={"text-center"}>Pay</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orders.length === 0 ?
                                    <tr align={"center"}>
                                        <td colSpan={"5"}>No records at the moment</td>
                                    </tr>

                                    : [
                                        orders.map (order =>
                                            <tr key={order.orderId}>
                                                <td style={{verticalAlign: 'middle'}}>{order.orderId}</td>
                                                <td style={{verticalAlign: 'middle'}}>{order.vendorId}</td>
                                                <td style={{verticalAlign: 'middle'}}>{order.vendorName}</td>
                                                <td style={{verticalAlign: 'middle'}}>{order.modifiedDate}</td>
                                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                    {order.approvalStatus === "Approved" &&
                                                    <Badge bg="primary" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                                                    }
                                                    {order.approvalStatus === "Rejected" &&
                                                    <Badge bg="danger" className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
                                                    }
                                                    {order.approvalStatus === "Pending" &&
                                                    <Badge bg="warning" text="dark" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                                    }
                                                    {order.approvalStatus === "Automatically Approved" &&
                                                    <Badge bg="secondary" className={"px-3 py-2"} key={"0"}>AUTOMATICALLY APPROVED</Badge>
                                                    }
                                                </td>
                                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                    {order.paymentStatus === "Paid" &&
                                                    <Badge bg="primary" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                                                    }
                                                    {order.paymentStatus === "Pending" &&
                                                    <Badge bg="warning" text="dark" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                                    }
                                                </td>
                                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                    {order.deliveryDetails === "Completed" &&
                                                    <Badge bg="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                                                    }
                                                    {order.deliveryDetails === "Pending" &&
                                                    <Badge bg="warning" text="dark" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                                    }
                                                </td>
                                                <td style={{verticalAlign: 'middle'}}> <Button variant={"outline-primary"} >
                                                    <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                                </Button></td>
                                                <td style={{verticalAlign: 'middle'}}>{order.OrderDetails}</td>
                                                <td style={{verticalAlign: 'middle'}}>Rs.{order.total}</td>
                                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                    {this.state.userRole === "Management Staff" &&
                                                    <ButtonGroup>

                                                        <Button variant={"outline-primary"} type={"submit"}
                                                                onClick={() => this.approveHandler(order.orderId)}>
                                                            <FontAwesomeIcon icon={faCheck}/>
                                                        </Button>
                                                        <Button variant={"outline-danger"} type={"submit"}
                                                                onClick={() => this.rejectHandler(order.orderId)}>
                                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                                        </Button>
                                                    </ButtonGroup>
                                                    }
                                                    {this.state.userRole === "Accounting Staff" &&
                                                    <ButtonGroup>

                                                        <Button variant={"outline-primary"} type={"submit"}
                                                                onClick={() => this.approveHandler(order.orderId)} disabled>
                                                            <FontAwesomeIcon icon={faCheck}/>
                                                        </Button>
                                                        <Button variant={"outline-danger"} type={"submit"}
                                                                onClick={() => this.rejectHandler(order.orderId)} disabled>
                                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                                        </Button>
                                                    </ButtonGroup>
                                                    }
                                                    {this.state.userRole === "Site Manager" &&
                                                    <ButtonGroup>

                                                        <Button variant={"outline-primary"} type={"submit"}
                                                                onClick={() => this.approveHandler(order.orderId)} disabled>
                                                            <FontAwesomeIcon icon={faCheck}/>
                                                        </Button>
                                                        <Button variant={"outline-danger"} type={"submit"}
                                                                onClick={() => this.rejectHandler(order.orderId)} disabled>
                                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                                        </Button>
                                                    </ButtonGroup>
                                                    }
                                                </td>
                                                {this.state.userRole === "Management Staff" &&
                                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                    <Button variant={"outline-success"} type={"submit"} disabled>
                                                        <FontAwesomeIcon icon={faMoneyBillWaveAlt}/>
                                                    </Button>
                                                </td>
                                                }

                                                {this.state.userRole === "Accounting Staff" &&
                                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                    <Button variant={"outline-success"} type={"submit"} >
                                                        <FontAwesomeIcon icon={faMoneyBillWaveAlt}/>
                                                    </Button>
                                                </td>
                                                }

                                                {this.state.userRole === "Site Manager" &&
                                                <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                    <Button variant={"outline-success"} type={"submit"} disabled>
                                                        <FontAwesomeIcon icon={faMoneyBillWaveAlt}/>
                                                    </Button>
                                                </td>
                                                }
                                            </tr>
                                        )
                                    ]
                            }
                            </tbody>
                        </Table>

                        {/*--------------------------Model Box to Edit Conference--------------------------*/}

                        {/*<Modal show={this.state.show} onHide={this.handleClose} centered>*/}
                        {/*    <Modal.Header closeButton>*/}
                        {/*        <Modal.Title>Update</Modal.Title>*/}
                        {/*    </Modal.Header>*/}
                        {/*    <Modal.Body> <UpdateConferenceDetailsComponent conferenceId={this.state.conferenceId}/>*/}
                        {/*    </Modal.Body>*/}
                        {/*</Modal>*/}

                        {/*--------------------------------------------------------------------------------*/}
                    </div>
                    </Card.Body>
</Card>



            </div>
            </div>

        )
    }
}

export default OrderList;
