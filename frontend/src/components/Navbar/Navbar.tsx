import { APP_ICON, APP_TITLE } from "../../config";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserDropdown } from "./components";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/useAuth";

interface NavbarProps {}
export const Navbar: FC<NavbarProps> = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="w-full p-2 bg-slate-900 text-gray-300 flex justify-between">
            <div className="inline-flex gap-2 pl-4 items-center font-bold">
                <FontAwesomeIcon icon={APP_ICON} />
                {APP_TITLE}
            </div>
            <div>
                <UserDropdown
                    onLogout={logout}
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
