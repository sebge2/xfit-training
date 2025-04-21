import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";

export class Sequence implements Activity {

    constructor(
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.SEQUENCE;
    }
}