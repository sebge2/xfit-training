import {ActivityExercise} from "../../../../model/wod/activity/activity-exercise.ts";
import {ActivityBox} from "../activity-box.tsx";
import {ActionsProps, ActivityContext} from "../activity-display.tsx";

type Props = ActionsProps & {
    exercise: ActivityExercise,
    parentContext: ActivityContext,
};

export function ActivityExerciseDisplay({exercise, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext = {
        editing: parentContext.editing,
        parent: exercise,
    };

    function onUpdate() {
        onUpdateDelegate(exercise);
    }

    return (
        <ActivityBox context={currentContext}>
            {exercise.repetitions} {exercise.exercise} {!!exercise.comment && '(' + exercise.comment + ')'}
        </ActivityBox>
    );
}