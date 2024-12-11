import Auth from "./pages/Auth";
import Main from "./pages/MainPage";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, MAP_ROUTE, PRODUCT_ROUTE } from "./utils/consts";
import Map from "./pages/Map";
import { Component } from "react";
import Product from "./pages/Product";

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
    }
];