import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {RestDto} from "../../dto/wod/activity/rest.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";

export class Rest extends Activity {

    static fromDto(dto: RestDto): Rest {
        return new Rest(
            Duration.fromDto(dto.duration) as Duration,
            dto.comment
        );
    }

    static toDto(rest: Rest): RestDto {
        return {
            type: rest.type,
            duration: Duration.toDto(rest.duration) as Duration,
            comment: rest.comment,
        };
    }

    constructor(
        public readonly duration: Duration,
        comment: string | undefined,
    ) {
        super(
            ActivityType.REST,
            comment,
        )
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return new TaskSet([
            new Task(
                this.id,
                BoardTextInfo.single(undefined, "REST").mergeWithParent(parent),
                this.duration
            )
        ]);
    }
}