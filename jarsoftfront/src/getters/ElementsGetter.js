import {Button, Col, Container, Form, Nav, Row} from "react-bootstrap";
import React from "react";
import Tab from "react-bootstrap/Tab";

export function getNavItem(name) {
    return (
        <Nav.Item>
            <Nav.Link eventKey={name}>
                {name}
            </Nav.Link>
        </Nav.Item>
    );
}

export function getButton(left, top, width, text, onClick) {
    return (
        <Button style={{left: left, top: top, position: 'absolute', width: width}}
                onClick={onClick}>{text}</Button>
    );
}

export function getContainer(left, top, elements, contents) {
    return (
        <Container>
            <Tab.Container id={"left_list"} defaultActiveKeys={"first"}>
                <Row>
                    <Col sm = {1} style={{left: left, top: top, position: 'absolute'}}>
                        <Nav variant={"pills"} className={"flex_column mt-2"}>
                            {elements}
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        {contents}
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export function getSelectForm(left, top, options, width, onChange) {
    return (
        <Form style={{left: left, top: top, position: 'absolute'}}>
            <select onChange={onChange}
                    style={{width: width}}>
                {options}
            </select>
        </Form>
    );
}

export function getForm(left, top, placeholder, width, onChange) {
    return (
        <Form style={{left: left, top: top, position: 'absolute'}}>
            <input type="text"
                   id="filter"
                   placeholder={placeholder}
                   style = {{width: width}}
                   onChange={onChange}
            />
        </Form>
    );
}

export function getP(left, top, color, content) {
    return (
        <p style={{left: left, top: top, position: 'absolute', color: color}}>
            {content}
        </p>
    );
}

export function getH3(left, top, color, content) {
    return (
        <h3 style={{left: left, top: top, position: 'absolute', color: color}}>
            {content}
        </h3>
    );
}