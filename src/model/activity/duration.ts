import {DurationDto} from "../dto/activity/duration.dto.ts";

export class Duration {

    static fromDto(dto: DurationDto | undefined): Duration | undefined {
        if (!dto) {
            return undefined;
        }

        return new Duration(dto.minutes, dto.seconds);
    }

    static fromSeconds(seconds: number): Duration {
        if (seconds <= 0) {
            return new Duration(0);
        }

        return new Duration(Math.floor(seconds / 60), Math.floor(seconds % 60));
    }

    static fromMilliSeconds(milliSeconds: number): Duration {
        return this.fromSeconds(milliSeconds / 1000);
    }

    constructor(
        public readonly minutes: number,
        public readonly seconds: number = 0,
    ) {
    }

    get hasDuration(): boolean {
        return this.minutes > 0 || this.seconds > 0;
    }

    get totalSeconds(): number {
        return (this.minutes * 60) + this.seconds;
    }
}