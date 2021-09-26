import {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";

class AddProducts extends Component{

    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.addProduct = this.addProduct.bind(this);

        this.state = {
            productId: '',
            productName: '',
            productPrice: '',
            availability: '',
        }
    }

    componentDidMount() {
        this.getProductId();
    }

    addProduct(e){
        e.preventDefault();

        const product = {
            productId: this.state.productId,
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            availability: this.state.availability
        }

        axios.post('http://localhost:8080/product/', product)
            .then(res => {
                console.log(res.data)
                // if (res.status === 201) {
                //
                //     Swal.fire({
                //         icon: 'success',
                //         title: 'Successful',
                //         html: '<p>Conference added successfully!!</p>',
                //         background: '#041c3d',
                //         confirmButtonColor: '#3aa2e7',
                //         iconColor: '#60e004'
                //     })
                //     this.clearData();
                //
                // } else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Error',
                //         html: '<p>There was an error uploading!!</p>',
                //         background: '#041c3d',
                //         showConfirmButton: false,
                //         timer: 1500,
                //         iconColor: '#e00404'
                //     })
                // }
            });
    }

    getProductId() {
        axios.get('http://localhost:8080/product/id')
            .then(response => {
                this.setState({productId: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeProductName(e){
        this.setState({
            productName : e.target.value
        });
        console.log(this.state.productName);
    }
    onChangeProductPrice(e){
        this.setState({
            productPrice : e.target.value
        });
        console.log(this.state.productPrice);
    }
    onChangeAvailability(e){
        this.setState({
            availability : e.target.value
        });
        console.log(this.state.availability);
    }

    render(){
        return(
            <div>
                <Card style={{border: 'none'}}>
                    <Card.Body className={"p-0"}>
                        <Form onSubmit={this.addProduct}>
                            <div className = "form-group">
                                <Row>
                                    <Col md={4}>
                                        <label>Product ID : </label>
                                        <input type = "text"
                                               required
                                               disabled
                                               className = "form-control"
                                               value = {this.state.productId}
                                               placeholder={"Enter conference ID"}
                                        />
                                    </Col>
                                    <Col>
                                        <label>Product Name : </label>
                                        <input type = "text"
                                               required
                                               className = "form-control"
                                               value = {this.state.productName}
                                               onChange = {this.onChangeProductName}
                                               placeholder={"Enter conference name"}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className = "form-group">
                                <label>Product Price : </label>
                                <textarea
                                    required
                                    className = "form-control"
                                    value = {this.state.productPrice}
                                    onChange = {this.onChangeProductPrice}
                                    placeholder={"Enter description"}
                                />
                            </div>

                            <div className = "form-group">
                                <Row>
                                    <Col>
                                        <label>Availability : </label>
                                        <input type = "text"
                                               required
                                               className = "form-control"
                                               value = {this.state.availability}
                                               onChange = {this.onChangeAvailability}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div className={"my-4"}>
                                <Button variant="primary" type={"submit"}>Submit</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default AddProducts;
