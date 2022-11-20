import { FC, useEffect, useState } from "react";
import { PLANNER_CELL_HEADER_HEIGHT, PLANNER_CELL_HEIGHT } from "../../config";

import { LineCell } from "./components/LineCell/LineCell";
import { TimeCell } from "./components/TimeCell/TimeCell";
import { periods as periodsApi } from "../../api";

const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

interface PlannerProps {}
export const Planner: FC<PlannerProps> = () => {
    const [days, setDays] = useState<any[]>([]);

    useEffect(() => {
        periodsApi().then((p) => setDays(p.days));
    }, []);
    return (
        <div>
            <div className="header flex justify-evenly sticky top-0 bg-white/70 z-10 shadow-md">
                <div className="w-64" />
                {days.map((day, idx) => (
                    <div
                        className={`${PLANNER_CELL_HEADER_HEIGHT} flex items-center justify-center text-xs font-bold border-r w-full`}
                    >
                        {dayNames[idx]}
                    </div>
                ))}
            </div>
            <div className="min-h-full w-full flex justify-evenly overflow-y-scroll">
                <div className="flex-0 w-64 bg-gray-100 min-h-full border-r">
                    <div
                        className={`text-center ${PLANNER_CELL_HEADER_HEIGHT}`}
                    />
                    <div className="periods">
                        {Array.from({
                            length: days?.[0]?.diff?.blocks || 0,
                        }).map((_, jdx) => (
                            <TimeCell
                                key={jdx}
                                idx={jdx}
                                startTime={days[0].start}
                            />
                        ))}
                    </div>
                </div>
                {days.map((day, idx) => (
                    <div key={idx} className="w-full min-h-full border-r">
                        <div
                            className={`text-center ${PLANNER_CELL_HEADER_HEIGHT}`}
                        />
                        <div className="periods">
                            {Array.from({ length: day.diff.blocks }).map(
                                (period, jdx) => (
                                    <LineCell key={jdx} idx={jdx} />
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
