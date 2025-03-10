import Auth from "./pages/Auth";
import Main from "./pages/MainPage";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, MAP_ROUTE, PRODUCT_ROUTE, COMPARE } from "./utils/consts";
import Map from "./pages/Map";
import Product from "./pages/Product";
import ProductPage from "./pages/ProductPage";
import ComparePage from "./pages/ComparePage";

export const authRoutes = [
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAP_ROUTE,
        Component: Map
    },
    {
        path: PRODUCT_ROUTE,
        Component: Product
    },
    {
        path: PRODUCT_ROUTE + "/:productId",
        Component: ProductPage 
    },
    {
        path: COMPARE,
        Component: ComparePage 
    }
];