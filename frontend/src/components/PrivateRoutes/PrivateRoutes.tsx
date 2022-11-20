import { FC, PropsWithChildren, useEffect } from "react";
import { Outlet, RouteProps, useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/useAuth";

type ProtectedRouteProps = PropsWithChildren;
export const PrivateRoutes: FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (user.id === 0) {
        navigate("/");
        return null;
    }
    return <Outlet />;
};
