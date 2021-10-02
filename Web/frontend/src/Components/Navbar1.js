import React, {Component} from "react";
import {CloseButton, Col, Container, Form, Image, Modal, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import "../Stylesheets/Home.css";
import logo from "../Assets/elms-logo-black.svg"
import studyImg from "../Assets/elearning.png";
import mailBoxImg from "../Assets/Mailbox-bro.png";
import {Link, withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import AuthenticationService from "./Login/AuthenticationService";
//import emailjs from "emailjs-com";



class Navbar1 extends  Component{

    constructor(props) {
        super(props);

        this.state = {
            id:'',
            show: false,
            display:false,
            products: [],
            userRole: AuthenticationService.loggedUserRole(),
            isUserLoggedIn: AuthenticationService.isUserLoggedIn(),
            loggedInUsername: AuthenticationService.loggedUserName(),
        }
    }

    logout = () => {
        AuthenticationService.logout();
        this.props.history.push("/")
    }


    render() {
        const {
            isUserLoggedIn,
            loggedInUsername,
            loadContent
        } = this.state
        return (


                <Navbar expand="lg" className={"nav-main"}>
                    <Container>
                        <Navbar.Brand href="#home" className={"topic"}>Procurement System</Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        {isUserLoggedIn &&
                            <Navbar.Collapse id="basic-navbar-nav">
                        {/*{this.state.isUserLoggedIn === "true" &&*/}
                        {/*<Nav className="me-auto">*/}
                        {/*    <Nav.Link href="/">Home</Nav.Link>*/}
                        {/*</Nav>*/}
                        {/*}*/}
                        {/*{this.state.userRole === "Accounting Staff" &&*/}
                        {/*    <Nav className="me-auto">*/}
                        {/*    <Nav.Link href="/products" className={"topic-link"}>Products</Nav.Link>*/}
                        {/*    <Nav.Link href="/orders" className={"topic-link"}>Orders</Nav.Link>*/}
                        {/*    <Nav.Link href="/paymentList" className={"topic-link"}>Payment</Nav.Link>*/}

                        {/*    </Nav>*/}
                        {/*}*/}
                        {/*{this.state.userRole === "Management Staff" &&*/}
                        {/*    <Nav className="me-auto">*/}
                        {/*    <Nav.Link href="/products" className={"topic-link"}>Products</Nav.Link>*/}
                        {/*    <Nav.Link href="/orders" className={"topic-link"}>Orders</Nav.Link>*/}
                        {/*    <Nav.Link href="/paymentList" className={"topic-link"}>Payment</Nav.Link>*/}

                        {/*    </Nav>*/}
                        {/*}*/}
                        {/*{this.state.userRole === "Site Manager" &&*/}
                        {/*<Nav className="me-auto">*/}
                        {/*    <Nav.Link href="/products" className={"topic-link"}>Products</Nav.Link>*/}
                        {/*    <Nav.Link href="/orders" className={"topic-link"}>Orders</Nav.Link>*/}
                        {/*    <Nav.Link href="/paymentList" className={"topic-link"}>Payment</Nav.Link>*/}

                        {/*</Nav>*/}
                        {/*}*/}

                            <Nav className="me-auto">
                            <Nav.Link href="/products" className={"topic-link"}>Products</Nav.Link>
                            <Nav.Link href="/orders" className={"topic-link"}>Orders</Nav.Link>
                            <Nav.Link href="/paymentList" className={"topic-link"}>Payment</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className = {"dp-name"}>Hii {this.state.loggedInUsername}</Nav.Link>
                            <Nav.Link ><button className={"btn-logout"} onClick={this.logout}>Log Out</button></Nav.Link>
                            {/*    <Nav.Link href="#pricing">Hii {this.state.loggedInUsername}</Nav.Link>*/}
                            {/*    <NavDropdown id="collasible-nav-dropdown">*/}
                            {/*        <NavDropdown.Item onClick={this.logout}>Log Out</NavDropdown.Item>*/}
                            {/*    </NavDropdown>*/}



                            </Nav>


                            </Navbar.Collapse>
                        }
                    </Container>
                </Navbar>



        )




    }
}
export default withRouter(Navbar1);