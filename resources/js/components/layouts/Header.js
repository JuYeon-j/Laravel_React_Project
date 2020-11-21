import React, {useState} from "react";

import {Container, NavDropdown,Nav,Navbar} from 'react-bootstrap'
import { Link } from "react-router-dom";
import {PUBLIC_URL} from "../../constants";

const Header = (props) => {
    // const [publicURL, setPublicURL] = useState("/ju/");
    const logout = () =>{
        localStorage.removeItem('loginData');
        window.location.href = PUBLIC_URL + "login";
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Link to={`${PUBLIC_URL}`}>
                    <Navbar.Brand>
                        ReactProject
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={`${PUBLIC_URL}`}>
                            <Nav.Item className="text-white mr-2">Home</Nav.Item>
                        </Link>
                      
                        <Link to={`${PUBLIC_URL}boards`}>
                            <Nav.Item className="text-white mr-2">게시판</Nav.Item>
                        </Link>
                    
                        <Link to={`${PUBLIC_URL}about`}>
                            <Nav.Item className="text-white mr-2">About</Nav.Item>
                        </Link>
                        <Link to={`${PUBLIC_URL}contact`}>
                            <Nav.Item className="text-white mr-2">Contact</Nav.Item>
                        </Link>
                      
                        {
                            !props.authData.isLoggedIn && (
                                <>
                                    <Link to={`${PUBLIC_URL}login`}>
                                        <Nav.Item className="text-white mr-2">로그인</Nav.Item>
                                    </Link>
                                    <Link to={`${PUBLIC_URL}register`}>
                                        <Nav.Item className="text-white mr-2">회원가입</Nav.Item>
                                    </Link>
                                </>
                            )
                        }
                    </Nav>
                    <Nav className="ml-auto">
                    {
                        props.authData.isLoggedIn && (
                            <>
                                <Nav.Link>Welcome, {props.authData.user.name}</Nav.Link>
                                <Nav.Link onClick={()=>logout()}>
                                    <Nav.Item className="text-white mr-2">Logout</Nav.Item>
                                </Nav.Link>
                            </>
                        )
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
