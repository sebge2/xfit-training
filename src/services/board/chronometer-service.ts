import {Duration} from "../../model/wod/activity/duration.ts";
import {ChronometerStatus} from "../../model/board/chronometer-status.ts";
import {ChronometerState} from "../../model/board/chronometer-state.ts";

export class ChronometerService {

    private _remainingTimeInMs: number;
    private _status: ChronometerStatus = ChronometerStatus.NOT_STARTED;
    private _startTime: Date | undefined;

    constructor(public readonly initialDuration: Duration) {
        this._remainingTimeInMs = initialDuration.totalSeconds * 1000;
    }

    get state(): ChronometerState {
        return new ChronometerState(
            this.status,
            this.initialDuration,
            this.remainingTime,
        );
    }

    get status(): ChronometerStatus {
        return this._status;
    }

    get remainingTime(): Duration {
        switch (this._status) {
            case ChronometerStatus.NOT_STARTED:
                throw new Error('The chronometer is not started yet.');
            case ChronometerStatus.PAUSED:
                return Duration.fromMilliSeconds(this._remainingTimeInMs);
            case ChronometerStatus.RUNNING:
                return Duration.fromMilliSeconds(this._computeRemainingTimeInMs());
            case ChronometerStatus.FINISHED:
                throw new Error('The chronometer finished.');
        }
    }

    start(): ChronometerService {
        switch (this._status) {
            case ChronometerStatus.NOT_STARTED:
            case ChronometerStatus.PAUSED:
                this._status = ChronometerStatus.RUNNING;
                this._startTime = new Date();
                break;
            case ChronometerStatus.RUNNING:
                break;
            case ChronometerStatus.FINISHED:
                throw new Error('The chronometer finished and cannot be restarted.');
        }

        return this;
    }

    pause() {
        switch (this._status) {
            case ChronometerStatus.NOT_STARTED:
                throw new Error('The chronometer is not started yet.');
            case ChronometerStatus.PAUSED:
                this.start();
                break;
            case ChronometerStatus.RUNNING:
                this._status = ChronometerStatus.PAUSED;
                this._remainingTimeInMs = this._computeRemainingTimeInMs();
                this._startTime = undefined;
                break;
            case ChronometerStatus.FINISHED:
                throw new Error('The chronometer finished and cannot be resumed.');
        }
    }

    private _computeRemainingTimeInMs(): number {
        const number = this._remainingTimeInMs - this._computeElapsedTimeInMs();
        return (number > 0) ? number : 0;
    }

    private _computeElapsedTimeInMs(): number {
        return new Date().getTime() - this._startTime!.getTime();
    }
}