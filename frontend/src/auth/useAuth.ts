import { AuthContext } from "./AuthContext";
import { User } from "../models/User";
import { logout } from "../api";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const {
        state: { user },
        dispatch,
    } = useContext(AuthContext);
    const navigate = useNavigate();

    return {
        user,
        setUser: (user: User) => dispatch({ type: "SET_USER", payload: user }),
        logout: async () => {
            await logout();
            dispatch({ type: "LOGOUT" });
            navigate("/");
        },
    };
};
