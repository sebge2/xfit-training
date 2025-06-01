import {ActivityDto} from "../wod/activity-dto.ts";
import {DurationDto} from "./duration.dto.ts";

export interface ForTimeDto extends ActivityDto {

    get duration(): DurationDto | undefined;

    get activity(): ActivityDto;

}