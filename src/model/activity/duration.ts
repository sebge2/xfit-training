import {DurationDto} from "../dto/activity/duration.dto.ts";

export class Duration {

    static fromDto(dto: DurationDto | undefined): Duration | undefined {
        if (!dto) {
            return undefined;
        }

        return new Duration(dto.hours, dto.minutes, dto.seconds);
    }

    static fromSeconds(seconds: number): Duration {
        if (seconds <= 0) {
            return new Duration(0);
        }

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return new Duration(hours, minutes, remainingSeconds);
    }

    static fromMilliSeconds(milliSeconds: number): Duration {
        return this.fromSeconds(Math.floor(milliSeconds / 1000));
    }

    constructor(
        public readonly hours: number,
        public readonly minutes: number = 0,
        public readonly seconds: number = 0,
    ) {
    }

    get hasDuration(): boolean {
        return (this.hours > 0) || (this.minutes > 0) || (this.seconds > 0);
    }

    get totalSeconds(): number {
        return (this.hours * 3600) + (this.minutes * 60) + this.seconds;
    }
}