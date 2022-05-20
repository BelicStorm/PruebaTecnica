import React from "react";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import Router from "./provider/router/router.js";
import ReactDOM from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
);
