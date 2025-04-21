import {DurationDto} from "../dto/activity/duration.dto.ts";

export class Duration {

    static fromDto(dto: DurationDto): Duration {
        return new Duration(dto.minutes, dto.seconds);
    }

    constructor(
        public readonly minutes: number,
        public readonly seconds: number,
    ) {
    }
}