import {
    FC,
    LegacyRef,
    MouseEvent,
    MutableRefObject,
    Ref,
    RefObject,
    useCallback,
    useRef,
    useState,
} from "react";
import {
    arrow,
    useFloating,
    useHover,
    useInteractions,
} from "@floating-ui/react-dom-interactions";
import {
    faCheck,
    faLayerGroup,
    faPlay,
    faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { offset, shift } from "@floating-ui/react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lesson } from "../../../../models/Lesson";
import { lessons } from "../../../../api";

interface OverlapWarningProps {
    lesson: Lesson;
    onSwitch: (e: MouseEvent, lesson: Lesson) => void;
}
export const OverlapWarning: FC<OverlapWarningProps> = ({
    lesson,
    onSwitch,
}) => {
    const arrowRef = useRef(null);
    const [open, setOpen] = useState(false);
    const toggleOpen = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            setOpen((o) => !o);
        },
        [setOpen]
    );
    const {
        context,
        floating,
        reference,
        x,
        y,
        middlewareData: { arrow: { x: arrowX } = {} },
    } = useFloating({
        placement: "bottom-start",
        open,
        onOpenChange: (open) => setOpen(open),
        middleware: [
            arrow({
                element: arrowRef as any,
                padding: {
                    left: 10,
                    right: 0,
                    top: 0,
                    bottom: 0,
                },
            }),
            offset({
                mainAxis: 40,
                crossAxis: 0,
            }),
        ],
    });
    useInteractions([
        useHover(context, {
            delay: 100,
        }),
    ]);

    const switchLesson = (e: MouseEvent, lesson: Lesson) => {
        onSwitch(e, lesson);
        setOpen(false);
    };

    return (
        <div ref={reference}>
            <button
                onClick={toggleOpen}
                className="warning absolute z-40 w-8 h-8 border bg-yellow-300 rounded-full flex items-center justify-center text-gray-800 shadow-md"
            >
                <FontAwesomeIcon icon={faLayerGroup} />
            </button>
            {open && (
                <div
                    ref={floating}
                    style={{
                        left: x ?? 0,
                        top: y ?? 0,
                    }}
                    className="absolute w-max border rounded-md z-50 py-4 bg-white text-gray-500 shadow-md"
                >
                    <div
                        ref={arrowRef as any}
                        className="tooltip-arrow"
                        style={{ top: -4, left: arrowX ? arrowX + 15 : 0 }}
                    />
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4 hover:bg-blue-200 hover:text-blue-500 px-4 py-2 cursor-pointer">
                            <div className="w-3 text-blue-500">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div>{lesson.name}</div>
                        </div>
                        {lesson.overlapping.map((l) => (
                            <div
                                onClick={(e) => switchLesson(e, l)}
                                className="flex gap-4 hover:bg-blue-200 hover:text-blue-500 px-4 py-2 cursor-pointer"
                            >
                                <div className="w-3" />
                                <div>{l.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
