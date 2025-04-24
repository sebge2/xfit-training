import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {AmrapDto} from "../dto/activity/amrap.dto.ts";
import { TaskSet } from "../sequencer/task-set.ts";
import {v4 as uuidv4} from "uuid";
import {Task} from "../sequencer/task.ts";
import {BoardTextInfo} from "../sequencer/board-text-info.ts";

export class Amrap implements Activity {

    static fromDto(dto: AmrapDto): Amrap {
        return new Amrap(
            Duration.fromDto(dto.duration) as Duration,
            ActivityDeserializer.deserialize(dto.activity),
            dto.comment
        );
    }

    public readonly id: string;

    constructor(
        public readonly duration: Duration,
        public readonly activity: Activity,
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    get type(): ActivityType {
        return ActivityType.AMRAP;
    }

    toSequencerTasks(board?: BoardTextInfo): TaskSet {
        return new TaskSet([
            new Task(
                this.id,
                board,
                this.duration
            )
        ]);
    }
}