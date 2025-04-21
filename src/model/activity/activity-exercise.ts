import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityExerciseDto} from "../dto/activity/activity-exercise.dto.ts";

export class ActivityExercise implements Activity {

    static fromDto(dto: ActivityExerciseDto): ActivityExercise {
        return new ActivityExercise(dto.repetitions, dto.comment);
    }

    constructor(
        public readonly repetitions: string,
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.EXERCISE;
    }
}