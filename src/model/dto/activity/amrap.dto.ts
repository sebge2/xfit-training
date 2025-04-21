import {ActivityDto} from "./activity-dto.ts";
import {DurationDto} from "./duration.dto.ts";

export interface AmrapDto extends ActivityDto {

    get duration(): DurationDto;

    get activity(): ActivityDto;

}