import {Wod} from "../../model/activity/wod.ts";
import {ActivityDisplay} from "./activity-display.tsx";

export function WodDisplay({wod}: { wod: Wod }) {
    return (
        <div>
            <label>Name:</label>
            <span>{wod.name}</span>

            <div>
                <ActivityDisplay activity={wod.activity}/>
            </div>
        </div>
    );
}