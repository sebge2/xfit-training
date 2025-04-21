import {ActivityDisplay} from "./activity-display.tsx";
import {Sequence} from "../../model/activity/sequence.ts";

export function SequenceDisplay({sequence}: { sequence: Sequence }) {
    return (
        <>
            <ul>
                {sequence.activities.map(activity => <li><ActivityDisplay activity={activity}/></li>)}
            </ul>
        </>
    );
}