import {ActivityDto} from "./activity-dto.ts";

export interface ActivityExerciseDto extends ActivityDto {

    get repetitions(): string;

}