import React from "react";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';


import { BrowserRouter } from "react-router-dom";
import Router from "./provider/router/router.js";
import ReactDOM from "react-dom/client";

import {SocketProvider} from "./provider/utils/socket.context"
import Layout from "./provider/components/layout";


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <BrowserRouter>
        <SocketProvider>
            <Layout>
                <Router />
            </Layout>
        </SocketProvider>
    </BrowserRouter>
);
