import { useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogIn = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {dispatch} = useContext(AuthContext);

    const logIn = async (email, password) => {
        setLoading(true);
        setError(null);
        const response = await fetch('/login', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({type: 'LOGIN', payload: data});
        } else {
            setError(data.error);
        }
        setLoading(false);
    }
    return {error, loading, logIn};
}
