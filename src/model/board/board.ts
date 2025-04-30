import {BoardTextInfo} from "./board-text-info.ts";
import {ChronometerState} from "./chronometer-state.ts";

export class Board {

    constructor(
        public readonly text: BoardTextInfo,
        public readonly chronometer: ChronometerState,
    ) {
    }
}