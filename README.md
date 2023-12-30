# qterminals-auth-server

<p>http://nabbasi:9000/.well-known/oauth-authorization-server</p>
<p>http://nabbasi:9000/.well-known/openid-configuration</p>

# Authorization server
#### http://localhost:8080/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://127.0.0.1:3000/authorized&code_challenge=QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8&code_challenge_method=S256
##### http://localhost:8080/oauth2/token?client_id=client&redirect_uri=http://127.0.0.1:3000/authorized&grant_type=authorization_code&code=chY2_vBejXzAEDXZAqxfj4xohCUKN6IXh6VJv5GPWxtfp8ea3lwYKzJ7M8ZilEkdnkjDpDvlJZwoicRzTt_2YohxndCiz6CSc_Pe0UgjlUvqzpci2FBZnO4s07yTPtdf&code_verifier=qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI

<p>code_challenge=QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8</p>
<p>code_verifier=qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI</p>