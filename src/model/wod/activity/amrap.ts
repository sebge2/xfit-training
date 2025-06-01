import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {AmrapDto} from "../../dto/wod/activity/amrap.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromDto} from "./activity-utils.ts";

export class Amrap extends Activity {

    static fromDto(dto: AmrapDto): Amrap {
        return new Amrap(
            Duration.fromDto(dto.duration) as Duration,
            mapActivityFromDto(dto.activity),
            dto.comment
        );
    }

    static toDto(activity: Amrap): AmrapDto {
        return {
            type: activity.type,
            duration: Duration.toDto(activity.duration) as Duration,
            activity: activity.activity,
            comment: activity.comment,
        };
    }

    constructor(
        public readonly duration: Duration,
        public readonly activity: Activity,
        comment: string | null,
    ) {
        super(
            ActivityType.AMRAP,
            comment,
        );
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