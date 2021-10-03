import React, {Component} from "react";
import Swal from "sweetalert2";
import ProductDataService from "./ProductDataService";
import {Accordion,Container,Button, Card, Col, Form, Image, Row} from "react-bootstrap";
import axios from "axios";
import {config} from "@fortawesome/fontawesome-svg-core";
// import moment from "moment";
// import pdf from "../../Assets/pdf.svg";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faDownload} from "@fortawesome/free-solid-svg-icons";
// import word from "../../Assets/word.svg";

class UpdateProduct extends Component{

    constructor(props){
        super(props);

        this.state = {
            productId: props.classId,
            productName:'',
            productPrice:'',
            availability:''



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
        axios.get(`http://localhost:8080/product/getbyid/`+this.state.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    productId:response.data.productId,
                    productName:response.data.productName,
                    productPrice:response.data.productPrice,
                    availability:response.data.availability

                })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleUpdate = (e) => {
        e.preventDefault();

        const productId = this.state.productId;
        const productName = this.state.productName;
        const productPrice = this.state.productPrice;
        const availability = this.state.availability


            // update all including files
            console.log("UPDATING FILE...");

            const formData = new FormData();
            formData.append('productId', productId)
            formData.append('productName', productName)
            formData.append('productPrice', productPrice)
            formData.append('availability', availability)

            ProductDataService.updateProduct(formData, config)
                .then(res => {
                    console.log(res);

                    if (res.status === 200) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Classroom has been updated!!',
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
                            text: 'Error in updating!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })

            this.refreshTable();

        }





    render() {

        const {productId, productName, productPrice, availability} = this.state

        return(


            <Card style={{border:'none'}}>
                <Card.Body>
                    <Form onSubmit={this.handleUpdate}>

                        <Form.Group >
                            <Form.Label >Product ID</Form.Label>
                            <Form.Control  as={"input"} name={"productId"} placeholder={"Enter a product id"}  required
                                           value={productId} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control as={"input"} name={"productName"} placeholder={"Enter a description"} required
                                          value={productName} onChange={this.handleChange}/>
                        </Form.Group>



                        <Form.Group >
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control as={"input"} name={"productPrice"} placeholder={"Enter a description"} required
                                          value={productPrice} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Availability</Form.Label>
                            <Form.Control as={"input"} name={"availability"} placeholder={"Enter a description"} required
                                          value={availability} onChange={this.handleChange}/>
                        </Form.Group>



                        <div className={"text-end"}>

                            <button type={"submit"} className={"submit-form-btn"}>Update Product</button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>





        )
    }


}
export default UpdateProduct;
