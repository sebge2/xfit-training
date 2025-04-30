import {Wod} from "../../model/activity/wod.ts";
import {TaskSet} from "../../model/board/task-set.ts";
import {BoardTextInfo} from "../../model/board/board-text-info.ts";
import {ChronometerService} from "./chronometer-service.ts";
import {Board} from "../../model/board/board.ts";
import {Task} from "../../model/board/task.ts";
import {Duration} from "../../model/activity/duration.ts";

const PREPARATION_TASKSET = new TaskSet([
    new Task("initial", BoardTextInfo.single(undefined, "Be Ready!"), Duration.fromSeconds(10))
]);

const INITIAL_TASK_INDEX = -1;

export class SequencerService {

    private readonly _sequencerTasks: TaskSet;
    private _chronometer: ChronometerService | undefined;
    private _currentTaskIndex = INITIAL_TASK_INDEX;

    constructor(
        public readonly wod: Wod,
    ) {
        this._sequencerTasks = this._initTaskSet(wod);
    }

    get board(): Board | undefined {
        if (!this._hasStarted()) {
            return undefined;
        } else if (this._hasFinished()) {
            return undefined;
        }

        if (!this._chronometer?.remainingTime.hasDuration) {
            this._startNextTask();

            return this.board;
        }

        return new Board(
            this._sequencerTasks.tasks[this._currentTaskIndex].board,
            this._chronometer.state,
        );
    }

    start() {
        if (this._currentTaskIndex >= 0) {
            throw Error('The sequence already started.');
        }

        this._startNextTask();
    }

    pause() {
        if (!this._hasStarted()) {
            throw Error('The sequence hasn\'t started yet.');
        }

        this._chronometer?.pause();
    }

    private _initTaskSet(wod: Wod): TaskSet {
        const wodTaskSet = wod.activity.toSequencerTasks(BoardTextInfo.empty());

        if (wodTaskSet.tasks.length === 0) {
            return wodTaskSet;
        }

        return PREPARATION_TASKSET.merge(wodTaskSet);
    }

    private _hasStarted(): boolean {
        return (this._currentTaskIndex >= 0) && (this._chronometer !== undefined);
    }

    private _hasFinished(): boolean {
        return this._currentTaskIndex >= this._sequencerTasks.tasks.length;
    }

    private _startNextTask(): void {
        this._currentTaskIndex++;
        this._chronometer = new ChronometerService(this._sequencerTasks.tasks[this._currentTaskIndex].duration);
        this._chronometer.start();
    }
}