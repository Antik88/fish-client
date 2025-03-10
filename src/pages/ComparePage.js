import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../http/productApi";

const ComparePage = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentProduct, compareProducts } = location.state || { currentProduct: null, compareProducts: [] };

    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, []);

    if (!currentProduct) {
        return <Container><h2>Нет данных для сравнения</h2></Container>;
    }

    return (
        <Container>
            <h2>Сравнение продуктов</h2>
            <Row>
                <Col>
                </Col>
                <Col>
                    {products.map((product) => (
                        <Col key={product.productId} md={3} className="mb-4">
                            <Button>
                                <ProductCard product={product} />
                            </Button>
                        </Col>
                    ))}
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Параметр</th>
                        <th>{currentProduct.name}</th>
                        {compareProducts.map(p => <th key={p.productId}>{p.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Вес продукта</td><td>{currentProduct.weightProduct}</td>{compareProducts.map(p => <td key={p.productId}>{p.weightProduct}</td>)}</tr>
                    <tr><td>Срок годности</td><td>{currentProduct.expirationDate}</td>{compareProducts.map(p => <td key={p.productId}>{p.expirationDate}</td>)}</tr>
                    {/* Добавить другие параметры */}
                </tbody>
            </Table>
        </Container>
    );
};

export default ComparePage;
