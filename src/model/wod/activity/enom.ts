import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {EnomDto} from "../../dto/wod/activity/enom.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromDto, mapActivityToDto} from "./activity-utils.ts";

export class Enom extends Activity {

    static fromDto(dto: EnomDto): Enom {
        return new Enom(
            Duration.fromDto(dto.duration) as Duration,
            dto.repetitions,
            mapActivityFromDto(dto.activity),
            dto.comment || undefined,
        );
    }

    static toDto(activity: Enom): EnomDto {
        return {
            type: activity.type,
            duration: Duration.toDto(activity.duration) as Duration,
            repetitions: activity.repetitions,
            activity: mapActivityToDto(activity.activity),
            comment: activity.comment || null,
        };
    }

    constructor(
        public readonly duration: Duration,
        public readonly repetitions: number,
        public readonly activity: Activity,
        comment: string | undefined,
    ) {
        super(
            ActivityType.ENOM,
            comment,
        );
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return new TaskSet(
            Array
                .from({length: this.repetitions}, (_, index) => new Task(
                    this.id,
                    BoardTextInfo.single(`${index + 1}/${this.repetitions}`, undefined).mergeWithParent(parent),
                    this.duration
                ))
                .flat()
        );
    }

    updateActivity(child: Activity): Enom {
        return new Enom(this.duration, this.repetitions, child, this.comment);
    }
}