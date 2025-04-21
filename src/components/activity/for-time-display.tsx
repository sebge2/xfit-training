import {ForTime} from "../../model/activity/for-time.ts";
import {ActivityDisplay} from "./activity-display.tsx";

export function ForTimeDisplay({forTime}: {forTime: ForTime}) {
    return (
        <>
            <ul>
                {forTime.activities.map(activity => <li><ActivityDisplay activity={activity}/></li>)}
            </ul>
        </>
    );
}