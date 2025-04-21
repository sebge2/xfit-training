import {ActivityDto} from "./activity-dto.ts";
import {ExerciseDto} from "../exercise/exercise.dto.ts";

export interface ActivityExerciseDto extends ActivityDto {

    get repetitions(): string;

    get exercise(): ExerciseDto;

}