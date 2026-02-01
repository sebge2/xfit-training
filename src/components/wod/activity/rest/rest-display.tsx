import {Rest} from "../../../../model/wod/activity/rest.ts";
import DurationDisplay from "../duration-display.tsx";
import {ActivityBox} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";
import {ActivityProps} from "../activity-display.tsx";

type Props = ActivityProps & {
    activity: Rest,
};

export function RestDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    function onUpdate() {
        onUpdateDelegate(activity);
    }

    return (
        <>
            <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[activity.type]}
                         actions={parentContext.childrenActions}>
                {activity.duration && <span>Rest: <DurationDisplay duration={activity.duration}/></span>}
            </ActivityBox>
        </>
    );
}