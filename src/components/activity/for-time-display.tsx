import {ForTime} from "../../model/wod/activity/for-time.ts";
import {ActivityDisplay} from "./activity-display.tsx";
import DurationDisplay from "./duration-display.tsx";

export function ForTimeDisplay({forTime}: {forTime: ForTime}) {
    return (
        <>
            For time: <DurationDisplay duration={forTime.duration}/>
            <ActivityDisplay activity={forTime.activity} />
        </>
    );
}