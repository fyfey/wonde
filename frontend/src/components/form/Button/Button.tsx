import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    loading?: boolean;
}
export const Button: FC<ButtonProps> = ({
    children,
    className,
    loading = false,
    ...props
}) => {
    return (
        <button
            disabled={props.disabled || loading}
            className={`p-2 bg-blue-400 disabled:bg-blue-200 text-white rounded-md`}
            {...props}
        >
            {loading ? <FontAwesomeIcon icon={faSpinner} /> : children}
        </button>
    );
};
