import {ForTime} from "../../model/activity/for-time.ts";
import {ActivityDisplay} from "./activity-display.tsx";

export function ForTimeDisplay({forTime}: {forTime: ForTime}) {
    return (
        <>
            For time: {forTime.duration && forTime.duration?.minutes + 'm'} {forTime.duration && forTime.duration.seconds > 0 && forTime.duration?.seconds + 's'}
            <ActivityDisplay activity={forTime.activity} />
        </>
    );
}