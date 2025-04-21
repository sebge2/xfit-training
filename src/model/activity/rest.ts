import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {RestDto} from "../dto/activity/rest.dto.ts";

export class Rest implements Activity {

    static fromDto(dto: RestDto): Rest {
        return new Rest(
            Duration.fromDto(dto.duration),
            dto.comment
        );
    }

    constructor(
        public readonly duration: Duration,
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.REST;
    }

}