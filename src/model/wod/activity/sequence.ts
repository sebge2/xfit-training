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
            dto.comment
        );
    }

    static toDto(activity: Sequence): SequenceDto {
        return {
            type: activity.type,
            activities: mapActivityToAllDto(activity.activities),
            comment: activity.comment,
        };
    }

    constructor(
        public readonly activities: Activity[],
        comment: string | null,
    ) {
        super(ActivityType.SEQUENCE, comment);
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return this.activities.reduce((acc, activity) => acc.merge(activity.toSequencerTasks(parent)), new TaskSet([]));
    }
}