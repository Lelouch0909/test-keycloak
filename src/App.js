import React, { useEffect, useState } from 'react';
import keycloak from './keycloak';
import { postRequest } from './api';

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
     try {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            setAuthenticated(authenticated);
        }).catch(error => {
            console.error('Keycloak initialization failed', error);
        });
     } catch (error) {
        console.log(error);
        
     }
    }, []);

    const handleSignUp = () => {
        window.location.href = keycloak.createRegisterUrl();
    };

    if (!authenticated) {
        return (
            <div>
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome to React with Keycloak!</h1>
            <p>User: {keycloak.tokenParsed?.preferred_username}</p>
            <button onClick={() => postRequest('/api/hello', { name: 'World' })}>Say Hello</button>

            <button onClick={() => keycloak.logout()}>Logout</button>
        </div>
    );
}

export default App;