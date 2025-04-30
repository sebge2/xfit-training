import {BoardTextInfo} from "./board-text-info.ts";
import {Duration} from "../activity/duration.ts";

export class Board {

    constructor(
        public readonly text: BoardTextInfo,
        public readonly duration: Duration,
    ) {
    }
}