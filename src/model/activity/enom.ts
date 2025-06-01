import {Activity} from "../wod/activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {EnomDto} from "../dto/activity/enom.dto.ts";
import {v4 as uuidv4} from "uuid";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";

export class Enom implements Activity {

    static fromDto(dto: EnomDto): Enom {
        return new Enom(
            Duration.fromDto(dto.duration) as Duration,
            dto.repetitions,
            Activity.mapFromDto(dto.activity),
            dto.comment
        );
    }

    public readonly id: string;

    constructor(
        public readonly duration: Duration,
        public readonly repetitions: number,
        public readonly activity: Activity,
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    get type(): ActivityType {
        return ActivityType.ENOM;
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
}