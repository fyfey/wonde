import { FC } from "react";
import { Navbar } from "../Navbar";
import { Outlet } from "react-router-dom";

interface AuthedLayoutProps {}
export const AuthedLayout: FC<AuthedLayoutProps> = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <Outlet />
        </div>
    );
};
