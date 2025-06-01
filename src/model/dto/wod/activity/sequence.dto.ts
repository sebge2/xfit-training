import {ActivityDto} from "./activity-dto.ts";

export interface SequenceDto extends ActivityDto {

    get activities(): ActivityDto[];
}