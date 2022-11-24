import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Outlet, RouteProps, useNavigate } from "react-router-dom";

import { Loader } from "../Loader";
import { useAuth } from "../../auth/useAuth";

type ProtectedRouteProps = PropsWithChildren;
export const PrivateRoutes: FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.id === 0) {
            navigate("/");
            return;
        }
        setLoading(false);
    }, [user.id]);

    if (loading) {
        return <Loader />;
    }

    return <Outlet />;
};
