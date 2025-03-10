import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getAllProducts, getProductsByRegionId, getAllProductsByName } from "../http/productApi";
import { getAllRegions } from "../http/regionApi";
import NotFound from "../components/NotFound";

const Product = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search") || "";

        setSearchQuery(searchParam);

        getAllRegions().then(setRegions);
        
        if (searchParam) {
            getAllProductsByName(searchParam).then((data) => {
                setProducts(data);
                setIsLoading(false);
            });
        } else {
            getAllProducts().then((data) => {
                setProducts(data);
                setIsLoading(false);
            });
        }
    }, [location.search]);

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
        setSearchQuery("");

        const data = await getAllProducts();
        setProducts(data);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            const data = await getAllProducts();
            setProducts(data);
        } else {
            const data = await getAllProductsByName(searchQuery);
            setProducts(data);
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
                <Col md={6} className="mt-2">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Поиск по названию"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button onClick={handleSearch} variant="outline-secondary">
                            Поиск
                        </Button>
                        {(selectedRegion || searchQuery) && (
                            <Button variant="secondary" onClick={handleClearFilter}>
                                Очистить
                            </Button>
                        )}
                    </InputGroup>
                </Col>
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
            </Row>
            <Row>
                {products.length === 0 ? (
                    <NotFound />
                ) : (
                    products.map((product) => (
                        <Col key={product.productId} md={3} className="mb-4">
                            <ProductCard product={product} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default Product;
