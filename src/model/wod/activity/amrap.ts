import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {AmrapDto} from "../../dto/wod/activity/amrap.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromDto, mapActivityToDto} from "./activity-utils.ts";
import {v4 as uuidv4} from "uuid";
import {Sequence} from "./sequence.ts";

export class Amrap extends Activity {

    static fromDto(dto: AmrapDto): Amrap {
        return new Amrap(
            Duration.fromDto(dto.duration) as Duration,
            mapActivityFromDto(dto.activity),
            uuidv4(),
            dto.comment || undefined,
        );
    }

    static toDto(activity: Amrap): AmrapDto {
        return {
            type: activity.type,
            duration: Duration.toDto(activity.duration) as Duration,
            activity: mapActivityToDto(activity.activity),
            comment: activity.comment || null,
        };
    }

    static empty() {
        return new Amrap(Duration.empty(), Sequence.empty(), uuidv4(), undefined);
    }

    constructor(
        public readonly duration: Duration,
        public readonly activity: Activity,
        id: string,
        comment: string | undefined,
    ) {
        super(
            id,
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

    updateActivity(child: Activity): Amrap {
        return new Amrap(this.duration, child, this.id, this.comment);
    }
}