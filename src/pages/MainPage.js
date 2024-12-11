import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const Main = () => {
    return (
        <Container className="mt-2">
            <Row>
                <Col xs={2} md={3} className="mt-2">
                </Col>
                <Col xs={9} md={9}>
                </Col>
            </Row>
        </Container>
    );
};

export default observer(Main);