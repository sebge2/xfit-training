import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {RestDto} from "../dto/activity/rest.dto.ts";
import {TaskSet} from "../sequencer/task-set.ts";
import {Task} from "../sequencer/task.ts";
import { v4 as uuidv4 } from 'uuid';
import {BoardTextInfo} from "../sequencer/board-text-info.ts";

export class Rest implements Activity {

    static fromDto(dto: RestDto): Rest {
        return new Rest(
            Duration.fromDto(dto.duration) as Duration,
            dto.comment
        );
    }

    public readonly id: string;

    constructor(
        public readonly duration: Duration,
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    get type(): ActivityType {
        return ActivityType.REST;
    }

    toSequencerTasks(parent?: BoardTextInfo): TaskSet {
        return new TaskSet([
            new Task(
                this.id,
                 BoardTextInfo.single(undefined, "REST").mergeWithParent(parent),
                this.duration
            )
        ]);
    }

}