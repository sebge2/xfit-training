import {Enom} from "../../model/activity/enom.ts";
import {ActivityDisplay} from "./activity-display.tsx";

export function EnomDisplay({enom}: { enom: Enom }) {
    return (
        <div>
            <ActivityDisplay activity={enom.activity} />
        </div>
    );
}