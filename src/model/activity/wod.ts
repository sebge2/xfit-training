import {Activity} from "./activity.ts";

export class Wod {

    constructor(
        public readonly activity: Activity,
        public readonly tags: string[],
        public readonly comment: string | undefined,
    ) {
    }
}