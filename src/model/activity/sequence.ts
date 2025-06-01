import {Activity} from "../wod/activity.ts";
import {ActivityType} from "./activity-type.ts";
import {SequenceDto} from "../dto/activity/sequence.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";

export class Sequence extends Activity {

    static fromDto(dto: SequenceDto): Sequence {
        return new Sequence(
            Activity.mapFromAllDto(dto.activities),
            dto.comment
        );
    }

    constructor(
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
        super(ActivityType.SEQUENCE, comment);
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return this.activities.reduce((acc, activity) => acc.merge(activity.toSequencerTasks(parent)), new TaskSet([]));
    }
}