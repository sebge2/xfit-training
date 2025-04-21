import {ActivityDisplay} from "./activity-display.tsx";
import {Sequence} from "../../model/activity/sequence.ts";

export function SequenceDisplay({sequence}: { sequence: Sequence }) {
    return (
        <div className="sequence-display">
            {sequence.activities.map(activity =>
                <div className="sequence-display-element">
                    <ActivityDisplay activity={activity}/>
                </div>)}
        </div>
    );
}