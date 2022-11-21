import {
    Dispatch,
    FC,
    createContext,
    useEffect,
    useReducer,
    useState,
} from "react";

import { Loader } from "../components/Loader/Loader";
import { User } from "../models/User";
import { authReducer } from "./authReducer";
import { me } from "../api";
import { useNavigate } from "react-router-dom";

export interface AuthState {
    user: User;
}
export const defaultAuthUser: User = {
    name: "",
    id: 0,
    externalId: "",
};
export const defaultAuthState: AuthState = {
    user: defaultAuthUser,
};
export type AuthAction =
    | { type: "SET_USER"; payload: User }
    | { type: "CLEAR_USER" }
    | { type: "LOGOUT" };

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
}>({
    state: defaultAuthState,
    dispatch: null as unknown as Dispatch<AuthAction>,
});

export const AuthProvider: FC<any> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, defaultAuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        me()
            .then(
                (user) => {
                    dispatch({ type: "SET_USER", payload: user });
                },
                () => {
                    dispatch({ type: "CLEAR_USER" });
                }
            )
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};
