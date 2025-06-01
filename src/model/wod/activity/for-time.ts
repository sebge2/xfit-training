import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {ForTimeDto} from "../../dto/wod/activity/for-time.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromDto} from "./activity-utils.ts";

export class ForTime extends Activity {

    static fromDto(dto: ForTimeDto): ForTime {
        return new ForTime(
            Duration.fromDto(dto.duration) as Duration,
            mapActivityFromDto(dto.activity),
            dto.comment
        );
    }

    static toDto(forTime: ForTime): ForTimeDto {
        return {
            type: forTime.type,
            duration: Duration.toDto(forTime.duration) as Duration,
            activity: forTime.activity,
            comment: forTime.comment,
        };
    }

    constructor(
        public readonly duration: Duration,
        public readonly activity: Activity,
        comment: string | undefined,
    ) {
        super(
            ActivityType.FOR_TIME,
            comment,
        );
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return new TaskSet([
            new Task(
                this.id,
                parent,
                this.duration
            )
        ]);
    }
}