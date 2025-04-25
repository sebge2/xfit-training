import {Enom} from "../../model/activity/enom.ts";
import {ActivityDisplay} from "./activity-display.tsx";
import DurationDisplay from "./duration-display.tsx";

export function EnomDisplay({enom}: { enom: Enom }) {
    return (
        <div>
            <p>ENOM <DurationDisplay duration={enom.duration} /> {enom.repetitions} repetitions</p>

            <ActivityDisplay activity={enom.activity} />
        </div>
    );
}