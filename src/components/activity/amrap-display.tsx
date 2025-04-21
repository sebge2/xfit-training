import {Amrap} from "../../model/activity/amrap.ts";
import {ActivityDisplay} from "./activity-display.tsx";

export function AmrapDisplay({amrap}: { amrap: Amrap }) {
    return (
        <div>
            <ActivityDisplay activity={amrap.activity} />
        </div>
    );
}