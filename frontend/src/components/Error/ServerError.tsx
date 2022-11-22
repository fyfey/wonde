import { FC } from "react";

interface ServerErrorProps {}
export const ServerError: FC<ServerErrorProps> = () => {
    return (
        <div className="flex w-full h-full items-center justify-center bg-slate-300">
            <div className="p-8 rounded-lg shadow-md bg-white flex flex-col">
                <div className="font-bold text-3xl mb-8">🤭 Oops!</div>
                <div className="text-lg">
                    Something didn't work. Please try again.
                </div>
            </div>
        </div>
    );
};
