import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {AmrapDto} from "../dto/activity/amrap.dto.ts";

export class Amrap implements Activity {

    static fromDto(dto: AmrapDto): Amrap {
        return new Amrap(
            Duration.fromDto(dto.duration),
            ActivityDeserializer.deserializeAll(dto.activities),
            dto.comment
        );
    }

    constructor(
        public readonly duration: Duration,
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.AMRAP;
    }
}