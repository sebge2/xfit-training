import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {RepetitionsDto} from "../../dto/wod/activity/repetitions.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromDto} from "./activity-utils.ts";

export class Repetitions extends Activity {

    static fromDto(dto: RepetitionsDto): Repetitions {
        return new Repetitions(
            dto.repetitions,
            mapActivityFromDto(dto.activity),
            dto.comment
        );
    }

    static toDto(activity: Repetitions): RepetitionsDto {
        return {
            type: activity.type,
            repetitions: activity.repetitions,
            activity: activity.activity,
            comment: activity.comment,
        };
    }

    constructor(
        public readonly repetitions: number,
        public readonly activity: Activity,
        comment: string | undefined,
    ) {
        super(ActivityType.REPETITIONS, comment);
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return new TaskSet(
            Array.from({length: this.repetitions}, (_, index) => this.activity.toSequencerTasks(BoardTextInfo.single(`${index}/${this.repetitions}`, undefined).mergeWithParent(parent)).tasks)
                .flat()
        );
    }
}