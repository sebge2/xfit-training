import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {RepetitionsDto} from "../dto/activity/repetitions.dto.ts";

export class Repetitions implements Activity {

    static fromDto(dto: RepetitionsDto): Repetitions {
        return new Repetitions(
            dto.repetitions,
            ActivityDeserializer.deserializeAll(dto.activities),
            dto.comment
        );
    }

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