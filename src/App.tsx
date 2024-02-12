import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./Components/Fixed/ResponsiveAppBar";
import Customers from "./Components/Customers/Customers";
import CustomerPage from "./Components/Pages/CustomerPage";
import LayoutComponent from "./Components/Fixed/LayoutComponent";
import Grid from "@mui/material/Grid";
import { ContactPage } from "@mui/icons-material";
import InteractionPage from "./Components/Pages/InteractionPage";
import ContactsPage from "./Components/Pages/ContactsPage";
import RoutingPage from "./Components/PageRoutes/RoutingPage";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutingPage />
      </BrowserRouter>
    </>
  );
}

export default App;
