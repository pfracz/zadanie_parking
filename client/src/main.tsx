import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./index.scss";

import Layout from "./pages/Layout";
import PaymentPage from "./pages/PaymentPage";
import ManagementPage from "./pages/ManagementPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                loader: async () => redirect("/payment"),
            },
            { path: "/payment", element: <PaymentPage /> },
            { path: "/management", element: <ManagementPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>
);
