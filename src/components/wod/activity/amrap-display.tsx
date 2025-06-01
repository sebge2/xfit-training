import {Amrap} from "../../../model/wod/activity/amrap.ts";
import {ActivityDisplay} from "./activity-display.tsx";
import DurationDisplay from "./duration-display.tsx";

export function AmrapDisplay({amrap}: { amrap: Amrap }) {
    return (
        <div>
            Amrap: <DurationDisplay duration={amrap.duration} />
            <ActivityDisplay activity={amrap.activity} />
        </div>
    );
}