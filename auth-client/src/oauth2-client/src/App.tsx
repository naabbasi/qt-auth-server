import React from 'react'
import './App.css';
import {Route, Routes} from 'react-router-dom';

const Index = React.lazy(() => import("./components/auth"));
const Login = React.lazy(() => import("./components/auth/login"));
const Welcome = React.lazy(() => import("./components/auth/welcome"));
const Authorized = React.lazy(() => import("./components/auth/authorized"));
const OAuth2Clients = React.lazy(() => import("./components/auth/clients"));

function App() {
    return (
        <div className={'h-screen flex justify-content-center bg-purple-900'}>
            <div className={'w-12 border-round'}>
                <Routes>
                    <Route index element={<Index/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='authorized' element={<Authorized/>}/>
                    <Route path='welcome' element={<Welcome/>}/>

                    <Route path='/home' element={<Index/>}>
                        <Route path='oauth2-clients' element={<OAuth2Clients/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
