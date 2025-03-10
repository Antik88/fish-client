import React, { useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import img from "../Assets/map.png"
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const Main = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <Container className="mt-2">
            <Row>
                <Col md={5} className="mt-2">
                    <p className="h1 mt-2">
                        Ваш гид по безопасности и качеству локальных продуктов
                    </p>
                    <InputGroup className="mt-3">
                        <Form.Control
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text" placeholder="Название продукта" />
                        <Button onClick={() => navigate(`${PRODUCT_ROUTE}?search=${searchQuery}`)} variant="outline-secondary">
                            Поиск
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={7}>
                    <Image src={img} width="800px" />
                </Col>
            </Row>
        </Container>
    );
};

export default observer(Main);