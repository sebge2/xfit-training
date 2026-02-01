import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {ForTimeDto} from "../../dto/wod/activity/for-time.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromDto, mapActivityToDto} from "./activity-utils.ts";

export class ForTime extends Activity {

    static fromDto(dto: ForTimeDto): ForTime {
        return new ForTime(
            Duration.fromDto(dto.duration) as Duration,
            mapActivityFromDto(dto.activity),
            dto.comment || undefined,
        );
    }

    static toDto(activity: ForTime): ForTimeDto {
        return {
            type: activity.type,
            duration: Duration.toDto(activity.duration),
            activity: mapActivityToDto(activity.activity),
            comment: activity.comment || null,
        };
    }

    constructor(
        public readonly duration: Duration | null,
        public readonly activity: Activity,
        comment: string | undefined,
    ) {
        super(
            ActivityType.FOR_TIME,
            comment,
        );
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        if (!this.duration) {
            return new TaskSet([]);
        }

        return new TaskSet([
            new Task(
                this.id,
                parent,
                this.duration
            )
        ]);
    }

    updateActivity(child: Activity) {
        return new ForTime(this.duration, child, this.comment);
    }
}