import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignUp } from "./components/sign/SignUp";
import { SignIn } from "./components/sign/SignIn";
import App from "./App";
import NotFoundPage from "./components/not-found/NotFound";
import { JwtRouteGuard } from "./guards/private-route.guard";
import { Main } from "./components/main/Main";
import { NewPortfolio } from "./components/main/portfolio/NewPortfolio";
import { AllPortfolios } from "./components/main/portfolio/AllPortfolios";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <JwtRouteGuard>
        <App />
      </JwtRouteGuard>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "main",
        element: <Main />,
        errorElement: <NotFoundPage />,
        children: [
          {
            path: "list",
            index: true,
            element: <AllPortfolios />,
          },

          {
            path: "new",
            index: true,
            element: <NewPortfolio />,
          },

          {
            path: "*",
            element: <Navigate to={"list"} />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to={"main/all"} />,
      },
    ],
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <Navigate to="sign-in" />,
  },
]);

export default router;
