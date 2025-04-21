import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";

export class Repetitions implements Activity {

    constructor(
        public readonly repetitions: number,
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.REPETITIONS;
    }
}