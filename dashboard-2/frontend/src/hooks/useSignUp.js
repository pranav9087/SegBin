import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const signUp = async (email, password, username) => {
        setLoading(true);
        setError(null);
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, username})
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
    return {error, loading, signUp};
};