import { Button } from "../../../../components";
import { FC } from "react";

interface NotesProps {}
export const Notes: FC<NotesProps> = () => {
    return (
        <div className="area-notes h-full bg-white rounded-lg flex flex-col overflow-hidden">
            <div className="notes-header p-4 border-b flex justify-between items-center shadow-sm z-10">
                <div className="font-bold text-xl">Notes</div>
                <Button>Save</Button>
            </div>
            <textarea className="p-4 text-lg resize-none h-full focus:outline-none bg-yellow-100" />
        </div>
    );
};
