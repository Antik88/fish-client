import React from "react";
import { Container, Image } from "react-bootstrap";
import img from "../Assets/not_found.jpg"

export default function NotFound () {
    return (
        <Container>
            <p>Ничего не найдено</p>
            <Image src={img}/>
        </Container>
    );
};
