import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import {SignUp} from "./components/sign/SignUp";
import {SignIn} from "./components/sign/SignIn";
import App from "./App";
import NotFoundPage from "./components/not-found/NotFound";
import {JwtRouteGuard} from "./guards/private-route.guard";
import {Main} from "./components/profile/Main";

const router = createBrowserRouter([
    {
        path: '/',
        element: <JwtRouteGuard><App/></JwtRouteGuard>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: 'main',
                element: <Main/>
            }
        ],
    },
    {
        path: "sign-up",
        element: <SignUp/>,
    },
    {
        path: "sign-in",
        element: <SignIn/>,
    },
    {
        path: '*',
        element: <Navigate to="sign-in"/>
    },
]);

export default router;
