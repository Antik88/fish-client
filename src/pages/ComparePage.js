import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getAllProductsByName } from "../http/productApi";
import { getAllRegionById } from "../http/regionApi";
import { PRODUCT_ROUTE } from "../utils/consts";
import ProductShortCard from "../components/ProductShortCard";

export default function ComparePage() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [compareProducts, setCompareProducts] = useState([]);
    const [regions, setRegions] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("compareProducts") || []);
        if (storedProducts.length > 0) {
            setCompareProducts(storedProducts);
            loadRegionsForProducts(storedProducts);
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    const handleClearFilter = async () => {
        setSearchQuery("");

        const data = await getAllProducts();
        setProducts(data);
    };

    const handleSearch = async () => {
        const data = await getAllProductsByName(searchQuery);
        setProducts(data);
    };

    const loadRegionsForProducts = async (products) => {
        const regionsData = {};
        for (const product of products) {
            if (product.originRegionId) {
                const region = await getAllRegionById(product.originRegionId);
                regionsData[product.originRegionId] = region;
            }
        }
        setRegions(regionsData);
        setIsLoading(false);
    };

    const handleClearCompare = () => {
        localStorage.removeItem("compareProducts");
        setCompareProducts([]);
        navigate(PRODUCT_ROUTE);
    };

    const handleSelectProduct = (product) => {
        if (!compareProducts.some((p) => p.productId === product.productId)) {
            const updatedList = [...compareProducts, product];
            localStorage.setItem("compareProducts", JSON.stringify(updatedList));
            setCompareProducts(updatedList);
            loadRegionsForProducts(updatedList);
        }
    };

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (compareProducts.length === 0) {
        return (
            <Container>
                <h2>Нет данных для сравнения</h2>
            </Container>
        );
    }

    const currentProduct = compareProducts[0];
    const otherProducts = compareProducts.slice(1);

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Сравнение продуктов</h2>
                </Col>
                <Col>
                    <Button variant="danger" onClick={handleClearCompare}>
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
                            {otherProducts.map((p) => (
                                <th key={p.productId}>{p.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Регион происхождения</td>
                            <td>{regions[currentProduct.originRegionId]?.name || "Нет данных"}</td>
                            {otherProducts.map((p) => (
                                <td key={p.productId}>{regions[p.originRegionId]?.name || "Нет данных"}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>Дата отбора</td>
                            <td>{currentProduct.selectionDate}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.selectionDate}</td>)}
                        </tr>
                        <tr>
                            <td>Вес продукта (кг)</td>
                            <td>{currentProduct.weightProduct}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.weightProduct}</td>)}
                        </tr>
                        <tr>
                            <td>Срок годности (дней)</td>
                            <td>{currentProduct.expirationDate}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.expirationDate}</td>)}
                        </tr>
                        <tr>
                            <td>Длина TL</td>
                            <td>{currentProduct.lengthTL}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.lengthTL}</td>)}
                        </tr>
                        <tr>
                            <td>Длина SL</td>
                            <td>{currentProduct.lengthSl}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.lengthSl}</td>)}
                        </tr>
                        <tr>
                            <td>Длина FL</td>
                            <td>{currentProduct.lengthFl}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.lengthFl}</td>)}
                        </tr>
                        <tr>
                            <td>Коэффициент K</td>
                            <td>{currentProduct.k}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.k}</td>)}
                        </tr>
                        {[
                            { key: 'Mn', title: 'Марганец (Mn, мкг/кг)', prop: 'mnUgKg' },
                            { key: 'Co', title: 'Кобальт (Co, мкг/кг)', prop: 'coUgKg' },
                            { key: 'Ni', title: 'Никель (Ni, мкг/кг)', prop: 'niUgKg' },
                            { key: 'Cu', title: 'Медь (Cu, мг/кг)', prop: 'cuMgKg' },
                            { key: 'Zn', title: 'Цинк (Zn, мг/кг)', prop: 'znMgKg' },
                            { key: 'As', title: 'Мышьяк (As, мг/кг)', prop: 'asMgKg' },
                            { key: 'Se', title: 'Селен (Se, мкг/кг)', prop: 'seUgKg' },
                            { key: 'Cd', title: 'Кадмий (Cd, мкг/кг)', prop: 'cdUgKg' },
                            { key: 'Hg', title: 'Ртуть (Hg, мкг/кг)', prop: 'hgUgKg' },
                            { key: 'Pb', title: 'Свинец (Pb, мкг/кг)', prop: 'pbUgKg' },
                        ].map(({ key, title, prop }) => (
                            <tr key={key}>
                                <td>{title}</td>
                                <td>{currentProduct[prop]} / {currentProduct[`${prop}Sy`]}</td>
                                {otherProducts.map(p => <td key={p.productId}>{p[prop]} / {p[`${prop}Sy`]}</td>)}
                            </tr>
                        ))}
                        <tr>
                            <td>Оценка безопасности</td>
                            <td>{currentProduct.safetyScore}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.safetyScore}</td>)}
                        </tr>
                        <tr>
                            <td>Информация о происхождении</td>
                            <td>{currentProduct.originInfo}</td>
                            {otherProducts.map(p => <td key={p.productId}>{p.originInfo}</td>)}
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <Row className="mb-3">
                <Col md={3}>
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
                        {(searchQuery) && (
                            <Button variant="secondary" onClick={handleClearFilter}>
                                Очистить
                            </Button>
                        )}
                    </InputGroup>
                </Col>
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
