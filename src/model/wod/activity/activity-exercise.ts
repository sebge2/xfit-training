import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityExerciseDto} from "../../dto/wod/activity/activity-exercise.dto.ts";
import {v4 as uuidv4} from "uuid";
import { TaskSet } from "../board/task-set.ts";

export class ActivityExercise implements Activity {

    static fromDto(dto: ActivityExerciseDto): ActivityExercise {
        return new ActivityExercise(
            dto.repetitions,
            dto.exercise,
            dto.comment,
        );
    }

    public readonly id: string;

    constructor(
        public readonly repetitions: string,
        public readonly exercise: string,
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    get type(): ActivityType {
        return ActivityType.EXERCISE;
    }

    toSequencerTasks(): TaskSet {
        return new TaskSet([]);
    }
}