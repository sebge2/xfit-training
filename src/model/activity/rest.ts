import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";

export class Rest implements Activity {

    constructor(
        public readonly duration: Duration,
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.REST;
    }

}