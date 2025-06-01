import {ActivityDto} from "../wod/activity-dto.ts";

export interface RepetitionsDto extends ActivityDto {

    get repetitions(): number;

    get activity(): ActivityDto;
}