import {Activity} from "./activity.ts";

export class Repetitions implements Activity {

    constructor(
        public readonly repetitions: number,
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
    }

    type(): string {
        return 'REPETITIONS';
    }
}