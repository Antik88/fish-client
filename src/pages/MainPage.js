import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import img from "../Assets/map.png"

const Main = () => {
    return (
        <Container className="mt-2">
            <Row>
                <Col md={5} className="mt-2">
                    <p className="h1 mt-2">
                        Ваш гид по безопасности и качеству локальных продуктов
                    </p>
                </Col>
                <Col md={7}>
                    <Image src={img} width="800px" />
                </Col>
            </Row>
        </Container>
    );
};

export default observer(Main);