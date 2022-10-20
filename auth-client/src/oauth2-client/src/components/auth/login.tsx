import {Button} from 'primereact/button';
import {useEffect, useRef} from 'react';
import {generateCodeChallenge, generateCodeVerifier} from '../../pkce/pkce';
import {useCookies} from 'react-cookie';
import {oauth2ClientInfo} from '../../config/app-config';

const Login = () => {
    const loginRef = useRef<boolean>(true);
    const [cookies, setCookie] = useCookies(['gv', 'gc']);
    let generatedVerifier = generateCodeVerifier();
    let generatedChallenge = generateCodeChallenge();

    useEffect(() => {
        if(loginRef.current){
            setCookie('gv', generatedVerifier, {domain: '127.0.0.1', path: '/', httpOnly: false});
            console.log('Verifier: ', generatedVerifier, ' : Challenge ' + generatedChallenge);
            loginRef.current = false;

            login();
        }
    }, []);

    const login = () => {
        window.location.href = `${oauth2ClientInfo.authServerUrl}/oauth2/authorize?response_type=code&client_id=${oauth2ClientInfo.clientId}&scope=openid&redirect_uri=${oauth2ClientInfo.redirect_uri}&code_challenge=QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8&code_challenge_method=S256`;
    };

    return <div className={'col text-center'}>
        <h1>If not redirected, Plesae click on sign-in button</h1>
        <Button className='p-button-sm' onClick={login}>
            Sign in
        </Button>
    </div>
}


export default Login;