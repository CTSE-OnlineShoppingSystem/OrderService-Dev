import React, {Component} from "react";
import axios from "axios";
import {
    Badge,
    Modal,
    Button,
    ButtonGroup,
    Card,
    Table,
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Row, Col
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAd, faCartPlus, faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import './Product.css'

import ProductUpdate from './UpdateProduct';
import AddProduct from './AddProducts';
import ItemQuantity from './ItemQuantity';
import ViewCart from './ViewCart';
import Navbar1 from '../Navbar1'
import AuthenticationService from "../Login/AuthenticationService";

class ProductList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id:'',
            productId:'',
            orderId:'',
            show: false,
            display:false,
            view:false,
            pop:false,
            products: [],
            userRole: AuthenticationService.loggedUserRole(),
            vendorId: AuthenticationService.loggedUserId()
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

    gotoUpdateProduct(id) {
        this.setState({
            id: id,
            show: true
        })
    }

    addProduct(){
        this.setState(
            {
                display:true
            }
        )
    }

    gotoAddToCart(orderId) {
        this.setState(
            {
                productId: orderId,
                view:true
            }
        )
    }

    viewCart(vendorId) {
        this.setState(
            {
                vendorId: vendorId,
                pop:true
            }
        )
    }

    //Modal box
    showModalBox = () => {
        this.setState({show: true})
    }
    //Modal box
    closeModalBox = () => {
        this.setState({show: false})
        this.refreshTable();
    }
    showDetailsBox = () => {
        this.setState({display: true})
    }
    //Modal box
    closeDetailsBox = () => {
        this.setState({display: false})
        this.refreshTable();
    }
    showQuantityBox = () => {
        this.setState({view: true})
    }
    //Modal box
    closeQuantityBox = () => {
        this.setState({view: false})
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
    logout = () => {
        AuthenticationService.logout();
        this.props.history.push("/")
    }

    render() {
        const {products} = this.state;
        return (
            <div className={"background"}>
                <div>


                <Navbar1/>
                </div>

                <Card className={"crd-product-tb"}>
                    <Card.Body>
                        <Card.Title className={"crd-product-title"}>
                        <Row>
                            <Col  md={4} >Products List</Col>

                             <Col md={{ span: 4, offset: 4 }}>
                                 {this.state.userRole === "Accounting Staff" &&
                                 <button className={"add-product"} type={"submit"} onClick={() => this.addProduct()} >
                                     <FontAwesomeIcon icon={faPlus}/> Add Product</button>
                                 }
                                 {this.state.userRole === "Site Manager" &&
                                 <button className={"cart-icn"}  type={"submit"} onClick={() => this.viewCart(this.state.vendorId)}>
                                     <FontAwesomeIcon icon={faCartPlus}/></button>
                                 }
                                 </Col>

                            </Row>
                        </Card.Title>
                        <div className={"main-div"}>
                            <Table striped responsive hover bordered className={"product-table"}>
                                <thead>
                                <tr>
                                    <th className={"text-center"}>Product ID</th>
                                    <th className={"text-center"}>Product Name</th>
                                    <th className={"text-center"}>Item Price</th>
                                    <th className={"text-center"}>Availability</th>
                                    {this.state.userRole === "Site Manager" &&
                                    <th className={"text-center"}>Purchase</th>
                                    }
                                    {this.state.userRole === "Accounting Staff" &&
                                    <th className={"text-center"}>Action</th>
                                    }
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
                                                    <td style={{verticalAlign: 'middle'}}>Rs.{product.productPrice}</td>
                                                    <td style={{verticalAlign: 'middle'}}>{product.availability}</td>
                                                    {this.state.userRole === "Accounting Staff" &&
                                                    <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                        <ButtonGroup>
                                                            <Button variant={"warning"} type={"submit"}
                                                                    key={product.id}
                                                                    onClick={() => this.gotoUpdateProduct(product.orderId)}>
                                                                <FontAwesomeIcon icon={faEdit}/>
                                                            </Button>
                                                        </ButtonGroup>
                                                    </td>
                                                    }
                                                    {this.state.userRole === "Site Manager" &&
                                                    <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                        <ButtonGroup>
                                                            <Button variant={"outline-primary"} type={"submit"}
                                                                    key={product.productId}
                                                                    onClick={() => this.gotoAddToCart(product.productId)}><FontAwesomeIcon icon={faPlus}/> Add to cart
                                                            </Button>
                                                        </ButtonGroup>
                                                    </td>
                                                    }
                                                </tr>
                                            )
                                        ]
                                }
                                </tbody>
                            </Table>

                        </div>
                    </Card.Body>
                </Card>

                {/*--------------------------Model Box to Edit Conference--------------------------*/}

                <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Update</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ProductUpdate classId={this.state.id} close={this.closeModalBox} />
                    </Modal.Body>
                </Modal>

                {/*--------------------------------------------------------------------------------*/}

                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.display} onHide={this.closeDetailsBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title >Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <AddProduct classId={this.state.id} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.view} onHide={this.closeQuantityBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add To Cart</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ItemQuantity classId={this.state.productId} close={this.closeQuantityBox} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.pop} onHide={this.closeCart} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Cart</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ViewCart classId={this.state.vendorId} close={this.closeCart} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

            </div>

        )
    }



}

export default ProductList;
