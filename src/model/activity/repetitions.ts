import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {RepetitionsDto} from "../dto/activity/repetitions.dto.ts";

export class Repetitions implements Activity {

    static fromDto(dto: RepetitionsDto): Repetitions {
        return new Repetitions(
            dto.repetitions,
            ActivityDeserializer.deserialize(dto.activity),
            dto.comment
        );
    }

    constructor(
        public readonly repetitions: number,
        public readonly activity: Activity,
        public readonly comment: string | undefined,
    ) {
    }

    type(): ActivityType {
        return ActivityType.REPETITIONS;
    }
}