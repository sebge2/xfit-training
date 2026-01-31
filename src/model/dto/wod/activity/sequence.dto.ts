import {ActivityDto} from "./activity-dto.ts";

export interface SequenceDto extends ActivityDto {

    get name(): string | undefined;

    get activities(): ActivityDto[];
}