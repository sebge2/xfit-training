import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {SequenceDto} from "../dto/activity/sequence.dto.ts";
import { v4 as uuidv4 } from 'uuid';
import {TaskSet} from "../board/task-set.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";

export class Sequence implements Activity {

    static fromDto(dto: SequenceDto): Sequence {
        return new Sequence(
            ActivityDeserializer.deserializeAll(dto.activities),
            dto.comment
        );
    }

    public readonly id: string;

    constructor(
        public readonly activities: Activity[],
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    get type(): ActivityType {
        return ActivityType.SEQUENCE;
    }

    toSequencerTasks(parent?: BoardTextInfo): TaskSet {
        return this.activities.reduce((acc, activity) => acc.merge(activity.toSequencerTasks(parent)), new TaskSet([]));
    }
}