import {Repetitions} from "../../../../model/wod/activity/repetitions.ts";
import {ActivityContext, ActivityDisplay, ActivityProps} from "../activity-display.tsx";
import {ActivityBox} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";

type Props = ActivityProps & {
    activity: Repetitions,
};

export function RepetitionsDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext: ActivityContext = {
        editing: parentContext.editing,
        activity: activity,
        childrenActions: [],
    };

    return (
        <>
            <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[activity.type]}
                         innerTitle={activity.repetitions + ' rounds'}
                         actions={parentContext.childrenActions}>
                <ActivityDisplay activity={activity.activity}
                                 parentContext={currentContext}
                                 onUpdate={onUpdateDelegate}/>
            </ActivityBox>
        </>
    );
}