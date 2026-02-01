import {Amrap} from "../../../../model/wod/activity/amrap.ts";
import {ActivityContext, ActivityDisplay, ActivityProps} from "../activity-display.tsx";
import DurationDisplay from "../duration-display.tsx";
import {ActivityBox} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";

type Props = ActivityProps & {
    activity: Amrap,
};

export function AmrapDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext: ActivityContext = {
        editing: parentContext.editing,
        activity: activity,
        childrenActions: [],
    };

    function onUpdate() {
        onUpdateDelegate(activity);
    }

    return (
        <>
            <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[activity.type]}
                         innerTitle={activity.duration &&
                             <span>Duration: <DurationDisplay duration={activity.duration}/></span>}
                         actions={parentContext.childrenActions}>
                <ActivityDisplay activity={activity.activity}
                                 parentContext={currentContext}
                                 onUpdate={onUpdateDelegate}/>
            </ActivityBox>
        </>
    );
}