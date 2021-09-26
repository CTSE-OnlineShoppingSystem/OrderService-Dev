import {Component} from "react/cjs/react.production.min";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Badge, Button, ButtonGroup, Modal, Table} from "react-bootstrap";

class OrderList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            orders: [],

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
        this.refreshTable();
    }

    rejectHandler = (id) =>{
        axios.put(`http://localhost:8080/order/reject/${id}`)
        this.refreshTable();
    }

    render() {
        const {orders} = this.state;
        return (
            <div className={"main-div"}>
                <div>
                    <ButtonGroup className={"order-btn-group"}>
                        <Button variant={"outline-info"} type={"submit"} className={"btn-status"}
                                onClick={this.refreshTable}>ALL ORDERS</Button>
                        <Button variant={"outline-success"} type={"submit"} className={"btn-status"}
                                onClick={() => this.approvedOrders()}>APPROVED</Button>
                        <Button variant={"outline-danger"} type={"submit"} className={"btn-status"}
                                onClick={() => this.rejectedOrders()}>REJECTED</Button>
                        <Button variant={"outline-warning"} type={"submit"} className={"btn-status"}
                                onClick={() => this.pendingOrders()}>PENDING</Button>
                        <Button variant={"outline-primary"} type={"submit"} className={"btn-status"}
                                onClick={() => this.automaticallyApprovedOrders()}>AUTOMATICALLY APPROVED</Button>
                    </ButtonGroup>
                </div>

                <Table striped responsive hover bordered>
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
                                            <Badge variant="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                                            }
                                            {order.approvalStatus === "Rejected" &&
                                            <Badge variant="danger" className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
                                            }
                                            {order.approvalStatus === "Pending" &&
                                            <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                            }
                                            {order.approvalStatus === "Automatically Approved" &&
                                            <Badge variant="success" className={"px-3 py-2"} key={"0"}>AUTOMATICALLY APPROVED</Badge>
                                            }
                                        </td>
                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                            {order.paymentStatus === "Paid" &&
                                            <Badge variant="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                                            }
                                            {order.paymentStatus === "Pending" &&
                                            <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                            }
                                        </td>
                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                            {order.deliveryDetails === "Completed" &&
                                            <Badge variant="success" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                                            }
                                            {order.deliveryDetails === "Pending" &&
                                            <Badge variant="warning" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                            }
                                        </td>
                                        <td style={{verticalAlign: 'middle'}}>click here to view items</td>
                                        <td style={{verticalAlign: 'middle'}}>{order.OrderDetails}</td>
                                        <td style={{verticalAlign: 'middle'}}>{order.total}</td>
                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                            <ButtonGroup>
                                                <Button variant={"warning"} type={"submit"}
                                                        onClick={() => this.approveHandler(order.orderId)}>
                                                    <FontAwesomeIcon icon={faCheck}/> Approve
                                                </Button>
                                                <Button variant={"danger"} type={"submit"}
                                                        onClick={() => this.rejectHandler(order.orderId)}>
                                                    <FontAwesomeIcon icon={faTrashAlt}/> Reject
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                            <Button variant={"warning"} type={"submit"}>
                                                <FontAwesomeIcon icon={faCheck}/> Pay
                                            </Button>
                                        </td>
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
        )
    }
}

export default OrderList;
