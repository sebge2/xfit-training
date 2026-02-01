import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {SequenceDto} from "../../dto/wod/activity/sequence.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";
import {mapActivityFromAllDto, mapActivityToAllDto} from "./activity-utils.ts";

export class Sequence extends Activity {

    static fromDto(dto: SequenceDto): Sequence {
        return new Sequence(
            mapActivityFromAllDto(dto.activities),
            dto.name,
            dto.comment
        );
    }

    static toDto(activity: Sequence): SequenceDto {
        return {
            type: activity.type,
            activities: mapActivityToAllDto(activity.activities),
            name: activity.name,
            comment: activity.comment,
        };
    }

    static empty(): Sequence {
        return new Sequence([], undefined, undefined);
    }

    constructor(
        public readonly activities: Activity[],
        public readonly name: string | undefined,
        comment: string | undefined,
    ) {
        super(ActivityType.SEQUENCE, comment);
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return this.activities.reduce((acc, activity) => acc.merge(activity.toSequencerTasks(parent)), new TaskSet([]));
    }

    addActivity(activity: Activity) {
        return new Sequence(
            [...this.activities, activity],
            this.name,
            this.comment,
        );
    }
}