import React from "react";
import {createBrowserRouter} from "react-router-dom";
import SignUp from "./sign/SignUp";
import SignIn from "./sign/SignIn";
import App from "./App";
import Profile from "./profile/Profile";
import NotFoundPage from "./not-found/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App isLoggedIn={false}/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: "/sign-up",
                element: <SignUp/>,
            },
            {
                path: "/sign-in",
                element: <SignIn/>,
            },
            {
                path:'/main',
                element: <Profile/>
            }
        ]
    },

]);

export default router;
