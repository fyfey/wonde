import { Link, useNavigate } from "react-router-dom";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lesson } from "../../../../models/Lesson";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface BreadcrumbProps {
    lesson: Lesson;
}
export const Breadcrumb: FC<BreadcrumbProps> = ({ lesson }) => {
    const navigate = useNavigate();
    return (
        <div className="area-header bg-slate-100 p-2 px-4 rounded-md flex gap-2 items-center">
            <button onClick={() => navigate(-1)} className="text-blue-500">
                Planner
            </button>
            <FontAwesomeIcon icon={faChevronRight} />
            <span>Class {lesson.name}</span>
        </div>
    );
};
