import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {AmrapDto} from "../../dto/wod/activity/amrap.dto.ts";
import {TaskSet} from "../../board/task-set.ts";
import {v4 as uuidv4} from "uuid";
import {Task} from "../../board/task.ts";
import {BoardTextInfo} from "../../board/board-text-info.ts";

export class Amrap implements Activity {

    static fromDto(dto: AmrapDto): Amrap {
        return new Amrap(
            Duration.fromDto(dto.duration) as Duration,
            Activity.mapFromDto(dto.activity),
            dto.comment
        );
    }

    public readonly id: string;

    constructor(
        public readonly duration: Duration,
        public readonly activity: Activity,
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    get type(): ActivityType {
        return ActivityType.AMRAP;
    }

    toSequencerTasks(board: BoardTextInfo): TaskSet {
        return new TaskSet([
            new Task(
                this.id,
                board,
                this.duration
            )
        ]);
    }
}