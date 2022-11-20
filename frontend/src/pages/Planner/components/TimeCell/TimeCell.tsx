import { FC, useEffect, useState } from "react";
import {
    PLANNER_CELL_HEIGHT,
    PLANNER_CELL_HEIGHT_CLASS,
} from "../../../../config";

import { Time } from "../../../../lib/time/time";

interface TimeCellProps {
    idx: number;
    startTime: string;
}
export const TimeCell: FC<TimeCellProps> = ({ idx, startTime }) => {
    const [time, setTime] = useState<Time>();
    useEffect(() => {
        if (idx % 3 !== 0) {
            return;
        }
        const t = Time.fromString(startTime);
        t.addMins(5, idx);
        setTime(t);
    }, [idx, startTime]);
    if (idx % 3 === 0) {
        return (
            <div
                className={`${PLANNER_CELL_HEIGHT_CLASS} text-xs text-right relative -top-[7px] right-1`}
            >
                {time?.toString()}
            </div>
        );
    }
    return <div className={PLANNER_CELL_HEIGHT_CLASS}></div>;
};
