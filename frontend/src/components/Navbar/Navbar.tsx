import { APP_ICON, APP_TITLE } from "../../config";
import { Link, useNavigate } from "react-router-dom";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserDropdown } from "./components";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/useAuth";

interface NavbarProps {}
export const Navbar: FC<NavbarProps> = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="w-full h-[60px] p-2 bg-slate-900 text-gray-300 flex justify-between">
            <div className="flex items-center">
                <Link to="/planner">
                    <div className="inline-flex gap-2 pl-4 items-center font-bold">
                        <FontAwesomeIcon icon={APP_ICON} />
                        {APP_TITLE}
                    </div>
                </Link>
            </div>
            <div>
                <UserDropdown
                    onLogout={() => navigate("/logout")}
                    label={
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faUser} />
                            {user.name}
                        </div>
                    }
                />
            </div>
        </nav>
    );
};
