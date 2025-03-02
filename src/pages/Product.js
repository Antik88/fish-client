import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Form, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getProductsByRegionId } from "../http/productApi";
import { getAllRegions } from "../http/regionApi";

const Product = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");

    useEffect(() => {
        getAllRegions().then((data) => {
            setRegions(data);
        });

        getAllProducts().then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, []);

    const handleRegionChange = async (event) => {
        const regionId = event.target.value;
        setSelectedRegion(regionId);

        if (regionId) {
            const data = await getProductsByRegionId(regionId);
            setProducts(data);
        } else {
            const data = await getAllProducts();
            setProducts(data);
        }
    };

    const handleClearFilter = async () => {
        setSelectedRegion("");
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error("Ошибка загрузки всех продуктов:", error);
        }
    };

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container>
            <Row className="mb-3">
                <Col md={3}>
                    <h1>Карта продукта</h1>
                </Col>
                <Col md={4}></Col>
                <Col md={3}>
                    <Form.Select className="mt-2" value={selectedRegion} onChange={handleRegionChange}>
                        <option value="">Выберите регион</option>
                        {regions.map((region) => (
                            <option key={region.regionId} value={region.regionId}>
                                {region.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col className="mt-2">
                    {selectedRegion && (
                        <Button variant="secondary" onClick={handleClearFilter}>
                            Очистить
                        </Button>
                    )}
                </Col>
            </Row>
            <Row>
                {products.map((product) => (
                    <Col key={product.productId} md={3} className="mb-4">
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Product;
