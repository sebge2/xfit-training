import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {EnomDto} from "../dto/activity/enom.dto.ts";

export class Enom implements Activity {

    static fromDto(dto: EnomDto): Enom {
        return new Enom(
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
        return ActivityType.ENOM;
    }
}