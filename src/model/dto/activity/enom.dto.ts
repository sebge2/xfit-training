import {ActivityDto} from "./activity-dto.ts";
import {DurationDto} from "./duration.dto.ts";

export interface EnomDto extends ActivityDto {

    get duration(): DurationDto;

    get repetitions(): number;

    get activity(): ActivityDto;

}