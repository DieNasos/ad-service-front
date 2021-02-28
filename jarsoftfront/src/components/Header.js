import React, {Component} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import logo from './home.png'
import Banners from "../sections/Banners"
import Categories from "../sections/Categories";
import Home from "../sections/Home";

class Header extends Component {
    render() {
        return (
            <>
                <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/banners">Banners</Nav.Link>
                                <Nav.Link href="/categories">Categories</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Router>
                    <Switch>
                        <Route exact path="/banners" component={Banners}/>
                        <Route exact path="/categories" component={Categories}/>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </Router>
            </>
        );
    }
}

export default Header;