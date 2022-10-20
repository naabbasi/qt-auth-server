import * as crypto from 'crypto-js';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

const base64Url = (str: string) => {
    return str.toString().replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

const generateCodeVerifier = () => {
    let randomString = crypto.lib.WordArray.random(32);
    let codeVerifier = base64Url(Base64.stringify(randomString));
    sessionStorage.setItem('codeVerifier', codeVerifier);

    return codeVerifier;
}

const generateCodeChallenge = () => {
    const codeVerifier: string | null = sessionStorage.getItem('codeVerifier');
    if(codeVerifier != null){
        let hash = sha256(codeVerifier) + '';
        return base64Url(hash);
    }

    return '';
}

export {
    generateCodeVerifier,
    generateCodeChallenge
}