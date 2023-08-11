import { AuthContext } from "../context/AuthContext"
import { useContext } from "react";

export const useLogOut = () => {
    const { dispatch } = useContext(AuthContext);
    const logOut = () => {
        localStorage.removeItem('user');
        console.log('logout');
        dispatch({type: 'LOGOUT'});
    }
    return {logOut};
}