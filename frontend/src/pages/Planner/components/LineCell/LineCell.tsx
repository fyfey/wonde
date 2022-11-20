import { FC } from "react";
import { PLANNER_CELL_HEIGHT } from "../../../../config";

interface LineCellProps {
    idx: number;
}
export const LineCell: FC<LineCellProps> = ({ idx }) => {
    return (
        <div
            className={`${PLANNER_CELL_HEIGHT} border-t border-gray-100 ${
                idx % 3 === 0 ? "border-gray-200" : ""
            }`}
        />
    );
};
