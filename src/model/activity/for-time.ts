import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {ForTimeDto} from "../dto/activity/for-time.dto.ts";

export class ForTime implements Activity {

    static fromDto(dto: ForTimeDto): ForTime {
        return new ForTime(
            Duration.fromDto(dto.duration),
            ActivityDeserializer.deserialize(dto.activity),
            dto.comment
        );
    }

    constructor(
        public readonly duration: Duration | undefined,
        public readonly activity: Activity,
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.FOR_TIME;
    }
}