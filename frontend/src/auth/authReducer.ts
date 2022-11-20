import {
    AuthAction,
    AuthState,
    defaultAuthState,
    defaultAuthUser,
} from "./AuthContext";

export const authReducer = (
    state: AuthState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "CLEAR_USER":
            return { ...state, user: defaultAuthUser };
        case "LOGOUT":
            return defaultAuthState;
        default:
            throw new Error(`authReducer: Action not found!`);
    }
};
