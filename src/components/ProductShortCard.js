import React from "react";
import { Card } from "react-bootstrap";
import img from "../Assets/placeholder.png"
import { useNavigate } from "react-router-dom";

export default function ProductShortCard  ({ product }) {
    const navigate = useNavigate()

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.originInfo}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
