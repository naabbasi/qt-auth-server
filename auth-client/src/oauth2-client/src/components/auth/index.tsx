import {Link, Outlet, useNavigate} from 'react-router-dom';
import React, {useEffect, useRef, useState} from 'react';
import {Slider, SliderValueType} from 'primereact/slider';
import './style/index.css';
import {useCookies} from "react-cookie";

const Index = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['qt_auth_token', 'temp', 'gv']);
    const [sliderValue, setSliderValue] = useState<SliderValueType>();
    const [visible, setVisible] = useState(true);
    const scaleRef = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Index component");

        if (scaleRef.current) {
            setSliderValue(12);
            scaleRef.current = false;

            if (cookies.qt_auth_token === undefined) {
                navigate("./login", {replace: true})
            }
        }
    }, []);

    const changeComponentScale = (value: SliderValueType) => {
        setSliderValue(value);
        console.log(sliderValue)
        if (sliderValue !== undefined) {
            let html: any = document.getElementsByName('authApp');
            console.log(html[0]['style']);
            let element: HTMLElement = html[0];
            element.setAttribute('style', `font-size: ${sliderValue}px;`);
        }
    }

    return <div>
        <div className={'mt-2'}>
            <Slider value={sliderValue} min={10} max={20} onChange={(e) => changeComponentScale(e.value)}/>
        </div>
        <div className={"linkSpacer"}>
            <h1 className={"text-center"}>QTerminals Central Authentication</h1>
            {
                cookies.qt_auth_token !== undefined &&
                <div className={"card"}>
                    <div className={"card-container overflow-hidden"}>
                        <div className={"h-screen flex bg-purple-800"}>
                            <div className="flex-none flex w-3 bg-purple-900 justify-content-center m-2 border-round linkSpacer">
                                <div className="card w-full">
                                    <div className="flex flex-column card-container">
                                        <div className="flex align-items-center justify-content-center h-4rem font-bold text-white border-round m-2">
                                            <Link to={"./welcome"}>Welcome</Link>
                                        </div>
                                        <div className="flex align-items-center justify-content-center h-4rem font-bold text-white border-round m-2">
                                            <Link to={"./oauth2-clients"}>OAuth2 Clients</Link>
                                        </div>
                                        <div className="flex align-items-center justify-content-center h-4rem font-bold text-white border-round m-2">3
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1 flex bg-purple-900  align-items-center justify-content-center text-white m-2 px-5 py-3 border-round">
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                cookies.qt_auth_token === undefined &&
                <div>
                    <Outlet></Outlet>
                </div>
            }
        </div>
    </div>
}

export default Index;