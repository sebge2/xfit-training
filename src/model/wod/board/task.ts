import {Duration} from "../activity/duration.ts";
import {BoardTextInfo} from "./board-text-info.ts";

export class Task {

    constructor(
        public readonly activityId: string,
        public readonly board: BoardTextInfo,
        public readonly duration: Duration,
    ) {
    }
}