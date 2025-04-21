import {Rest} from "../../model/activity/rest.ts";

export function RestDisplay({rest}: { rest: Rest }) {
    return (
        <>
            <span>Rest {rest.duration.minutes}</span>
        </>
    );
}