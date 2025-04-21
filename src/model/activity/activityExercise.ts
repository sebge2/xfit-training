import {Activity} from "./activity.ts";

export class ActivityExercise implements Activity {

    constructor(
        public readonly repetitions: string,
        public readonly comment: string | undefined,
    ) {
    }

    type(): string {
        return 'EXERCISE';
    }
}