import {ActivityType} from "./activity-type.ts";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";

export interface Activity {

    get id(): string;

    get type(): ActivityType;

    get comment(): string | undefined;

    toSequencerTasks(parent?: BoardTextInfo): TaskSet;

}