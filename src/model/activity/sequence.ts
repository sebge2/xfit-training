import {Activity} from "./activity.ts";

export class Sequence implements Activity {

    constructor(
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
    }

    type(): string {
        return 'SEQUENCE';
    }
}