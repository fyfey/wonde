import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

interface UserDropdownProps {
    label: any;
    onLogout: () => void;
}
export const UserDropdown: FC<UserDropdownProps> = ({ label, onLogout }) => {
    return (
        <div className="w-full max-w-sm">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                    ${open ? "bg-blue-700" : "text-opacity-90 bg-slate-700"}
                    group inline-flex items-center rounded-md hover:bg-blue-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75`}
                        >
                            {label}
                        </Popover.Button>

                        <Popover.Panel className="absolute right-0 z-40 mt-3 max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-4 bg-white border text-gray-500 hover:text-blue-500">
                                    <div className="flex flex-col">
                                        <button
                                            className="flex gap-2 items-center"
                                            onClick={onLogout}
                                        >
                                            <FontAwesomeIcon
                                                icon={faDoorOpen}
                                            />{" "}
                                            Logout
                                        </button>
                                    </div>

                                    <img src="/solutions.jpg" alt="" />
                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </div>
    );
};
