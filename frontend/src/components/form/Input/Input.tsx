import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

import { useController } from "react-hook-form";

interface InputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    name: string;
}
export const Input: FC<InputProps> = ({ className, ...props }) => {
    const { field } = useController({
        name: props.name,
    });
    return (
        // wrap this extra div to "capture" password manager additional divs that may be added to the DOM
        <div>
            <input
                className={`p-2 border border-gray-100 rounded-md focus:outline-none focus:ring text-gray-500 autofill:!bg-yellow-200 ${className}`}
                {...props}
                {...field}
            />
        </div>
    );
};
