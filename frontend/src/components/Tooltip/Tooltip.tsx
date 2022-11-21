import { FC, PropsWithChildren, forwardRef } from "react";

export const Tooltip = forwardRef<any, PropsWithChildren>(
    ({ children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className="absolute w-max z-50 p-2 bg-black text-gray-200"
                {...props}
            >
                {children}
            </div>
        );
    }
);
