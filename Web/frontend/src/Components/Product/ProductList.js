import {Component} from "react";
import axios from "axios";
import {Badge, Button, ButtonGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

class ProductList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.refreshTable();
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

    render() {
        const {products} = this.state;
        return (
            <div className={"main-div"}>
                <Table striped responsive hover bordered>
                    <thead>
                    <tr>
                        <th className={"text-center"}>Product ID</th>
                        <th className={"text-center"}>Product Name</th>
                        <th className={"text-center"}>Item Price</th>
                        <th className={"text-center"}>Availability</th>
                        <th className={"text-center"}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan={"5"}>No records at the moment</td>
                            </tr>

                            : [
                                products.map (product =>
                                    <tr key={products.orderId}>
                                        <td style={{verticalAlign: 'middle'}}>{product.productId}</td>
                                        <td style={{verticalAlign: 'middle'}}>{product.productName}</td>
                                        <td style={{verticalAlign: 'middle'}}>{product.productPrice}</td>
                                        <td style={{verticalAlign: 'middle'}}>{product.availability}</td>
                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                            <ButtonGroup>
                                                <Button variant={"danger"} type={"submit"}
                                                        onClick={() => this.rejectHandler(product.productId)}>
                                                    <FontAwesomeIcon icon={faEdit}/> Edit
                                                </Button>
                                            </ButtonGroup>
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

export default ProductList;
