import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {SequenceDto} from "../dto/activity/sequence.dto.ts";

export class Sequence implements Activity {

    static fromDto(dto: SequenceDto): Sequence {
        return new Sequence(
            ActivityDeserializer.deserializeAll(dto.activities),
            dto.comment
        );
    }

    constructor(
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.SEQUENCE;
    }
}