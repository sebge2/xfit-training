import {ActivityBox} from "../activity-box.tsx";
import {ActivityContext, ActivityProps} from "../activity-display.tsx";
import {ActivityExercise} from "../../../../model/wod/activity/activity-exercise.ts";
import {MoreActionButtonAction} from "../../../core/buttton/MoreActionButton.tsx";
import EditIcon from '@mui/icons-material/Edit';
import {ActivityExerciseDataEditor} from "./activity-exercise-data-editor.tsx";

type Props = ActivityProps & {
    activity: ActivityExercise,
};

export function ActivityExerciseDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext: ActivityContext = {
        editing: parentContext.editing,
        activity: activity,
        childrenActions: [],
    };

    const actions: MoreActionButtonAction[] = [];
    if (currentContext.editing) {
        actions.push({
            label: "Edit",
            icon: <EditIcon/>,
            onClick: () => onUpdateDelegate(activity),
        });
    }

    function onUpdate() {
        onUpdateDelegate(activity);
    }

    return (
        <>
            {currentContext.editing && <ActivityExerciseDataEditor exercise={activity} onUpdate={onUpdate}/>}

            <ActivityBox actions={[...actions, ...parentContext.childrenActions]}>
                {activity.repetitions} {activity.exercise} {!!activity.comment && '(' + activity.comment + ')'}
            </ActivityBox>
        </>
    );
}