import {ActivityBox} from "../activity-box.tsx";
import {ActivityContext, ActivityProps} from "../activity-display.tsx";
import {ActivityExerciseDataEditor} from "./activity-exercise-data-editor.tsx";
import {ActivityExercise} from "../../../../model/wod/activity/activity-exercise.ts";

type Props = ActivityProps & {
    activity: ActivityExercise,
};

export function ActivityExerciseDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext: ActivityContext = {
        editing: parentContext.editing,
        activity: activity,
        childrenActions: [],
    };

    function onUpdate() {
        onUpdateDelegate(activity);
    }

    return (
        <ActivityBox actions={parentContext.childrenActions}>
            {!currentContext.editing && <>
                {activity.repetitions} {activity.exercise} {!!activity.comment && '(' + activity.comment + ')'}
            </>}
            {currentContext.editing && <ActivityExerciseDataEditor exercise={activity} onUpdate={onUpdate}/>}
        </ActivityBox>
    );
}