import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";

export class Enom implements Activity {

    constructor(
        public readonly duration: Duration,
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
    }

    type(): string {
        return 'ENOM';
    }
}