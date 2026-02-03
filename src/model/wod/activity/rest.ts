import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {RestDto} from "../../dto/wod/activity/rest.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {v4 as uuidv4} from "uuid";

export class Rest extends Activity {

    static fromDto(dto: RestDto): Rest {
        return new Rest(
            Duration.fromDto(dto.duration) as Duration,
            uuidv4(),
            dto.comment || undefined,
        );
    }

    static toDto(rest: Rest): RestDto {
        return {
            type: rest.type,
            duration: Duration.toDto(rest.duration) as Duration,
            comment: rest.comment || null,
        };
    }

    static empty() {
        return new Rest(Duration.empty(), uuidv4(), undefined)
    }

    constructor(
        public readonly duration: Duration,
        id: string,
        comment: string | undefined,
    ) {
        super(
            id,
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