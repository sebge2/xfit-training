import {ActivityType} from "./activity-type.ts";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {v4 as uuidv4} from "uuid";

export abstract class Activity {

    public readonly id: string;

    protected constructor(
        public readonly type: ActivityType,
        public readonly comment: string | null,
    ) {
        this.id = uuidv4();
    }

    abstract toSequencerTasks(parent: BoardTextInfo): TaskSet;

}