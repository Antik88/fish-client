import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../http/productApi";
import ProductShortCard from "../components/ProductShortCard";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const ComparePage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [compareProducts, setCompareProducts] = useState([]);
    const navigate = useNavigate()
    const currentProduct = compareProducts.length > 0 ? compareProducts[0] : null;
    const otherProducts = compareProducts.slice(1);


    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("compareProducts") || "[]");
        if (storedProducts.length > 0) {
            setCompareProducts(storedProducts);
        }
    }, []);


    const handleSelectProduct = (product) => {
        if (!compareProducts.some((p) => p.productId === product.productId)) {
            const updatedList = [...compareProducts, product];
            localStorage.setItem("compareProducts", JSON.stringify(updatedList));
            setCompareProducts(updatedList);
        }
    };

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
            <Row>
                <Col>
                    <h2>Сравнение продуктов</h2>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => {
                        localStorage.removeItem("compareProducts");
                        setCompareProducts([]);
                        navigate(PRODUCT_ROUTE)
                    }}>
                        Очистить сравнение
                    </Button>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Параметр</th>
                            <th>{currentProduct.name}</th>
                            {otherProducts.map(p => <th key={p.productId}>{p.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Вес продукта</td>
                            <td>{currentProduct.weightProduct}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.weightProduct}</td>)}
                        </tr>
                        <tr>
                            <td>Срок годности</td>
                            <td>{currentProduct.expirationDate}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.expirationDate}</td>)}
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <Row className="d-flex flex-wrap gap-2">
                {products.map((product) => {
                    const isSelected = compareProducts.some((p) => p.productId === product.productId);
                    return (
                        <div
                            key={product.productId}
                            onClick={() => !isSelected && handleSelectProduct(product)}
                            style={{
                                opacity: isSelected ? 0.5 : 1,
                                pointerEvents: isSelected ? "none" : "auto",
                                cursor: isSelected ? "not-allowed" : "pointer",
                                width: "300px"
                            }}
                        >
                            <ProductShortCard product={product} />
                        </div>
                    );
                })}
            </Row>
        </Container>
    );
};

export default ComparePage;
