import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProductById } from "../http/productApi";
import img from "../Assets/placeholder.png";
import { getAllRegionById, getAllRegions } from "../http/regionApi";

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [productRegion, setProductRegion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;

        getProductById(productId)
            .then((data) => {
                setProduct(data);
            })
    }, [productId]);

    useEffect(() => {
        if (product && product.originRegionId) {
            getAllRegionById(product.originRegionId)
                .then(setProductRegion)
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [product]);

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!product) {
        return (
            <Container className="text-center mt-4">
                <h2>Продукт не найден</h2>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="mb-4">
                <Col md={3}>
                    <h2>{product.name}</h2>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Image src={img} fluid />
                </Col>
                <Col md={8}>
                    <Table striped bordered hover>
                        <tbody>
                            <tr><td><strong>Регион происхождения</strong></td><td>{productRegion.name}</td></tr>
                            <tr><td><strong>Дата отбора</strong></td><td>{product.selectionDate}</td></tr>
                            <tr><td><strong>Вес продукта (кг)</strong></td><td>{product.weightProduct}</td></tr>
                            <tr><td><strong>Срок годности (дней)</strong></td><td>{product.expirationDate}</td></tr>
                            <tr><td><strong>Длина TL</strong></td><td>{product.lengthTL}</td></tr>
                            <tr><td><strong>Длина SL</strong></td><td>{product.lengthSl}</td></tr>
                            <tr><td><strong>Длина FL</strong></td><td>{product.lengthFl}</td></tr>
                            <tr><td><strong>Коэффициент K</strong></td><td>{product.k}</td></tr>
                            <tr><td><strong>Марганец (Mn, мкг/кг)</strong></td><td>{product.mnUgKg} / {product.mnUgKgSy}</td></tr>
                            <tr><td><strong>Кобальт (Co, мкг/кг)</strong></td><td>{product.coUgKg} / {product.coUgKgSy}</td></tr>
                            <tr><td><strong>Никель (Ni, мкг/кг)</strong></td><td>{product.niUgKg} / {product.niUgKgSy}</td></tr>
                            <tr><td><strong>Медь (Cu, мг/кг)</strong></td><td>{product.cuMgKg} / {product.cuMgKgSy}</td></tr>
                            <tr><td><strong>Цинк (Zn, мг/кг)</strong></td><td>{product.znMgKg} / {product.znMgKgSy}</td></tr>
                            <tr><td><strong>Мышьяк (As, мг/кг)</strong></td><td>{product.asMgKg} / {product.asMgKgSy}</td></tr>
                            <tr><td><strong>Селен (Se, мкг/кг)</strong></td><td>{product.seUgKg} / {product.seUgKgSy}</td></tr>
                            <tr><td><strong>Кадмий (Cd, мкг/кг)</strong></td><td>{product.cdUgKg} / {product.cdUgKgSy}</td></tr>
                            <tr><td><strong>Ртуть (Hg, мкг/кг)</strong></td><td>{product.hgUgKg} / {product.hgUgKgSy}</td></tr>
                            <tr><td><strong>Свинец (Pb, мкг/кг)</strong></td><td>{product.pbUgKg} / {product.pbUgKgSy}</td></tr>
                            <tr><td><strong>Оценка безопасности</strong></td><td>{product.safetyScore}</td></tr>
                            <tr><td><strong>Информация о происхождении</strong></td><td>{product.originInfo}</td></tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
