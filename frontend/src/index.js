import React from "react";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';


import { BrowserRouter } from "react-router-dom";
import Router from "./provider/router/router.js";
import ReactDOM from "react-dom/client";

import Layout from "./provider/components/layout";


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <BrowserRouter>
        <Layout>
            <Router />
        </Layout>
    </BrowserRouter>
);
