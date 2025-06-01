import {ActivityDto} from "../wod/activity-dto.ts";

export interface SequenceDto extends ActivityDto {

    get activities(): ActivityDto[];
}