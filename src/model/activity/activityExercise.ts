import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";

export class ActivityExercise implements Activity {

    constructor(
        public readonly repetitions: string,
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.EXERCISE;
    }
}