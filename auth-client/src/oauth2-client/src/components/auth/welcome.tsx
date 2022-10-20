import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Button} from 'primereact/button';
import {useCookies} from 'react-cookie';
import {oauth2ClientInfo} from '../../config/app-config';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';

const Welcome = () => {
    const effectRef = useRef(true);
    const [user, setUser] = useState<any | null>({username: '', token: '', tokenExpiry: null});
    const [cookies, setCookie, removeCookie] = useCookies(['qt_auth_token', 'temp', 'gv']);


    useEffect(() => {
        if (effectRef.current) {
            effectRef.current = false;
            console.log('Verifier ' + cookies.gv);
            validateToken();
        }
    }, []);

    const validateToken: any | null = (code: string) => {
        const params = new URLSearchParams()
        params.append('grant_type', 'authorization_code');
        params.append('code', cookies.temp);
        params.append('client_id', oauth2ClientInfo.clientId);
        params.append('client_secret', oauth2ClientInfo.clientSecret);
        params.append('redirect_uri', oauth2ClientInfo.redirect_uri);
        params.append('code_verifier', 'qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI');

        const config = {
            url: `${oauth2ClientInfo.authServerUrl}/oauth2/token`,
            method: 'post',
            //params: params, //Working, Dont use it
            data: params,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        }

        axios(config).then(response => {
            if (response.status === 200) {
                let {access_token, expires_in, id_token} = response.data;
                console.log(response.data);
                setCookie('qt_auth_token', access_token);
                removeCookie('temp');

                setUser({tokenExpiry: expires_in})

                //accessResourceServer(access_token);
            }
        }).catch(error => {
            console.log(error);
        });

        /*(async () => {
            const rawResponse = await fetch(`http://hpitdlp20795:9000/oauth2/token?${params}`, {
                method: 'POST',
                //mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${window.btoa(`${client}:${secret}`)}`,
                },
                credentials: 'include',
                //body: JSON.stringify({a: 1, b: 'Textual content'})
            });
            const content = await rawResponse.json();

            console.log(content);
        })();*/
    };

    const accessResourceServer = (access_token: string) => {
        const config = {
            url: 'http://hpitdlp20795:8484/demo',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            withCredentials: true
        }

        axios(config).then(response => {
            if (response.status === 200) {
                let {access_token, id_token} = response.data;
                console.log(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const userInfo = () => {
        const config = {
            url: `${oauth2ClientInfo.authServerUrl}/userinfo`,
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.qt_auth_token}`,
            },
            withCredentials: true
        }

        axios(config).then(response => {
            if (response.status === 200) {
                let {sub, username} = response.data;
                console.log(response.data);
                setUser({username: username, token: cookies.qt_auth_token});
            }
        }).catch(error => {
            console.log(error);

            if(error?.response.status){
                removeCookie('qt_auth_token');
                //window.location.href = '/login';
            }
        });
    }

    return <div>
        {cookies.qt_auth_token !== '' && (
            <div>
                <div className={'col'}>
                    <h1>Welcome {user.username}</h1>
                    <InputTextarea rows={8} className={'w-12'} value={user.token} autoResize></InputTextarea>
                    <p>Token Expiry: {user.tokenExpiry}</p>
                    <InputText className={'w-12'} value={`Cookie Token: ${cookies.qt_auth_token}`}></InputText>
                </div>

                <div className={'col text-right'}>
                    <Button onClick={(e) => window.location.href = '/home'}>Home</Button>
                    <Button className={'ml-2'} onClick={userInfo}>Get User Profile</Button>
                </div>
            </div>
        )}
    </div>
}

export default Welcome;