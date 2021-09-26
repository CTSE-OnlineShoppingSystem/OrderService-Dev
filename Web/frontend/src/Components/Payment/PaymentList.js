import {Component} from "react";
import axios from "axios";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

class PaymentList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            order: '',
            orderId: '',
            payments: []
        }
    }

    componentDidMount() {
        this.getPaymentList();
    }

    getPaymentList = () =>{
        axios.get('http://localhost:8080/payment/')
            .then(response => {
                this.setState({payments: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        const {payments} = this.state;
        return (
            <div className={"main-div"}>
                <Table striped responsive hover bordered>
                    <thead>
                    <tr>
                        <th className={"text-center"}>Payment ID</th>
                        <th className={"text-center"}>Order ID</th>
                        <th className={"text-center"}>Vendor ID</th>
                        <th className={"text-center"}>Vendor Name</th>
                        <th className={"text-center"}>Date</th>
                        <th className={"text-center"}>Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        payments.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan={"5"}>No records at the moment</td>
                            </tr>

                            : [
                                payments.map (payment =>
                                    <tr key={payment.paymentId}>
                                        <td style={{verticalAlign: 'middle'}}>{payment.paymentId}</td>
                                        <td style={{verticalAlign: 'middle'}}>{payment.orderId}</td>
                                        <td style={{verticalAlign: 'middle'}}>{payment.vendorId}</td>
                                        <td style={{verticalAlign: 'middle'}}>{payment.vendorName}</td>
                                        <td style={{verticalAlign: 'middle'}}>{payment.date}</td>
                                        <td style={{verticalAlign: 'middle'}}>{payment.totalAmount}</td>
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

export default PaymentList;
