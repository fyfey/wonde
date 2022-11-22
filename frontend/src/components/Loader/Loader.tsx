import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoaderProps {
    label?: string;
}
export const Loader: FC<LoaderProps> = ({ label }) => {
    return (
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center bg-slate-300">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            {label && <div>{label}</div>}
        </div>
    );
};
