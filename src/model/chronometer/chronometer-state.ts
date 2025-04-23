import {ChronometerStatus} from "./chronometer-status.ts";
import {Duration} from "../activity/duration.ts";

export class ChronometerState {

    constructor(
        public readonly status: ChronometerStatus,
        public readonly remainingTime: Duration,
    ) {
    }
}