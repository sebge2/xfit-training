import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {RepetitionsDto} from "../../dto/wod/activity/repetitions.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromDto, mapActivityToDto} from "./activity-utils.ts";
import {v4 as uuidv4} from "uuid";
import {Sequence} from "./sequence.ts";

export class Repetitions extends Activity {

    static fromDto(dto: RepetitionsDto): Repetitions {
        return new Repetitions(
            dto.repetitions,
            mapActivityFromDto(dto.activity),
            uuidv4(),
            dto.comment || undefined,
        );
    }

    static toDto(activity: Repetitions): RepetitionsDto {
        return {
            type: activity.type,
            repetitions: activity.repetitions,
            activity: mapActivityToDto(activity.activity),
            comment: activity.comment || null,
        };
    }

    static empty() {
        return new Repetitions(0, Sequence.empty(), uuidv4(), undefined);
    }

    constructor(
        public readonly repetitions: number,
        public readonly activity: Activity,
        id: string,
        comment: string | undefined,
    ) {
        super(id, ActivityType.REPETITIONS, comment);
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return new TaskSet(
            Array.from({length: this.repetitions}, (_, index) => this.activity.toSequencerTasks(BoardTextInfo.single(`${index}/${this.repetitions}`, undefined).mergeWithParent(parent)).tasks)
                .flat()
        );
    }

    updateActivity(child: Activity): Repetitions {
        return new Repetitions(this.repetitions, child, this.id, this.comment);
    }
}