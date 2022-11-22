import { FC, PropsWithChildren } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconInfoProps extends PropsWithChildren {
    icon: IconProp;
}
export const IconInfo: FC<IconInfoProps> = ({ icon, children }) => {
    return (
        <div className="flex gap-2">
            <div className="flex items-center gap-2">
                <div className="w-4 flex justify-center">
                    <FontAwesomeIcon size="xs" icon={icon} />
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
