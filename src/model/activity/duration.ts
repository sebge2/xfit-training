import {DurationDto} from "../dto/activity/duration.dto.ts";

export class Duration {

    static fromDto(dto: DurationDto | undefined): Duration | undefined {
        if (!dto) {
            return undefined;
        }

        return new Duration(dto.minutes, dto.seconds);
    }

    constructor(
        public readonly minutes: number,
        public readonly seconds: number = 0,
    ) {
    }

    hasDuration(): boolean {
        return this.minutes > 0 || this.seconds > 0;
    }
}