import {ActivityType} from "./activity-type.ts";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";

export abstract class Activity {

    protected constructor(
        public readonly id: string,
        public readonly type: ActivityType,
        public readonly comment: string | undefined,
    ) {
    }

    abstract toSequencerTasks(parent: BoardTextInfo): TaskSet;

}