import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import {SignUp} from "./components/sign/SignUp";
import {SignIn} from "./components/sign/SignIn";
import App from "./App";
import Profile from "./components/profile/Profile";
import NotFoundPage from "./components/not-found/NotFound";
import {JwtRouteGuard} from "./guards/private-route.guard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <JwtRouteGuard><App/></JwtRouteGuard>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: 'main',
                element: <Profile/>
            }
        ],
    },
    {
        path: "sign-up",
        action: (args) => {
            console.log(args)
        },
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
