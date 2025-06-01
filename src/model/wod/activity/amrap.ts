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

    static toDto(amrap: Amrap): AmrapDto {
        return {
            type: amrap.type,
            duration: Duration.toDto(amrap.duration) as Duration,
            activity: amrap.activity,
            comment: amrap.comment,
        };
    }

    constructor(
        public readonly duration: Duration,
        public readonly activity: Activity,
        comment: string | undefined,
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