import {ActivityDto} from "../wod/activity-dto.ts";

export interface ActivityExerciseDto extends ActivityDto {

    get repetitions(): string;

    get exercise(): string;

}