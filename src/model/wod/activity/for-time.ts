import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {ForTimeDto} from "../../dto/wod/activity/for-time.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromDto, mapActivityToDto} from "./activity-utils.ts";
import {v4 as uuidv4} from "uuid";
import {Sequence} from "./sequence.ts";

export class ForTime extends Activity {

    static fromDto(dto: ForTimeDto): ForTime {
        return new ForTime(
            Duration.fromDto(dto.duration) as Duration,
            mapActivityFromDto(dto.activity),
            uuidv4(),
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

    static empty() {
        return new ForTime(Duration.empty(), Sequence.empty(),  uuidv4(), undefined);
    }

    constructor(
        public readonly duration: Duration,
        public readonly activity: Activity,
        id: string,
        comment: string | undefined,
    ) {
        super(
            id,
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
        return new ForTime(this.duration, child, this.id, this.comment);
    }

    updateData(param: { duration: Duration; comment: string | undefined }) {
        return new ForTime(param.duration, this.activity, this.id, param.comment);
    }
}