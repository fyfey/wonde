import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoaderProps {}
export const Loader: FC<LoaderProps> = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <FontAwesomeIcon icon={faSpinner} spin size="5x" />
        </div>
    );
};
