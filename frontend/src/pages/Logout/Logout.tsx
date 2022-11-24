import { FC, useEffect } from "react";

import { Loader } from "../../components";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

interface LogoutProps {}
export const Logout: FC<LogoutProps> = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
    });
    /**
     * this is needed as the context update is async. So we need to wait
     * for the user.id to be cleared (back to 0), otherwise Login route
     * thinks we're still logged in.
     */
    useEffect(() => {
        if (user?.id === 0) {
            navigate("/");
        }
    }, [user]);

    return <Loader label="Logging out..." />;
};
