import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return JSON.parse(tokenString);
        //return userToken?.token
      };

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken.value));
        setToken(userToken.token);
    };

    const [token, setToken] = useState(getToken());
    
    return {
        setToken: saveToken,
        token
    }

}