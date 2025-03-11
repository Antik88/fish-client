import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getAllRegions } from "../http/regionApi";
import { getSalesPointByRegionId } from "../http/salesPointApi";
import { getEnvQualityByRegionId } from "../http/envQualityApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const Map = () => {
    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [salesPoints, setSalesPoints] = useState([]);
    const [envQuality, setEnvQuality] = useState(null);

    useEffect(() => {
        getAllRegions()
            .then((data) => {
                setRegions(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке регионов:", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            setIsLoading(true);

            Promise.all([
                getSalesPointByRegionId(selectedRegion),
                getEnvQualityByRegionId(selectedRegion),
            ])
                .then(([salesData, envData]) => {
                    setSalesPoints(salesData);
                    setEnvQuality(envData);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке данных:", error);
                    setSalesPoints([]);
                    setEnvQuality(null);
                    setIsLoading(false);
                });
        } else {
            setSalesPoints([]);
            setEnvQuality(null);
        }
    }, [selectedRegion]);

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const pollutionLevelData = {
        labels: ["Low", "Medium", "High"],
        datasets: [
            {
                data: [
                    envQuality?.pollutionLevel === "Low" ? 1 : 0,
                    envQuality?.pollutionLevel === "Medium" ? 1 : 0,
                    envQuality?.pollutionLevel === "High" ? 1 : 0,
                ],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
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
            <Row>
                <h1>Интерактивная карта</h1>
            </Row>
            <Row className="mt-2">
                <Col md={4}>
                    <Form.Select className="mt-2" value={selectedRegion} onChange={handleRegionChange}>
                        <option value="">Выберите регион</option>
                        {regions.map((region) => (
                            <option key={region.regionId} value={region.regionId}>
                                {region.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={8}>
                    {selectedRegion && salesPoints.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Адрес</th>
                                    <th>Часы работы</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesPoints.map((point) => (
                                    <tr key={point.salesPointId}>
                                        <td>{point.name}</td>
                                        <td>{point.address}</td>
                                        <td>{point.workingHours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : selectedRegion ? (
                        <p>Точки продаж в выбранном регионе отсутствуют.</p>
                    ) : (
                        <p>Выберите регион, чтобы увидеть точки продаж.</p>
                    )}
                    {selectedRegion && envQuality ? (
                        <div className="d-flex">
                            <div className="mt-4">
                                <h3>Качество среды окружения</h3>
                                <p><strong>Загрязняющие вещества:</strong> {envQuality.pollutants}</p>
                                <p><strong>Дата оценки:</strong> {new Date(envQuality.assessmentDate).toLocaleDateString()}</p>
                            </div>
                            <div style={{ width: "200px", margin: "0 auto" }} className="mt-2">
                                <p>Уровень загрязнения</p>
                                <Doughnut data={pollutionLevelData} options={options} />
                            </div>
                        </div>
                    ) : selectedRegion ? (
                        <p>Данные о качестве среды окружения отсутствуют.</p>
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
};

export default Map;