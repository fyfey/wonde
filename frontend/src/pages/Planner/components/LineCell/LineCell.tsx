import {
    PLANNER_CELL_HEIGHT,
    PLANNER_CELL_HEIGHT_CLASS,
} from "../../../../config";

import { FC } from "react";

interface LineCellProps {
    idx: number;
}
export const LineCell: FC<LineCellProps> = ({ idx }) => {
    return (
        <div
            className={`${PLANNER_CELL_HEIGHT_CLASS} border-t border-gray-100 ${
                idx % 3 === 0 ? "border-gray-200" : ""
            }`}
        />
    );
};
