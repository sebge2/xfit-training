import {ActivityDto} from "../wod/activity-dto.ts";
import {DurationDto} from "./duration.dto.ts";

export interface RestDto extends ActivityDto {

    get duration(): DurationDto;
}