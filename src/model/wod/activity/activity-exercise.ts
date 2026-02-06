import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityExerciseDto} from "../../dto/wod/activity/activity-exercise.dto.ts";
import {TaskSet} from "../board/task-set.ts";
import {v4 as uuidv4} from "uuid";

export class ActivityExercise extends Activity {

    static fromDto(dto: ActivityExerciseDto): ActivityExercise {
        return new ActivityExercise(
            dto.repetitions,
            dto.exercise,
            uuidv4(),
            dto.comment || undefined,
        );
    }

    static toDto(activity: ActivityExercise): ActivityExerciseDto {
        return {
            type: activity.type,
            repetitions: activity.repetitions,
            exercise: activity.exercise,
            comment: activity.comment || null,
        };
    }

    static empty() {
        return new ActivityExercise('0', '', uuidv4(), undefined);
    }

    constructor(
        public readonly repetitions: string,
        public readonly exercise: string,
        id: string,
        comment: string | undefined,
    ) {
        super(id, ActivityType.EXERCISE, comment);
    }

    toSequencerTasks(): TaskSet {
        return new TaskSet([]);
    }

    updateData(param: { repetitions: string; exercise: string; comment: string | undefined }): ActivityExercise {
        return new ActivityExercise(param.repetitions, param.exercise, this.id, param.comment);
    }
}