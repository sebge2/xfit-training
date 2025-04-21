import {Activity} from "./activity.ts";

export class Wod {

    constructor(
        public readonly id: string,
        public readonly activity: Activity,
        public readonly name: string,
        public readonly tags: string[],
        public readonly comment: string | undefined,
    ) {
    }
}