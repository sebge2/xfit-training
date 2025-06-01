import {ActivityDto} from "./activity-dto.ts";
import {DurationDto} from "./duration.dto.ts";

export interface ForTimeDto extends ActivityDto {

    get duration(): DurationDto | null;

    get activity(): ActivityDto;

}