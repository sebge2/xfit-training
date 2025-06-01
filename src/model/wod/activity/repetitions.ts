import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {RepetitionsDto} from "../../dto/wod/activity/repetitions.dto.ts";
import {v4 as uuidv4} from "uuid";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";

export class Repetitions implements Activity {

    static fromDto(dto: RepetitionsDto): Repetitions {
        return new Repetitions(
            dto.repetitions,
            Activity.mapFromDto(dto.activity),
            dto.comment
        );
    }

    public readonly id: string;

    constructor(
        public readonly repetitions: number,
        public readonly activity: Activity,
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    get type(): ActivityType {
        return ActivityType.REPETITIONS;
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return new TaskSet(
            Array.from({length: this.repetitions}, (_, index) => this.activity.toSequencerTasks(BoardTextInfo.single(`${index}/${this.repetitions}`, undefined).mergeWithParent(parent)).tasks)
                .flat()
        );
    }
}