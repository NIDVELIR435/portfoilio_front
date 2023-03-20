import React from "react";
import {createBrowserRouter} from "react-router-dom";
import SignUp from "./sign/SignUp";
import SignIn from "./sign/SignIn";
import App from "./App";
import Profile from "./profile/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App isLoggedIn={true}/>,
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
