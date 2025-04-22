import {Rest} from "../../model/activity/rest.ts";
import DurationDisplay from "./duration-display.tsx";

export function RestDisplay({rest}: { rest: Rest }) {
    return (
        <>
            <span>Rest <DurationDisplay duration={rest.duration} /></span>
        </>
    );
}