import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home.jsx";
import Portfolio from "./Portfolio.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import SharedStateProvider from "./context/Context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    exact: true,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SharedStateProvider>
      <RouterProvider router={router} />
    </SharedStateProvider>
  </React.StrictMode>
);
