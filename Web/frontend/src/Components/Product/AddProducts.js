import {Component} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

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
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        html: '<p>Product added successfully!!</p>',
                        background: '#041c3d',
                        confirmButtonColor: '#3aa2e7',
                        iconColor: '#60e004'
                    })
                    // this.clearData();

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: '<p>There was an error adding product!!</p>',
                        background: '#041c3d',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: '#e00404'
                    })
                }
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
            <div className={"wrapper-div"}>
                <Form onSubmit={this.addProduct}>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}><label>Product ID </label></div>
                    <div className={"detail-group-right-text"}><input type = "text"
                                                                      required
                                                                      disabled
                                                                      className = "form-control"
                                                                      value = {this.state.productId}
                                                                      placeholder={"Enter Product ID"}
                    /></div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}><label>Product Name </label></div>
                    <div className={"detail-group-right-text"}><input type = "text"
                                                                      required
                                                                      className = "form-control"
                                                                      value = {this.state.productName}
                                                                      onChange = {this.onChangeProductName}
                                                                      placeholder={"Enter Product Name"}
                    />
                    </div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}><label>Product Price </label></div>
                    <div className={"detail-group-right-text"}><input type = "text"
                                                                      required
                                                                      className = "form-control"
                                                                      value = {this.state.productPrice}
                                                                      onChange = {this.onChangeProductPrice}
                                                                      placeholder={"Enter Product Price"}
                    /></div>
                </div>

                <div className={"detail-box-section"}>
                    <div className={"detail-group-left-title"}><label>Product Availability </label></div>
                    <div className={"detail-group-right-text"}> <input type = "text"
                                                                       required
                                                                       className = "form-control"
                                                                       value = {this.state.availability}
                                                                       onChange = {this.onChangeAvailability}
                                                                       placeholder={"Enter Product Availability"}
                    /></div>
                </div>

                <div >
                    <button className={"add-product-btn"} type={"submit"} >Add Product</button>
                </div>
                </Form>
            </div>
        )
    }
}

export default AddProducts;
