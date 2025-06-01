import {ActivityExercise} from "../../model/wod/activity/activity-exercise.ts";

export function ActivityExerciseDisplay({exercise}: {exercise: ActivityExercise}) {
    return (
        <>
            {exercise.repetitions} {exercise.exercise.name} {!!exercise.comment && '(' + exercise.comment + ')'}
        </>
    );
}