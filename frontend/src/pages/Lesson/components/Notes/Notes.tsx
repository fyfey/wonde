import { Await, useLoaderData } from "react-router-dom";
import { FC, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { lessonNotes, saveLessonNotes } from "../../../../api";

import { Button } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lesson } from "../../../../models/Lesson";
import { Note } from "../../../../models/Note";
import { faSave } from "@fortawesome/free-solid-svg-icons";

interface NotesProps {
    lesson: Lesson;
}
export const Notes: FC<NotesProps> = ({ lesson }) => {
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        load();
    }, []);
    const load = () => {
        setLoading(true);
        lessonNotes(lesson.externalId).then(setNote).finally(done);
    };
    const done = () => setLoading(false);
    const handleSave = useCallback(() => {
        setLoading(true);
        saveLessonNotes(lesson.externalId, noteRef.current?.value ?? "")
            .then(load)
            .finally(done);
    }, [lesson.externalId, noteRef]);

    return (
        <div className="area-notes h-full bg-white rounded-lg flex flex-col overflow-hidden shadow-md">
            <div className="notes-header p-4 border-b flex justify-between items-center shadow-sm z-10">
                <div className="font-bold text-xl">Notes</div>
                <Button loading={loading} onClick={handleSave}>
                    <span className="mr-2">Save</span>
                    <FontAwesomeIcon icon={faSave} />
                </Button>
            </div>
            <textarea
                disabled={loading}
                ref={noteRef}
                defaultValue={note?.body ?? ""}
                className="p-4 text-lg resize-none h-full focus:outline-none bg-yellow-100 disabled:bg-yellow-50 text-yellow-800 transition-colors duration-500"
            />
        </div>
    );
};
