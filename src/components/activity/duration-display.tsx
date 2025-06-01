import {Duration} from "../../model/wod/activity/duration.ts";

export default function DurationDisplay({duration}: { duration: Duration | undefined }) {
    return (
        <>
            {duration && duration.hasDuration && <span>
                {(duration.minutes > 0) && duration?.minutes + 'm'} {(duration.seconds > 0) && duration?.seconds + 's'}
            </span>}
        </>
    );
}