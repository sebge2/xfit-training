import {ActivityExercise} from "../../../model/wod/activity/activity-exercise.ts";

export function ActivityExerciseDisplay({exercise}: {exercise: ActivityExercise}) {
    // {exercise.repetitions} {exercise.exercise.name} {!!exercise.comment && '(' + exercise.comment + ')'}
    return (
        <>
            {exercise.repetitions} {exercise.exercise}
        </>
    );
}