import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";

export class Rest implements Activity {

    constructor(
        public readonly duration: Duration,
        public readonly comment: string | undefined,
    ) {
    }

    type(): string {
        return 'REST';
    }

}