import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { MAIN_ROUTE } from '../utils/consts';
import logo from '../Assets/logo.svg';
import { Tab, Tabs } from 'react-bootstrap';
import '../Assets/css/navbar.css'

const NavBar = observer(() => {
    return (
        <Navbar>
            <Container className="d-flex justify-content-center align-items-center flex-column">
                <NavLink
                    style={{
                        fontSize: "30px", fontWeight: 'bold', color: "#36526C", textDecoration: "none"
                    }}
                    to={MAIN_ROUTE}
                >
                    <div className='d-flex' style={{ maxHeight: '100px' }}>
                        <img src={logo} className='me-2' />
                        Экобиот
                    </div>
                </NavLink>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3 mt-3"
                >
                    <Tab eventKey="home" title="Главная" className='tab-item'></Tab>
                    <Tab eventKey="map" title="Интерактивная карта" className='tab-item'></Tab>
                    <Tab eventKey="productCard" title="Карта продукта" className='tab-item'></Tab>
                </Tabs>
            </Container>
        </Navbar>
    );
});

export default NavBar;
