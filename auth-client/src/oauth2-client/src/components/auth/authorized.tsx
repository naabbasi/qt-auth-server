import React, {useEffect, useRef, useState} from 'react';
import {useCookies} from 'react-cookie';

const Authorized = () => {
    const authorizedRed = useRef<boolean>(true);
    const [token, setToken] = useState<string | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(['qt_auth_token', 'temp']);

    useEffect(() => {
        if(authorizedRed.current){
            //const paramToken = new URLSearchParams(window.location.search).get('token');
            const paramToken = new URLSearchParams(window.location.search).get('code');
            authorizedRed.current = false;
            console.log("param token: ", paramToken);
            redirect(paramToken);
        }
    }, []);

    const redirect = (paramToken: string | null) => {
        if (paramToken == null) {
            //window.location.href = '/login';
        } else {
            setToken(token => paramToken);
            setCookie('temp', paramToken);
            window.location.href = './welcome';
        }

    };

    return <>
        {token !== "" && (
            <div>
                <h1>Authorized</h1>
                <p>Authorization Code: {token}</p>
            </div>
        )}
    </>
}

export default Authorized;