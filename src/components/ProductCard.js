import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import img from "../Assets/placeholder.png"
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductCard = ({ product }) => {
    const navigate = useNavigate()

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.originInfo}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(PRODUCT_ROUTE + `/${product.productId}`)}>Подробнее</Button>
            </Card.Body>
        </Card>
    );
};

export default observer(ProductCard);