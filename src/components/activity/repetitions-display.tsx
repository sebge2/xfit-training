import {Repetitions} from "../../model/activity/repetitions.ts";
import {ActivityDisplay} from "./activity-display.tsx";

export function RepetitionsDisplay({repetitions}: { repetitions: Repetitions }) {
    return (
        <>
            <div>
                {repetitions.repetitions} rounds of:

                <ActivityDisplay activity={repetitions.activity} />
            </div>
        </>
    );
}