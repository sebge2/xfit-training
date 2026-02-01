import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityExerciseDto} from "../../dto/wod/activity/activity-exercise.dto.ts";
import {TaskSet} from "../board/task-set.ts";

export class ActivityExercise extends Activity {

    static fromDto(dto: ActivityExerciseDto): ActivityExercise {
        return new ActivityExercise(
            dto.repetitions,
            dto.exercise,
            dto.comment || undefined,
        );
    }

    static toDto(activity: ActivityExercise): ActivityExerciseDto {
        return {
            type: activity.type,
            repetitions: activity.repetitions,
            exercise: activity.exercise,
            comment: activity.comment || null,
        };
    }

    constructor(
        public readonly repetitions: string,
        public readonly exercise: string,
        comment: string | undefined,
    ) {
        super(ActivityType.EXERCISE, comment);
    }

    toSequencerTasks(): TaskSet {
        return new TaskSet([]);
    }
}