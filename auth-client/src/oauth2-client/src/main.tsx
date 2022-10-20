import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {BrowserRouter as Router} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

import 'primereact/resources/themes/tailwind-light/theme.css';  //theme
import 'primereact/resources/primereact.min.css';                  //core css
import 'primeicons/primeicons.css';                                //icons
import 'primeflex/primeflex.css';
import {ProgressSpinner} from "primereact/progressspinner";                                //icons

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Suspense fallback={<ProgressSpinner className={"flex align-items-center justify-content-center"}/>}>
                <Router>
                    <App/>
                </Router>
            </Suspense>
        </CookiesProvider>
    </React.StrictMode>
);
